import axios from 'axios';
import { checkRoute } from '../utils';

axios.defaults.timeout = 15000;

class Base {
  protected server: string;

  constructor(remoteURL: string) {
    // remoteURL - http://localhost:8100
    checkRoute(remoteURL, false);
    this.server = remoteURL;
  }

  ping = async () => {
    return this.get('/');
  };

  // route like this - /status
  get_buffer = async (route: string) => {
    let url = `${this.server}${route}`;
    try {
      const { data } = await axios.get(url, { responseType: 'arraybuffer' });
      return data;
    } catch (error) {
      throw error;
    }
  };

  // route like this - /status
  get = async (route: string, withoutLink: boolean = false) => {
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
  };

  // route like this - /status
  async post(route: string, payload?: object, option?: object) {
    checkRoute(route);
    const url = `${this.server}${route}`;
    try {
      const { data } = await axios.post(url, payload, option);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export = Base;