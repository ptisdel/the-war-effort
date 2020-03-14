import React from 'react';
import useGlobalHook from 'use-global-hook';
import * as actions from './actions';
import scenarios from '../scenarios';

const { test } = scenarios;

const initialState = {
  currentChannel: 'map',
  gameState: test,
};

const store = useGlobalHook(React, initialState, actions);

export default store;
