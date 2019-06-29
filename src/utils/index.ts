export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
