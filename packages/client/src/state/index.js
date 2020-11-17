import React from 'react';
import useGlobalHook from 'use-global-hook';
import actions from './actions';

const initialState = {
  playerId: null,
  gameState: {},
};

export const store = useGlobalHook(React, initialState, actions);
