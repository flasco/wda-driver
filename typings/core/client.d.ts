/// <reference types="node" />

/// <reference path="./base.d.ts" />
/// <reference path="./session.d.ts" />

declare module '@flasco/wda-driver/src/core/client' {
  import Base = require('@flasco/wda-driver/src/core/base');
  import Session = require('@flasco/wda-driver/src/core/session');

  class Client extends Base {
    /**
     * 获取当前session
     */
    getSession(): Session;

    /**
     * 根据参数创建新的session
     * @param payload 参数
     */
    private createNewSession(payload): Session;

    /**
     * 根据 bundleId 强行启动应用
     * @param bundleId bundleId
     * @param args args
     * @param environment environment
     */
    startApp(bundleId, args = [], environment = {}): Session;

    /**
     * 获取状态
     */
    status(): Promise<object>;

    /**
     * 获取当前正在运行的应用的信息
     */
    getActiveAppInfo(): Promise<object>;

    /**
     * 判断是否是锁屏状态
     */
    isLocked(): Promise<boolean>;

    /**
     * 截图
     * @param pngFilename 文件存放路径
     */
    screenshot(pngFilename = ''): Promise<string | null>;
  }

  export = Client;
}
