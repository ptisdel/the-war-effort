import * as actions from './actions';

const { addPlayer } = actions;

let testState = {};

const store = {
  state: {
    gameState: {
      players: [
        'fTgjKkRCXjdkqtrDAADK',
      ],
      roles: [],
      budget: 2000000,
    },
  },
  setState: newState => { testState = newState; },
};

const resultStore = {
  state: {
    gameState: {
      players: [
        'fTgjKkRCXjdkqtrDAADK',
        '012345',
      ],
      roles: [],
      budget: 2000000,
    },
  },
  setState: newState => { testState = newState; },
};

test('addPlayer should add a new player', () => {
  addPlayer(store, '012345');
  expect(testState).toBe(resultStore);
});
