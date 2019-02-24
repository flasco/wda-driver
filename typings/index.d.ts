/// <reference path="./utils/index.d.ts" />
/// <reference path="./core/base.d.ts" />
/// <reference path="./core/client.d.ts" />
/// <reference path="./core/session.d.ts" />

declare module '@flasco/wda-driver' {
  import Client = require('@flasco/wda-driver/src/core/client');
  import Session = require('@flasco/wda-driver/src/core/session');

  export { Client, Session }
}
