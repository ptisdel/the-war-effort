import _ from 'lodash';

export const setHostId = (store, hostId) => {
  store.setState({ hostId });
};

export const addPlayer = (store, { playerId, role = null }) => { 
  const { gameState } = store.state;
  const { players } = gameState;

  const roleAlreadyAssigned = role !== null && _.includes(players, role);
  if (roleAlreadyAssigned) return;

  const newPlayers = {
    ...players,
    [playerId]: role,
  };

  const newGameState = {
    ...gameState,
    players: newPlayers,
  }

  console.log('registered',playerId);
  console.log(newGameState);
  store.setState({ gameState: newGameState });
};

export const removePlayer = (store, playerId) => {
  const { gameState } = store.state;
  const { players } = gameState;

  const newGameState = {
    ...gameState,
    players: _.omit(players, [playerId]),
  };

  store.setState({ gameState: newGameState });
  
  console.log('removed',playerId);
}

export const addMessage = (store, msg) => {
  const messages = [
    ...store.state.messages,
    msg,
  ];

  store.setState({ messages });
};