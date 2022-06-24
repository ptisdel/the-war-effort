import React from 'react';
import ReactDOM from 'react-dom';
import common from '@the-war-effort/common';
import { FeatureFlagProvider } from '@the-war-effort/feature-flags/react';
import { StoreProvider } from './store';
import { App } from './app';
import './normalize.css';

const { theme } = common;

ReactDOM.render(
  <FeatureFlagProvider environmentId={process.env.FEATURE_FLAGS_API_KEY}>
    <StoreProvider>
        <App/>
    </StoreProvider>
  </FeatureFlagProvider>,
  document.getElementById('root'),
);
