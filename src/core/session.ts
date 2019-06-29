import Base = require('./base');
import { checkRoute } from '../utils';

interface ICapabilities {
  CFBundleIdentifier: string;
  device: string,
  browserName: string,
  sdkVersion: string,
}

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

  tap(x: number, y: number) {
    return this.post('/wda/tap/0', { x, y });
  }

  doubleTap(x: number, y: number) {
    return this.post('/wda/doubleTap', { x, y });
  }

  tapHold(x: number, y: number, duration: number) {
    return this.post('/wda/touchAndHold', { x, y, duration });
  }

  chainOperation(actions: Object[]) {
    return this.post('/wda/touch/perform', { actions }, { timeout: 60000 });
  }

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

  batteryInfo() {
    return this.post('/wda/batteryInfo');
  }

  async swipeLeft() {
    const { width, height } = await this.getWindowSize();
    return this.swipe(width / 2 + 150, height / 2, width / 2 - 150, height / 2);
  }

  async swipeRight() {
    const { width, height } = await this.getWindowSize();
    return this.swipe(width / 2 - 150, height / 2, width / 2 + 150, height / 2);
  }

  async swipeUp() {
    const { width, height } = await this.getWindowSize();
    return this.swipe(width / 2, height / 2 + 150, width / 2, height / 2 - 150);
  }

  async swipeDown() {
    const { width, height } = await this.getWindowSize();
    return this.swipe(width / 2, height / 2 - 150, width / 2, height / 2 + 150);
  }

  async orientation(orientation: string) {
    const { value } = !orientation
      ? await this.get('/orientation')
      : await this.post('/orientation', { orientation });
    return value;
  }

  async getWindowSize() {
    const { value } = await this.get('/window/size');
    if (typeof value === 'string') throw new Error(value);
    return value;
  }
}

export = Session;
