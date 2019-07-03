import Base = require('./base');
import Session = require('./session');
declare class Client extends Base {
    getSession(): Promise<Session>;
    createNewSession(payload: Object): Promise<Session>;
    startApp(bundleId: string, args?: never[], environment?: {}): Promise<Session>;
    status(): Promise<any>;
    getActiveAppInfo(): Promise<any>;
    lock(): Promise<any>;
    isLocked(): Promise<any>;
    screenshot(): Promise<any>;
}
export = Client;
