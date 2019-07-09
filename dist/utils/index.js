"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 延时等待
 * @param ms 延时，单位是毫秒
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.delay = delay;
/**
 * 检查路由
 * @param route 路由 path
 * @param checkFirst 是否检查头部
 */
function checkRoute(route, checkFirst = true) {
    const checkPos = checkFirst ? 0 : route.length - 1;
    if (checkFirst) {
        if (route[checkPos] !== '/')
            throw new Error("route syntax error, the first must be '/'");
    }
    else {
        if (route[checkPos] === '/')
            throw new Error("route syntax error, the last must not have '/'");
    }
}
exports.checkRoute = checkRoute;
//# sourceMappingURL=index.js.map