class TaskModel {
  constructor() {
    this.serviceURL = 'http://localhost:3000';
    this.serviceName = 'task';
  }

  get request() {
    return this;
  }

  get without () {
    return this;
  }

  get with () {
    return this;
  }

  async body (url, method = 'GET', body = '') {
    return this._request(url, method, body);
  }

  async method (url, method = 'GET') {
    return this._request(url, method, '');
  }

  async _request (url, method, body) {
    try {
      if (body === '') {
        var res = await fetch(url, {
          method: method,
        });
      } else {
        res = await fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
        });
      }
      
      if (!res.ok) {
        throw Error(res);
      }
      
      let data = await res.json();
      return data;
    } catch(e) {
      throw e;
    }
  }

  async list () {
    let url = this.serviceURL+'/'+this.serviceName+'s';
    return this.request.without.body(url);
  }

  async find(id) {
    let url = this.serviceURL+'/'+this.serviceName+'/'+id;
    return this.request.without.body(url);
  }

  async update(id, task) {
    let url = this.serviceURL+'/'+this.serviceName+'/'+id;
    return this.request.with.body(url, 'PUT', task);
  }

  async create(task) {
    let url = this.serviceURL+'/'+this.serviceName;
    return this.request.with.body(url, 'POST', task);
  }

  async delete(id) {
    let url = this.serviceURL+'/'+this.serviceName+'/'+id;
    return this.request.with.method(url, 'DELETE');
  }
}

export default new TaskModel();