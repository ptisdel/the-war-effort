import React from 'react';
import useGlobalHook from 'use-global-hook';
import * as actions from './actions';

const initialState = {
  hostId: null,
  gameState: {
    players: [],
    roles: [],
    budget: 2000000,
  },
};

const store = useGlobalHook(React, initialState, actions);

export default store;
