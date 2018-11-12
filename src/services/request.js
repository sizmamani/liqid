import axios from 'axios';

//A SIMPLE REQUEST SERVICE WRAPPER ONLY GOOD FOR SUNNY DAYS!
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
