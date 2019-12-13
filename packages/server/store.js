class Store {
  constructor() {
    this._hostId = null;
  } 

  getHost() {
    return this._hostId;
  }

  setHost(hostId) {
    this._hostId = hostId;
  }
};

export const store = new Store();
