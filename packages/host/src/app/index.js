import React from 'react';
import common from '@the-war-effort/common';
import { MapView, NewsView } from '../views';
import { GameEngine } from './game-engine';
import { useApp } from './logic';

const { ALL_CHANNELS } = common.constants;

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
  if (currentChannel === ALL_CHANNELS.news) return <NewsView/>;
  if (currentChannel === ALL_CHANNELS.map) return <MapView/>;
  return <MapView/>;
}
