/// <reference types="node" />

/// <reference path="./utils/index.d.ts" />
/// <reference path="./core/base.d.ts" />
/// <reference path="./core/client.d.ts" />
/// <reference path="./core/session.d.ts" />

declare module '@flasco/wda-driver' {
  export { default as Client } from '@flasco/wda-driver/src/core/client';
}