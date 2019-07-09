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
    tap(x: number, y: number): Promise<any>;
    doubleTap(x: number, y: number): Promise<any>;
    tapHold(x: number, y: number, duration: number): Promise<any>;
    chainOperation(actions: IChainOperation[]): Promise<any>;
    swipe(fromX: number, fromY: number, toX: number, toY: number, duration?: number): Promise<any>;
    batteryInfo(): Promise<any>;
    swipeLeft(): Promise<any>;
    swipeRight(): Promise<any>;
    swipeUp(): Promise<any>;
    swipeDown(): Promise<any>;
    orientation(orientation: TOrientation): Promise<any>;
    getWindowSize(): Promise<any>;
    pressHome(): Promise<any>;
    volumeUp(): Promise<any>;
    volumeDown(): Promise<any>;
}
export = Session;
