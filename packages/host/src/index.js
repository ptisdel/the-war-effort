import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { FeatureFlagProvider } from '@the-war-effort/feature-flags/react';
import { App } from './app';
import './normalize.css';

ReactDOM.render(
  <FeatureFlagProvider environmentId={process.env.FEATURE_FLAGS_API_KEY}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </FeatureFlagProvider>,
  document.getElementById('root'),
);
