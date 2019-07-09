"use strict";
const Base = require("./base");
const utils_1 = require("../utils");
class Session extends Base {
    constructor(remoteUrl, capabilities) {
        super(remoteUrl);
        utils_1.checkRoute(remoteUrl, false);
        this.capabilities = capabilities;
    }
    get bundleId() {
        return this.capabilities.CFBundleIdentifier;
    }
    deactivate(duration) {
        return this.post('/wda/deactivateApp', { duration });
    }
    /**
     * 点击
     * @param x x 坐标
     * @param y y 坐标
     */
    tap(x, y) {
        return this.post('/wda/tap/0', { x, y });
    }
    /**
     * 双击
     * @param x x 坐标
     * @param y y 坐标
     */
    doubleTap(x, y) {
        return this.post('/wda/doubleTap', { x, y });
    }
    /**
     * 长按
     * @param x x 坐标
     * @param y y 坐标
     * @param duration 持续时间, 秒为单位
     */
    tapHold(x, y, duration) {
        return this.post('/wda/touchAndHold', { x, y, duration });
    }
    /**
     * 组合操作链
     * @param actions array
     */
    chainOperation(actions) {
        return this.post('/wda/touch/perform', { actions }, { timeout: 60000 });
    }
    /**
     * 从点1滑动到点2
     * @param fromX 点1 的 x 坐标
     * @param fromY 点1 的 y 坐标
     * @param toX 点2 的 x 坐标
     * @param toY 点2 的 y 坐标
     * @param duration 持续时间，秒
     */
    swipe(fromX, fromY, toX, toY, duration = 0) {
        return this.post('/wda/dragfromtoforduration', {
            fromX,
            fromY,
            toX,
            toY,
            duration
        });
    }
    /**
     * 获取电池信息
     */
    batteryInfo() {
        return this.post('/wda/batteryInfo');
    }
    /**
     * 朝左滑
     */
    async swipeLeft() {
        const { width, height } = await this.getWindowSize();
        return this.swipe(width / 2 + 150, height / 2, width / 2 - 150, height / 2);
    }
    /**
     * 朝右滑
     */
    async swipeRight() {
        const { width, height } = await this.getWindowSize();
        return this.swipe(width / 2 - 150, height / 2, width / 2 + 150, height / 2);
    }
    /**
     * 朝上滑
     */
    async swipeUp() {
        const { width, height } = await this.getWindowSize();
        return this.swipe(width / 2, height / 2 + 150, width / 2, height / 2 - 150);
    }
    /**
     * 朝下滑
     */
    async swipeDown() {
        const { width, height } = await this.getWindowSize();
        return this.swipe(width / 2, height / 2 - 150, width / 2, height / 2 + 150);
    }
    /**
     * 不传参数是获取当前屏幕状态（横竖屏），传参则是改变到指定状态
     * @param orientation 屏幕状态
     */
    async orientation(orientation) {
        const { value } = !orientation
            ? await this.get('/orientation')
            : await this.post('/orientation', { orientation });
        return value;
    }
    /**
     * 获取屏幕的宽高
     */
    async getWindowSize() {
        const { value } = await this.get('/window/size');
        if (typeof value === 'string')
            throw new Error(value);
        return value;
    }
    /**
     * 按下 HOME 键
     */
    async pressHome() {
        return await this.post('/wda/pressButton', { name: 'home' });
    }
    /**
     * 调高音量，只有真机支持
     */
    async volumeUp() {
        return await this.post('/wda/pressButton', { name: 'volumeUp' });
    }
    /**
     * 调低音量，只有真机支持
     */
    async volumeDown() {
        return await this.post('/wda/pressButton', { name: 'volumeDown' });
    }
}
module.exports = Session;
//# sourceMappingURL=session.js.map