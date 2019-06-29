declare class Base {
    server: string;
    constructor(remoteURL: string);
    ping: () => Promise<any>;
    get_buffer: (route: string) => Promise<any>;
    get: (route: string, withoutLink?: boolean) => Promise<any>;
    post(route: string, payload?: object, option?: object): Promise<any>;
}
export = Base;
