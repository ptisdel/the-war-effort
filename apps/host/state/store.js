import React from 'react';
import useGlobalHook from 'use-global-hook';
import { constants } from '../../common';
import * as actions from './actions';

const { defaultLocations } = constants;

const initialState = {
  hostId: null,
  gameState: {
    players: [],
    roles: [],
    budget: 2000000,
    locations: [
      {
        name: defaultLocations.HOME,
        resources: [{ type: 'tank' }],
      },
      {
        name: defaultLocations.FOB,
        resources: [],
      },
    ],
  },
};

const store = useGlobalHook(React, initialState, actions);

export default store;
