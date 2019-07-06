const Client = require('../dist/core/client');

const BUNDLE_ID = 'com.linegames.dcglobal';
const c = new Client('http://localhost:8100');

expect.extend({
  toBeBoolean(received) {
    if (typeof received === 'boolean') {
      return {
        pass: true
      };
    }
    return {
      message: 'value is not boolean',
      pass: false
    };
  }
});

describe('client test', () => {
  test('startApp', async () => {
    const res = await c.startApp(BUNDLE_ID);
    expect(res.bundleId).toBe(BUNDLE_ID);
  }, 10000);

  test('status test', async () => {
    const res = await c.status();
    expect(res.value.state).toBe('success');
  }, 10000);

  test('getSession', async () => {
    const res = await c.getSession();
    expect(res.bundleId).toBe(BUNDLE_ID);
  }, 10000);

  test('getActiveAppInfo', async () => {
    const res = await c.getActiveAppInfo();
    expect(res.bundleId).toBe(BUNDLE_ID);
  }, 10000);

  test('isLocked', async () => {
    const res = await c.isLocked();
    expect(res).toBeBoolean();
  }, 10000);

  test('screenshot', async () => {
    const res = await c.screenshot();
    expect(res.length).toBeGreaterThan(100);
  });
});
