import Base = require('./base');
import Session = require('./session');
interface IAppInfo {
    pid: number;
    name: string;
    bundleId: string;
}
declare class Client extends Base {
    getSession(): Promise<Session>;
    createNewSession(payload: Object): Promise<Session>;
    startApp(bundleId: string, args?: never[], environment?: {}): Promise<Session>;
    status(): Promise<any>;
    getActiveAppInfo(): Promise<IAppInfo>;
    lock(): Promise<any>;
    isLocked(): Promise<any>;
    screenshot(pngFilename?: string): Promise<any>;
}
export = Client;
