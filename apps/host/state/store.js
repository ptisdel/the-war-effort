import React from 'react';
import useGlobalHook from 'use-global-hook';
import * as actions from './actions';

const initialState = {
  hostId: null,
  messages: [],
  gameState: {
    players: [],
    roles: [
      'Commander',
      'Logistics Officer',
      'Air Support Officer',
      'Public Affairs Officer',
    ],
  },
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;