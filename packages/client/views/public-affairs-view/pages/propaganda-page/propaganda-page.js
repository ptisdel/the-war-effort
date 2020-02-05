import React from 'react';
import common from '@the-war-effort/common';
// import * as api from '../../../../api';
import state from '../../../../state';
import * as Styles from './propaganda-page.styles';

const { models } = common;

// const { publicAffairsActions } = api;
const { GameState } = models;
const { store } = state;

const PropagandaPage = () => {
  const [globalState] = store();

  const { gameState } = globalState;
  const publicSupport = GameState.getPublicSupport(gameState);

  // const requestBudgetIncrease = () => publicAffairsActions.requestBudgetIncrease();

  return (
      <Styles.Root>
        <Styles.PublicSupport>
          { `Public Support: ${publicSupport}%` }
        </Styles.PublicSupport>
        <Styles.Campaigns>

        </Styles.Campaigns>
        <button as = { Styles.NewCampaignButton }>
          Create Ad Campaign
        </button>
      </Styles.Root>
  );
};

export default PropagandaPage;
