const axios = require('axios');
const { checkRoute } = require('../utils');

axios.defaults.timeout = 15000;

class Base {
  // remoteURL - http://localhost:8100
  constructor(remoteURL) {
    checkRoute(remoteURL, false);
    this.server = remoteURL;
  }

  async ping() {
    return this.get('/');
  }

  // route like this - /status
  async get(route, withoutLink = false) {
    let url = route;
    if (!withoutLink) {
      checkRoute(route);
      url = `${this.server}${route}`;
    }
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw error;
    }
  }

  // route like this - /status
  async post(route, payload) {
    checkRoute(route);
    const url = `${this.server}${route}`;
    try {
      const { data } = await axios.post(url, payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Base;
