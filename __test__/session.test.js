const Client = require('../src/core/client');

const BUNDLE_ID = 'com.linegames.dcglobal';
const c = new Client('http://localhost:8100');
const s = c.getSession();

describe('session test', () => {
  test('startApp', async () => {
    const res = await c.startApp(BUNDLE_ID);
    expect(res.bundleId).toBe(BUNDLE_ID);
  }, 10000);
});
