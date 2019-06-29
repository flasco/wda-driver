import Base = require('./base');
import { checkRoute } from '../utils';

interface ICapabilities {
  CFBundleIdentifier: string;
  device: string;
  browserName: string;
  sdkVersion: string;
}

type TOrientation =
  | 'LANDSCAPE'
  | 'PORTRAIT'
  | 'UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT'
  | 'UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN';

class Session extends Base {
  capabilities: ICapabilities;
  constructor(remoteUrl: string, capabilities: ICapabilities) {
    super(remoteUrl);
    checkRoute(remoteUrl, false);
    this.capabilities = capabilities;
  }

  get bundleId() {
    return this.capabilities.CFBundleIdentifier;
  }

  deactivate(duration: number) {
    return this.post('/wda/deactivateApp', { duration });
  }

  /**
   * 点击
   * @param x x 坐标
   * @param y y 坐标
   */
  tap(x: number, y: number) {
    return this.post('/wda/tap/0', { x, y });
  }

  /**
   * 双击
   * @param x x 坐标
   * @param y y 坐标
   */
  doubleTap(x: number, y: number) {
    return this.post('/wda/doubleTap', { x, y });
  }

  /**
   * 长按
   * @param x x 坐标
   * @param y y 坐标
   * @param duration 持续时间, 秒为单位
   */
  tapHold(x: number, y: number, duration: number) {
    return this.post('/wda/touchAndHold', { x, y, duration });
  }

  /**
   * 组合操作链
   * @param actions array
   */
  chainOperation(actions: Object[]) {
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
  swipe(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    duration: number = 0
  ) {
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
  async orientation(orientation: TOrientation) {
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
    if (typeof value === 'string') throw new Error(value);
    return value;
  }
}

export = Session;
