"use strict";
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const Base = require("./base");
const Session = require("./session");
class Client extends Base {
    /**
     * 获取当前session
     */
    async getSession() {
        const status = await this.status();
        const sid = status.sessionId;
        if (sid == null)
            throw 'no session created ever';
        const newUrl = `${this.server}/session/${sid}`;
        const { value: { capabilities }, } = await this.get(newUrl, true);
        const ret = new Session(newUrl, capabilities);
        return ret;
    }
    /**
     * 根据参数创建新的session
     * @param payload 参数
     */
    async createNewSession(payload) {
        const { value: { capabilities, sessionId: sid }, } = await this.post('/session', payload);
        const newUrl = `${this.server}/session/${sid}`;
        return new Session(newUrl, capabilities);
    }
    /**
     * 根据 bundleId 强行启动应用
     * @param bundleId bundleId
     * @param args args
     * @param environment environment
     */
    async startApp(bundleId, args = [], environment = {}) {
        if (bundleId == null)
            return this.getSession();
        if (!Array.isArray(args))
            throw 'arguments must be a array';
        if (typeof environment !== 'object')
            throw 'environment must be a object';
        const data = {
            desiredCapabilities: {
                bundleId,
                arguments: args,
                environment,
                shouldWaitForQuiescence: true,
            },
        };
        return await this.createNewSession(data);
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
    async getActiveAppInfo() {
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
    async screenshot(pngFilename = '') {
        const result = await this.get_buffer('/screenshot/blob');
        if (pngFilename !== '') {
            fs_1.default.writeFileSync(pngFilename, result);
            return null;
        }
        else {
            return result;
        }
    }
}
module.exports = Client;
//# sourceMappingURL=client.js.map