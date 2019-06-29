/**
 * 延时等待
 * @param ms 延时，单位是毫秒
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 检查路由
 * @param route 路由 path
 * @param checkFirst 是否检查头部
 */
export function checkRoute(route: string, checkFirst: boolean = true) {
  const checkPos = checkFirst ? 0 : route.length - 1;

  if (checkFirst) {
    if (route[checkPos] !== '/')
      throw new Error("route syntax error, the first must be '/'");
  } else {
    if (route[checkPos] === '/')
      throw new Error("route syntax error, the last must not have '/'");
  }
}
