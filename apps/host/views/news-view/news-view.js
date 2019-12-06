import _ from 'lodash';
import React from 'react';
import * as Styles from './styles';
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

  const getPlayerRole = player => _.find(roles, p => Role.getPlayer(p) === player);
  
  return (
    <Styles.Root>
      <GameEngine/>
      <Styles.PlayerList>
        { _.map(players, (p, key) => {
          const role = getPlayerRole(p) || defaultRole;
          return <li key = { key }>{ [role] } : { Role.getBudget(role) || '$0' }</li>
        })}
      </Styles.PlayerList>
      
      
    </Styles.Root>
  )
};