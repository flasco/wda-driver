"use strict";
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const utils_1 = require("../utils");
axios_1.default.defaults.timeout = 15000;
class Base {
    constructor(remoteURL) {
        this.ping = async () => {
            return this.get('/');
        };
        // route like this - /status
        this.get_buffer = async (route) => {
            let url = `${this.server}${route}`;
            try {
                const { data } = await axios_1.default.get(url, { responseType: 'arraybuffer' });
                return data;
            }
            catch (error) {
                throw error;
            }
        };
        // route like this - /status
        this.get = async (route, withoutLink = false) => {
            let url = route;
            if (!withoutLink) {
                utils_1.checkRoute(route);
                url = `${this.server}${route}`;
            }
            try {
                const { data } = await axios_1.default.get(url);
                return data;
            }
            catch (error) {
                throw error;
            }
        };
        // remoteURL - http://localhost:8100
        utils_1.checkRoute(remoteURL, false);
        this.server = remoteURL;
    }
    // route like this - /status
    async post(route, payload, option) {
        utils_1.checkRoute(route);
        const url = `${this.server}${route}`;
        try {
            const { data } = await axios_1.default.post(url, payload, option);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
}
module.exports = Base;
//# sourceMappingURL=base.js.map