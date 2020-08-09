import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import * as Styles from './news-view.styles';
import state from '../../state';

const { constants, models } = common;

const { allRoles } = constants;
const {
  Feature,
  Location,
  Resource,
  Role,
  Unit,
} = models;
const { store } = state;

export const NewsView = () => {
  const [globalState] = store();

  const {
    players,
    locations,
    mapPosition,
    roles,
  } = _.get(globalState, 'gameState');

  return (
    <Styles.Root>
      <div>News</div>
    </Styles.Root>
  );
};
