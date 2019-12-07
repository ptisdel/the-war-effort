import _ from 'lodash';

const setPlayerId = (store, playerId) => {
  store.setState({ playerId });
};

const updateGameState = (store, gameState) => {
  store.setState({ gameState });
};

export default {
  setPlayerId,
  updateGameState,
}