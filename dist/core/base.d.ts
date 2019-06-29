declare class Base {
    server: string;
    constructor(remoteURL: string);
    ping: () => Promise<any>;
    protected get_buffer: (route: string) => Promise<any>;
    protected get: (route: string, withoutLink?: boolean) => Promise<any>;
    protected post(route: string, payload?: object, option?: object): Promise<any>;
}
export = Base;
