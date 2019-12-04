import _ from 'lodash';

export const setPlayerId = (store, playerId) => {
  store.setState({ playerId });
};

export const updateGameState = (store, gameState) => {
  store.setState({ gameState });
};

export const addMessage = (store, msg) => {
  const messages = [
    ...store.state.messages,
    msg,
  ];

  store.setState({ messages });
};