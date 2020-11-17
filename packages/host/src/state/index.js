import React from 'react';
import useGlobalHook from 'use-global-hook';
import * as actions from './actions';
import * as scenarios from '../scenarios';

const initialState = scenarios.afghanistanScenario;

export const store = useGlobalHook(React, initialState, actions);
