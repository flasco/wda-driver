/// <reference types="node" />

/// <reference path="../utils/index.d.ts" />

declare module '@flasco/wda-driver/src/core/base' {
  import * as axios from 'axios';
  import { checkRoute } from '@flasco/wda-driver/src/utils';

  class Base {
    constructor(remoteURL: string);

    ping(): Promise<object>;

    get(route: string, withoutLink: boolean): Promise<object>;

    post(route: string, payload: object): Promise<object>;
  }

  export = Base;
}
