import axios from 'axios';


class request {
  
  constructor() {
    let service = axios.create({});
    service.interceptors.request.use(async (config) => {
      return config
    })
    this.service = service;
  }
  
  get(url, callback) {
    return this.service.request({
      method: 'GET',
      url,
      responseType: 'json',
    }).then((response) => callback(response.data));
  }
}

export default new request();
