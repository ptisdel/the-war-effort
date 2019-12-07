import _ from 'lodash';
import React from 'react';
import * as Styles from './news-view.styles';
import components from '../../components';
import state from '../../state';
import { constants, models } from '../../../shared';

const { GameEngine } = components;
const { defaultRole } = constants;
const { Role } = models;
const { store } = state;

export const NewsView = () => {
  const [globalState] = store();

  const { players, roles } = globalState.gameState;

  const getPlayerRole = player => _.find(roles, r => Role.getPlayer(r) === player);
  
  const renderPlayerList = () => {
    return _.map(players, (p, key) => {
      const role = getPlayerRole(p);
      const roleName = Role.getName(role) || defaultRole;
      return <li key = { key }>{ roleName } : { Role.getFormattedBudget(role) || '$0' }</li>
    });
  };

  return (
    <Styles.Root>
      <GameEngine/>
      <div>News View</div>
      <Styles.PlayerList>
        { renderPlayerList() }
      </Styles.PlayerList>
      
      
    </Styles.Root>
  )
};