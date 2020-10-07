import io from 'socket.io-client';

// new socket connection to server
const socket = io('https://the-war-effort-server.herokuapp.com/?role=client');

export const subscribeToRegistration = cb => socket.on('register-player', playerId => cb(playerId));
export const subscribeToGameState = cb => socket.on('game-state', gameState => cb(gameState));
export const chooseRole = roleName => socket.emit('choose-role', roleName);
export const resignFromRole = roleName => socket.emit('resign-from-role', roleName);
export const sendRegistrationRequest = () => socket.emit('request-registration');

export const airSupportActions = {
  resupplyAircraft: unitId => socket.emit('role-action', { type: 'airSupport/resupplyAircraft', payload: unitId }),
};

export const commanderActions = {
  decreaseRoleBudget: roleName => socket.emit('role-action', { type: 'commander/decreaseRoleBudget', payload: roleName }),
  fireRole: roleName => socket.emit('role-action', { type: 'commander/fireRole', payload: roleName }),
  increaseRoleBudget: roleName => socket.emit('role-action', { type: 'commander/increaseRoleBudget', payload: roleName }),
  requestBudgetIncrease: () => socket.emit('role-action', { type: 'commander/requestBudgetIncrease', payload: undefined }),
};

export const groundForcesActions = {
  moveUnitGroups: moveInfo => socket.emit('role-action', {
    type: 'groundForces/moveUnitGroups',
    payload: moveInfo,
  }),
};

export const logisticsActions = {
  createTravelGroup: travelInfo => socket.emit('role-action', {
    type: 'logistics/createTravelGroup',
    payload: travelInfo,
  }),
};

export const procurementActions = {
  startResearchingPrototype: prototypeId => socket.emit('role-action', {
    type: 'procurement/startResearchingPrototype',
    payload: prototypeId,
  }),
};

export const publicAffairsActions = {
  censorArticle: articleId => socket.emit('role-action', {
    type: 'publicAffairs/censorArticle',
    payload: articleId,
  }),
  createPropagandaCampaign: travelInfo => socket.emit('role-action', {
    type: 'publicAffairs/createPropagandaCampaign',
    payload: travelInfo,
  }),
};

export const trainingActions = {
  createTrainingGroup: trainingInfo => socket.emit('role-action', {
    type: 'training/createTrainingGroup',
    payload: trainingInfo,
  }),
};
