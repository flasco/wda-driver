const fs = require('fs');
const Base = require('./base');
const Session = require('./session');

class Client extends Base {
  async getSession() {
    const status = await this.status();
    const sid = status.sessionId;
    if (sid == null) {
      throw 'no session created ever';
    }
    const newUrl = `${this.server}/session/${sid}`;
    const {
      value: { capabilities }
    } = await this.get(newUrl, true);
    const ret = new Session(newUrl, capabilities);
    return ret;
  }

  async createNewSession(payload) {
    const {
      value: { capabilities, sessionId: sid }
    } = await this.post('/session', payload);

    const newUrl = `${this.server}/session/${sid}`;
    return new Session(newUrl, capabilities);
  }

  async startApp(bundleId, args = [], environment = {}) {
    if (bundleId == null) return this.getSession();
    if (!Array.isArray(args)) throw 'arguments must be a array';
    if (typeof environment !== 'object') throw 'environment must be a object';

    const data = {
      desiredCapabilities: {
        bundleId,
        arguments: args,
        environment,
        shouldWaitForQuiescence: true
      }
    };
    return await this.createNewSession(data);
  }

  async status() {
    return await this.get('/status');
  }

  async getActiveAppInfo() {
    const res = await this.get('/wda/activeAppInfo');
    return res.value;
  }

  async lock() {
    const res = await this.post('/wda/lock');
    return res.value;
  }

  async isLocked() {
    const res = await this.get('/wda/locked');
    return res.value;
  }

  async screenshot(pngFilename = '') {
    const { value } = await this.get('/screenshot');
    if (pngFilename !== '') {
      fs.writeFileSync(pngFilename, value, 'base64');
      return null;
    } else {
      return value;
    }
  }
}

module.exports = Client;
