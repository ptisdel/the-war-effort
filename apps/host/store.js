import _ from 'lodash';

class Store {
  constructor() {
    this._playerId = null;
    this._gameData = {
      players: [],
    };
  } 

  getPlayerId() {
    return this._playerId;
  }

  setPlayerId(playerId) {
    this._playerId = playerId;
  }

  getGameData() {
    return this._gameData;
  }

  addPlayer({ id, role = null }) {
    const players = this._gameData.players;
    const roleAlreadyAssigned = role !== null && _.includes(players, role);
    if (roleAlreadyAssigned) return;

    const gd = this._gameData;
    this._gameData = {
      ...gd,
      players: {
        ...gd.players,
        [id]: role,
      }
    };
  }
};

export const store = new Store();


/* Player:
  {
    role: 'commander',
    playerId: '14124255',
  }
*/
const initialGameState = {
  players: [],
};
