import React from 'react';
import ReactDOM from 'react-dom';
import common from '@the-war-effort/common';
import { ThemeProvider } from 'styled-components';
import { App } from './app';
import './normalize.css';

const { theme } = common;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>,
  document.getElementById('root'),
);
