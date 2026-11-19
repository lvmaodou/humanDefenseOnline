const STORAGE_KEY = 'human-defense.session.v1';
const terminalCodes = new Set(['SESSION_EXPIRED', 'SESSION_INVALID', 'GAME_STARTED', 'ROOM_FULL']);

export function readSession(storage) {
  try {
    const session = JSON.parse(storage.getItem(STORAGE_KEY));
    return /^[A-Z0-9]{1,8}$/.test(session?.room) && /^[a-f0-9]{64}$/.test(session?.resumeToken) ? session : null;
  } catch { return null; }
}

export class BattleConnection {
  constructor({ url, onMessage, onStatus, storage, WebSocketClass = globalThis.WebSocket }) {
    Object.assign(this, { url, onMessage, onStatus, storage, WebSocketClass });
    this.socket = null;this.session = readSession(storage);this.joined = false;this.stopped = true;this.attempt = 0;
  }

  save() {
    try {
      if (this.session?.resumeToken) this.storage.setItem(STORAGE_KEY, JSON.stringify(this.session));
      else this.storage.removeItem(STORAGE_KEY);
    } catch { /* Private browsing may disable storage; in-page reconnect still works. */ }
  }

  start({ name, room, resumeToken } = this.session || {}) {
    if (!name && !resumeToken) return;
    this.stop();
    this.session = { name, room, ...(resumeToken ? { resumeToken } : {}) };
    this.stopped = false;this.attempt = 0;this.open();
  }

  open() {
    if (this.stopped) return;
    clearTimeout(this.retryTimer);
    this.onStatus(this.session.resumeToken ? 'reconnecting' : 'connecting');
    const socket = this.socket = new this.WebSocketClass(this.url);
    this.lastMessage = Date.now();
    const current = () => this.socket === socket && !this.stopped;
    const fail = () => {
      if (!current()) return;
      clearTimeout(this.handshakeTimer);clearInterval(this.watchdog);
      this.socket = null;this.joined = false;
      socket.close();
      this.schedule();
    };
    this.handshakeTimer = setTimeout(fail, 12000);
    socket.onopen = () => { if (current()) socket.send(JSON.stringify({ type: 'join', ...this.session })); };
    socket.onmessage = event => {
      if (!current()) return;
      this.lastMessage = Date.now();
      let message;try { message = JSON.parse(event.data); } catch { return; }
      if (message.type === 'joined') {
        clearTimeout(this.handshakeTimer);
        this.session = { name: message.name || this.session.name, room: message.room, resumeToken: message.resumeToken };
        this.save();this.joined = true;this.attempt = 0;this.onStatus('connected');
      } else if (message.type === 'error' && !this.joined) {
        if (terminalCodes.has(message.code) || !message.requestId) {
          if (message.code === 'SESSION_EXPIRED' || message.code === 'SESSION_INVALID') { this.session = null;this.save(); }
          this.stop();this.onStatus('failed', message.message);
        }
      }
      this.onMessage(message);
    };
    socket.onerror = fail;
    socket.onclose = event => {
      if (!current()) return;
      clearTimeout(this.handshakeTimer);clearInterval(this.watchdog);
      this.socket = null;this.joined = false;
      if (event.code === 4001) {
        this.stopped = true;this.onStatus('replaced', '此玩家已在另一个页面连接，可点击重新连接返回');return;
      }
      this.schedule();
    };
    // States arrive every 50 ms. Close half-open sockets instead of waiting for TCP.
    this.watchdog = setInterval(() => { if (Date.now() - this.lastMessage > 15000) fail(); }, 3000);
  }

  schedule() {
    if (this.stopped) return;
    this.onStatus('reconnecting');
    const delay = Math.min(8000, 500 * 2 ** Math.min(this.attempt++, 4));
    this.retryTimer = setTimeout(() => this.open(), delay);
  }

  retry() {
    if (!this.session) return;
    const session = this.session;this.start(session);
  }

  send(message) {
    if (!this.joined || this.socket?.readyState !== 1) return false;
    this.socket.send(JSON.stringify(message));return true;
  }

  stop() {
    this.stopped = true;this.joined = false;
    clearTimeout(this.retryTimer);clearTimeout(this.handshakeTimer);clearInterval(this.watchdog);
    const socket = this.socket;this.socket = null;socket?.close();
  }
}
