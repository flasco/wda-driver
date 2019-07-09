import Base = require('./base');
import { IChainOperation } from '../interface/IChainItem';
interface ICapabilities {
    CFBundleIdentifier: string;
    device: string;
    browserName: string;
    sdkVersion: string;
}
declare type TOrientation = 'LANDSCAPE' | 'PORTRAIT' | 'UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT' | 'UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN';
declare class Session extends Base {
    capabilities: ICapabilities;
    constructor(remoteUrl: string, capabilities: ICapabilities);
    readonly bundleId: string;
    deactivate(duration: number): Promise<any>;
    /**
     * 点击
     * @param x x 坐标
     * @param y y 坐标
     */
    tap(x: number, y: number): Promise<any>;
    /**
     * 双击
     * @param x x 坐标
     * @param y y 坐标
     */
    doubleTap(x: number, y: number): Promise<any>;
    /**
     * 长按
     * @param x x 坐标
     * @param y y 坐标
     * @param duration 持续时间, 秒为单位
     */
    tapHold(x: number, y: number, duration: number): Promise<any>;
    /**
     * 组合操作链
     * @param actions array
     */
    chainOperation(actions: IChainOperation[]): Promise<any>;
    /**
     * 从点1滑动到点2
     * @param fromX 点1 的 x 坐标
     * @param fromY 点1 的 y 坐标
     * @param toX 点2 的 x 坐标
     * @param toY 点2 的 y 坐标
     * @param duration 持续时间，秒
     */
    swipe(fromX: number, fromY: number, toX: number, toY: number, duration?: number): Promise<any>;
    /**
     * 获取电池信息
     */
    batteryInfo(): Promise<any>;
    /**
     * 朝左滑
     */
    swipeLeft(): Promise<any>;
    /**
     * 朝右滑
     */
    swipeRight(): Promise<any>;
    /**
     * 朝上滑
     */
    swipeUp(): Promise<any>;
    /**
     * 朝下滑
     */
    swipeDown(): Promise<any>;
    /**
     * 不传参数是获取当前屏幕状态（横竖屏），传参则是改变到指定状态
     * @param orientation 屏幕状态
     */
    orientation(orientation: TOrientation): Promise<any>;
    /**
     * 获取屏幕的宽高
     */
    getWindowSize(): Promise<any>;
    /**
     * 按下 HOME 键
     */
    pressHome(): Promise<any>;
    /**
     * 调高音量，只有真机支持
     */
    volumeUp(): Promise<any>;
    /**
     * 调低音量，只有真机支持
     */
    volumeDown(): Promise<any>;
}
export = Session;
