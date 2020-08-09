import React from 'react';
import useGlobalHook from 'use-global-hook';
import * as actions from './actions';
import * as scenarios from '../scenarios';

const { afghanistanScenario } = scenarios;

const initialState = {
  currentChannel: 'map',
  gameState: afghanistanScenario,
};

const store = useGlobalHook(React, initialState, actions);

export default store;
