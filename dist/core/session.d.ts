import Base = require('./base');
interface ICapabilities {
    CFBundleIdentifier: string;
}
declare class Session extends Base {
    capabilities: ICapabilities;
    constructor(remoteUrl: string, capabilities: ICapabilities);
    readonly bundleId: string;
    deactivate(duration: number): Promise<any>;
    tap(x: number, y: number): Promise<any>;
    doubleTap(x: number, y: number): Promise<any>;
    tapHold(x: number, y: number, duration: number): Promise<any>;
    chainOperation(actions: Object[]): Promise<any>;
    swipe(fromX: number, fromY: number, toX: number, toY: number, duration?: number): Promise<any>;
    batteryInfo(): Promise<any>;
    swipeLeft(): Promise<any>;
    swipeRight(): Promise<any>;
    swipeUp(): Promise<any>;
    swipeDown(): Promise<any>;
    orientation(orientation: string): Promise<any>;
    getWindowSize(): Promise<any>;
}
export = Session;
