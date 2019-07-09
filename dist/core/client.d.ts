import Base = require('./base');
import Session = require('./session');
interface IAppInfo {
    pid: number;
    name: string;
    bundleId: string;
}
declare class Client extends Base {
    /**
     * 获取当前session
     */
    getSession(): Promise<Session>;
    /**
     * 根据参数创建新的session
     * @param payload 参数
     */
    createNewSession(payload: Object): Promise<Session>;
    /**
     * 根据 bundleId 强行启动应用
     * @param bundleId bundleId
     * @param args args
     * @param environment environment
     */
    startApp(bundleId: string, args?: never[], environment?: {}): Promise<Session>;
    /**
     * 获取状态
     */
    status(): Promise<any>;
    /**
     * 获取当前正在运行的应用的信息
     */
    getActiveAppInfo(): Promise<IAppInfo>;
    /**
     * 手机锁屏
     */
    lock(): Promise<any>;
    /**
     * 判断手机是否锁屏
     */
    isLocked(): Promise<any>;
    /**
     * 截图
     * @param pngFilename 文件存放路径
     */
    screenshot(pngFilename?: string): Promise<any>;
}
export = Client;
