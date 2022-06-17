import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../api';
import { useStore } from '@/store';
import * as Styles from './styles';

const { models } = common;

const { requestBudgetIncrease } = api;
const { Budget, GameState } = models;

const FundingPage = () => {
  const { gameState } = useStore();

  const budget = GameState.getBudget(gameState);

  return (
    <Styles.Root>
      <h2 as = { Styles.ParliamentSentiment }>
        { `Parliament Sentiment: ${GameState.getParliamentSupportingMemberCount(gameState)} out of ${GameState.getParliamentTotalMemberCount(gameState)}` }
      </h2>
      <h3 as = { Styles.Budget }>
        { `Current Budget: ${Budget.getFormatted(budget)}` }
      </h3>
      <button
        as = { Styles.RequestButton }
        onClick = { () => requestBudgetIncrease(50) }
      >Request Additional Appropriations</button>
    </Styles.Root>
  );
};

export default FundingPage;
