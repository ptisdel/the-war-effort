import React from 'react';
import { MapView, NewsView } from '../views';
import * as constants from '../constants';
import { GameEngine } from '../components';

import { useApp } from './logic';

const { CHANNELS } = constants;

export const App = () => {
  const { currentChannel } = useApp();

  return (
    <div>
      <GameEngine/>
      { getCurrentView(currentChannel) }
    </div>
  );
};

function getCurrentView(currentChannel) {
  if (currentChannel === CHANNELS.news) return <NewsView/>;
  if (currentChannel === CHANNELS.map) return <MapView/>;
  return <MapView/>;
}
