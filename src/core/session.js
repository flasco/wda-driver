const Base = require('./base');
const { checkRoute } = require('../utils');

class Session extends Base {
  constructor(remoteUrl, capabilities) {
    super(remoteUrl);
    checkRoute(remoteUrl, false);
    this.capabilities = capabilities;
  }

  get bundleId() {
    return this.capabilities.CFBundleIdentifier;
  }

  deactivate(duration) {
    return this.post('/wda/deactivateApp', { duration });
  }

  tap(x, y) {
    return this.post('/wda/tap/0', { x, y });
  }

  doubleTap(x, y) {
    return this.post('/wda/doubleTap', { x, y });
  }

  tapHold(x, y, duration) {
    return this.post('/wda/touchAndHold', { x, y, duration });
  }

  chainOperation(actions) {
    return this.post('/wda/touch/perform', { actions }, { timeout: 60000 });
  }

  swipe(fromX, fromY, toX, toY, duration = 0) {
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

  async orientation(orientation) {
    const { value } = !orientation
      ? await this.get('/orientation')
      : await this.post('/orientation', { orientation });
    return value;
  }

  async getWindowSize() {
    const { value } = await this.get('/window/size');
    return value;
  }
}

module.exports = Session;
