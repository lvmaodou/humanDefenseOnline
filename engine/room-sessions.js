import { randomBytes } from 'node:crypto';

export const ROOM_RETENTION_MS = 30 * 60 * 1000;
const failure = (code, message) => Object.assign(new Error(message), { code });

// Connection presence is separate from the original map's playing/left state.
// A temporary disconnect must never trigger the map's leave-player gold sharing.
export class RoomSessions {
  constructor({ createGame, broadcast, now = Date.now, retentionMs = ROOM_RETENTION_MS, tickMs = 50, broadcastMs = 100 }) {
    this.rooms = new Map();
    Object.assign(this, { createGame, broadcast, now, retentionMs, tickMs, broadcastMs });
  }

  connected(room) { return [...room.players.values()].some(player => player.ws?.readyState === 1); }
  finished(room) { return ['victory', 'defeat'].includes(room.game.status); }
  remove(room) {
    clearInterval(room.timer);room.timer = null;
    if (this.rooms.get(room.id) === room) this.rooms.delete(room.id);
  }

  join(ws, request) {
    const id = String(request.room || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) || randomBytes(3).toString('hex').toUpperCase();
    this.sweep();
    let room = this.rooms.get(id), player;
    if (room && this.finished(room)) throw failure('GAME_FINISHED', '这场对局已结束，请创建新房间开始下一局');
    const resumed = Boolean(request.resumeToken);
    if (resumed) {
      if (!room) throw failure('SESSION_EXPIRED', '战场已过期或服务器已重启，请重新进入房间');
      player = [...room.players.values()].find(member => member.token === request.resumeToken);
      if (!player) throw failure('SESSION_INVALID', '无法恢复此玩家，请使用原来的浏览器返回战场');
    } else {
      if (room?.game.globals.udg_waves > 0) throw failure('GAME_STARTED', '游戏开始后不能加入，请重新建房；原玩家可自动重连');
      const slot = [0, 1, 2, 3].find(slot => !room || ![...room.players.values()].some(member => member.slot === slot));
      if (slot === undefined) throw failure('ROOM_FULL', '房间已满，最多 4 人；离线玩家的席位会保留');
      player = { id: randomBytes(10).toString('hex'), token: randomBytes(32).toString('hex'), slot, name: String(request.name || `玩家${slot + 1}`).slice(0, 12), ws: null };
      if (!room) {
        room = { id, players: new Map(), game: this.createGame([{ slot, name: player.name }]), timer: null, idleSince: null, broadcastElapsed: 0 };
        this.rooms.set(id, room);
        room.game.start();
      }
      room.players.set(player.id, player);
    }
    const previous = player.ws;
    player.ws = ws;
    const participant = room.game.players[player.slot];
    participant.active = true;
    participant.connected = true;
    participant.name = player.name;
    if (resumed) room.game.message(`${player.name} 已重新连接`);
    this.resume(room);
    // A delayed close/message from the old socket cannot detach or control this seat.
    if (previous && previous !== ws) previous.close(4001, 'Session resumed elsewhere');
    return { room, player, resumed };
  }

  resume(room) {
    room.idleSince = null;
    if (room.timer) return;
    room.timer = setInterval(() => this.step(room), this.tickMs);
    room.timer.unref?.();
  }

  step(room) {
    if (!this.connected(room)) { this.pause(room);return; }
    try {
      room.game.tick(this.tickMs / 1000);
      room.broadcastElapsed = (room.broadcastElapsed || 0) + this.tickMs;
      if (room.broadcastElapsed >= this.broadcastMs) this.publish(room);
    } catch (error) { console.error('[room]', room.id, error); }
  }

  publish(room) {
    room.broadcastElapsed = 0;
    this.broadcast(room);
  }

  pause(room) {
    clearInterval(room.timer);
    room.timer = null;
    room.broadcastElapsed = 0;
    room.idleSince ??= this.now();
  }

  detach(room, player, ws) {
    if (player.ws !== ws) return;
    player.ws = null;
    room.game.players[player.slot].connected = false;
    if (this.finished(room)) {
      if (!this.connected(room)) this.remove(room);
      return;
    }
    room.game.message(`${player.name} 连接中断，等待重连`);
    if (!this.connected(room)) this.pause(room);
    else this.publish(room);
  }

  leave(room, player, ws) {
    if (player.ws !== ws) return false;
    player.ws = null;room.players.delete(player.id);
    const participant = room.game.players[player.slot];participant.connected = false;participant.active = false;
    room.game.message(`${player.name} 已退出对局`);
    if (!room.players.size || this.finished(room) && !this.connected(room)) {
      this.remove(room);
    } else if (!this.connected(room)) this.pause(room);
    else this.publish(room);
    return true;
  }

  sweep() {
    for (const room of this.rooms.values()) {
      if (!this.connected(room) && (this.finished(room) || room.idleSince !== null && this.now() - room.idleSince >= this.retentionMs)) {
        this.remove(room);
      }
    }
  }

  dispose() {
    for (const room of this.rooms.values()) clearInterval(room.timer);
    this.rooms.clear();
  }
}
