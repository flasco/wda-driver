declare module '@flasco/wda-driver/src/utils' {
  export function delay(ms: number): Promise<void>;
  export function checkRoute(route: string, checkFirst: boolean): void
}
