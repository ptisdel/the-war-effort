import React from 'react';
import ReactDOM from 'react-dom';
import { FeatureFlagProvider } from '@the-war-effort/feature-flags/react';
import { StoreProvider } from './store';
import { App } from './app.tsx';
import './normalize.css';

ReactDOM.render(
  <FeatureFlagProvider environmentId={process.env.FEATURE_FLAGS_API_KEY}>
    <StoreProvider>
        <App/>
    </StoreProvider>
  </FeatureFlagProvider>,
  document.getElementById('root'),
);
