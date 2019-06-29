"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.delay = delay;
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