import { randomBytes } from 'node:crypto';

export const ROOM_RETENTION_MS = 30 * 60 * 1000;
export const BOT_TAKEOVER_MS = 60 * 1000;
const failure = (code, message) => Object.assign(new Error(message), { code });

// Connection presence is separate from the original map's playing/left state.
// A temporary disconnect must never trigger the map's leave-player gold sharing.
export class RoomSessions {
  constructor({ createGame, broadcast, now = Date.now, retentionMs = ROOM_RETENTION_MS, botTakeoverMs = BOT_TAKEOVER_MS, botDirector = null, tickMs = 50, broadcastMs = 100 }) {
    this.rooms = new Map();
    Object.assign(this, { createGame, broadcast, now, retentionMs, botTakeoverMs, botDirector, tickMs, broadcastMs });
  }

  connected(room) { return [...room.players.values()].some(player => player.ws?.readyState === 1); }
  hasBots(room) { return room.game.players?.slice(0, 4).some(player => player.bot) || false; }
  finished(room) { return ['victory', 'defeat'].includes(room.game.status); }
  runBots(room) {
    try { this.botDirector?.step(room); }
    catch (error) { console.error('[room bots]', room.id, error); }
  }
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
      player = { id: randomBytes(10).toString('hex'), token: randomBytes(32).toString('hex'), slot, name: String(request.name || `玩家${slot + 1}`).slice(0, 12), ws: null, disconnectedAt: null, bot: false };
      if (!room) {
        room = { id, players: new Map(), game: this.createGame([{ slot, name: player.name }]), timer: null, idleSince: null, broadcastElapsed: 0, pendingBotSlots: new Set([1, 2, 3]), botState: new Map() };
        this.rooms.set(id, room);
        room.game.start();
      }
      room.players.set(player.id, player);
      room.pendingBotSlots?.delete(slot);
    }
    const previous = player.ws;
    const participant = room.game.players[player.slot], wasBot = Boolean(participant.bot);
    player.ws = ws;
    player.disconnectedAt = null;player.bot = false;
    participant.active = true;
    participant.connected = true;
    participant.bot = false;
    participant.name = player.name;
    if (wasBot) this.botDirector?.resume(room, player.slot);
    if (resumed) room.game.message(wasBot ? `${player.name}已重连，机器人托管已交还` : `${player.name}已重新连接`);
    this.resume(room);
    // A delayed close/message from the old socket cannot detach or control this seat.
    if (previous && previous !== ws) previous.close(4001, 'Session resumed elsewhere');
    return { room, player, resumed };
  }

  resume(room) {
    if (this.connected(room)) room.idleSince = null;
    if (room.timer) return;
    room.timer = setInterval(() => this.step(room), this.tickMs);
    room.timer.unref?.();
  }

  step(room) {
    if (!this.connected(room) && !this.hasBots(room)) { this.pause(room);return; }
    try {
      room.game.tick(this.tickMs / 1000);
      this.runBots(room);
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
    player.ws = null;player.disconnectedAt = this.now();
    room.game.players[player.slot].connected = false;
    if (this.finished(room)) {
      if (!this.connected(room)) this.remove(room);
      return;
    }
    room.game.message(`${player.name} 连接中断，保留 60 秒重连窗口`);
    if (!this.connected(room)) this.pause(room);
    else this.publish(room);
  }

  leave(room, player, ws) {
    if (player.ws !== ws) return false;
    player.ws = null;player.disconnectedAt = null;room.players.delete(player.id);room.pendingBotSlots?.delete(player.slot);
    const participant = room.game.players[player.slot];participant.connected = false;participant.active = false;
    room.game.message(`${player.name} 已退出对局`);
    if (!room.players.size || this.finished(room) && !this.connected(room)) {
      this.remove(room);
    } else if (!this.connected(room)) this.pause(room);
    else this.publish(room);
    return true;
  }

  sweep() {
    const now = this.now();
    for (const room of this.rooms.values()) {
      if (!this.finished(room)) {
        for (const player of room.players.values()) {
          const participant = room.game.players[player.slot];
          if (!player.ws && player.disconnectedAt !== null && now - player.disconnectedAt >= this.botTakeoverMs && !participant.bot) {
            player.bot = true;participant.bot = true;participant.connected = false;
            room.game.message(`${player.name}断线超过 1 分钟，机器人已接管；重连后恢复手动控制`);
            try { this.botDirector?.takeover(room, player.slot); }
            catch (error) { console.error('[room bots]', room.id, error); }
          }
        }
        this.runBots(room);
      }
      if (this.connected(room)) room.idleSince = null;
      else {
        room.idleSince ??= now;
        if (this.hasBots(room)) this.resume(room);
        else this.pause(room);
      }
      if (!this.connected(room) && (this.finished(room) || now - room.idleSince >= this.retentionMs)) {
        this.remove(room);
      }
    }
  }

  dispose() {
    for (const room of this.rooms.values()) clearInterval(room.timer);
    this.rooms.clear();
  }
}
