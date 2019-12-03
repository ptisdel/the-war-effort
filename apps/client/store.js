class Store {
  constructor() {
    this._playerId = null;
  } 

  getPlayerId() {
    return this._playerId;
  }

  setPlayerId(playerId) {
    this._playerId = playerId;
  }
};

export const store = new Store();
