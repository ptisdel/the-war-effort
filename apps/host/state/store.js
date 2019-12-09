import React from 'react';
import useGlobalHook from 'use-global-hook';
import { constants } from '../../common';
import * as actions from './actions';

const { defaultLocations } = constants;

const initialState = {
  gameState: {
    players: [],
    roles: [],
    budget: 2000000,
    locations: [
      {
        name: defaultLocations.HOME,
        heavyTransports: [
          {
            id: '1234',
            name: 'C-17 Globemaster III',
            capacity: 6,
            cargo: [],
          },
        ],
        resources: [{ id: '14J4', size: 2, type: 'tank' }],
      },
      {
        name: defaultLocations.FOB,
        heavyTransports: [],
        resources: [],
      },
    ],
    travelGroups: [],
  },
};

const store = useGlobalHook(React, initialState, actions);

export default store;
