/// <reference types="node" />

/// <reference path="./base.d.ts" />
/// <reference path="../utils/index.d.ts" />

declare module '@flasco/wda-driver/src/core/session' {
  import Base = require('@flasco/wda-driver/src/core/base');
  import { checkRoute } from '@flasco/wda-driver/src/utils';

  namespace actionInf {
    interface press {
      action: 'press';
      options: {
        x: number;
        y: number;
      };
    }

    interface tap {
      action: 'tap';
      options: {
        x: number;
        y: number;
      };
    }

    interface wait {
      action: 'wait';
      options: {
        ms: number;
      };
    }

    interface release {
      action: 'release';
    }
  }

  class Session extends Base {
    constructor(remoteUrl: string, capabilities: object);

    get bundleId(): string;

    deactivate(duration: number): Promise<void>;

    /**
     * 点击
     * @param x x 坐标
     * @param y y 坐标
     */
    tap(x: number, y: number): Promise<void>;

    /**
     * 双击
     * @param x x 坐标
     * @param y y 坐标
     */
    doubleTap(x: number, y: number): Promise<void>;

    /**
     * 长按
     * @param x x 坐标
     * @param y y 坐标
     * @param duration 持续时间, 秒为单位
     */
    tapHold(x: number, y: number, duration: number): Promise<void>;

    /**
     * 组合操作链
     * @param actions array
     */
    chainOperation(
      actions: Array<
        actionInf.press | actionInf.release | actionInf.tap | actionInf.wait
      >
    ): Promise<void>;

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
      duration: number
    ): Promise<void>;

    /**
     * 获取电池信息
     */
    batteryInfo(): Promise<object>;

    /**
     * 朝左滑
     */
    swipeLeft(): Promise<void>;

    /**
     * 朝右滑
     */
    swipeRight(): Promise<void>;

    /**
     * 朝上滑
     */
    swipeUp(): Promise<void>;

    /**
     * 朝下滑
     */
    swipeDown(): Promise<void>;

    /**
     * 不传参数是获取当前屏幕状态（横竖屏），传参则是改变到指定状态
     * @param orientation 屏幕状态
     */
    orientation(
      orientation?:
        | 'LANDSCAPE'
        | 'PORTRAIT'
        | 'UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT'
        | 'UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN'
    ): Promise<string>;

    /**
     * 获取屏幕的宽高
     */
    getWindowSize(): Promise<{ width: number; height: number }>;
  }

  export = Session;
}
