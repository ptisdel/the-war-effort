import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { TestView } from './index';

export const App = () => {
  return <Switch>
    <Route exact path = '/' component = {TestView}/>
    <Redirect to='/' />
  </Switch>;
}
