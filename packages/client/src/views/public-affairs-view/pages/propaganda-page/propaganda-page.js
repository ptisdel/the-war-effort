import React from 'react';
import common from '@the-war-effort/common';
// import * as api from '../../../../api';
import { useStore } from '../../../../hooks';
import * as Styles from './propaganda-page.styles';

const { models } = common;

// const { publicAffairsActions } = api;
const { GameState } = models;

const PropagandaPage = () => {
  const { gameState } = useStore();

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
