import fs from 'fs';
import Base = require('./base');
import Session = require('./session');

interface IAppInfo {
  pid: number;
  name: string;
  bundleId: string;
}

class Client extends Base {
  /** 获取当前的session，调一次会变一次，注意别乱用 */
  async getSession() {
    return this.createNewSession({ capabilities: {} });
  }

  /**
   * 根据参数创建新的session
   * @param payload 参数
   */
  async createNewSession(payload: Object) {
    const {
      value: { capabilities, sessionId: sid },
    } = await this.post('/session', payload);

    const newUrl = `${this.server}/session/${sid}`;
    return new Session(newUrl, capabilities);
  }

  /**
   * 根据 bundleId 强行启动应用
   * @param bundleId bundleId
   * @param args args
   * @param environment environment
   */
  async startApp(bundleId: string, args = [], environment = {}) {
    if (bundleId == null) return this.getSession();
    if (!Array.isArray(args)) throw 'arguments must be a array';
    if (typeof environment !== 'object') throw 'environment must be a object';

    const data = {
      capabilities: {
        alwaysMatch: {
          bundleId,
          arguments: args,
          environment,
          shouldWaitForQuiescence: true,
        },
      },
    };
    return await this.createNewSession(data);
  }

  /**
   * 启动app，不返回 session 的那种, 需要最新版 wda 支持
   * @param bundleId bundleId
   */
  async startAppWithoutAttach(bundleId: string) {
    return this.post('/wda/apps/launchUnattached', {
      bundleId,
    });
  }

  /**
   * 获取状态
   */
  async status() {
    return await this.get('/status');
  }

  /**
   * 获取当前正在运行的应用的信息
   */
  async getActiveAppInfo(): Promise<IAppInfo> {
    const res = await this.get('/wda/activeAppInfo');
    return res.value;
  }

  /**
   * 手机锁屏
   */
  async lock() {
    const res = await this.post('/wda/lock');
    return res.value;
  }

  /**
   * 判断手机是否锁屏
   */
  async isLocked() {
    const res = await this.get('/wda/locked');
    return res.value;
  }

  /**
   * 截图
   * @param pngFilename 文件存放路径
   */
  async screenshot(pngFilename: string = '') {
    const result = await this.get_buffer('/screenshot/blob');
    if (pngFilename !== '') {
      fs.writeFileSync(pngFilename, result);
      return null;
    } else {
      return result;
    }
  }
}

export = Client;
