import _ from 'lodash';

const setPlayerId = (store, playerId) => {
  store.setState({ playerId });
};

const updateGameState = (store, gameState) => {
  store.setState({ gameState });
};

const addMessage = (store, msg) => {
  const messages = [
    ...store.state.messages,
    msg,
  ];

  store.setState({ messages });
};

export default {
  addMessage,
  setPlayerId,
  updateGameState,
}