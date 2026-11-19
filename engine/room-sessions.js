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

  join(ws, request) {
    const id = String(request.room || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) || randomBytes(3).toString('hex').toUpperCase();
    this.sweep();
    let room = this.rooms.get(id), player;
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
    room.game.message(`${player.name} 连接中断，等待重连`);
    if (!this.connected(room)) this.pause(room);
    else this.publish(room);
  }

  sweep() {
    for (const [id, room] of this.rooms) {
      if (room.idleSince !== null && this.now() - room.idleSince >= this.retentionMs && !this.connected(room)) {
        clearInterval(room.timer);
        this.rooms.delete(id);
      }
    }
  }

  dispose() {
    for (const room of this.rooms.values()) clearInterval(room.timer);
    this.rooms.clear();
  }
}
