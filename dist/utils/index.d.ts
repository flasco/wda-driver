/**
 * 延时等待
 * @param ms 延时，单位是毫秒
 */
export declare function delay(ms: number): Promise<void>;
/**
 * 检查路由
 * @param route 路由 path
 * @param checkFirst 是否检查头部
 */
export declare function checkRoute(route: string, checkFirst?: boolean): void;
