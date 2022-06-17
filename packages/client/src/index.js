import React from 'react';
import ReactDOM from 'react-dom';
import common from '@the-war-effort/common';
import { StoreProvider } from './store';
import { App } from './app';
import './normalize.css';

const { theme } = common;

ReactDOM.render(
  <StoreProvider>
      <App/>
  </StoreProvider>,
  document.getElementById('root'),
);
