import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../../../api';
import state from '../../../../state';
import * as Styles from './parliament-page.styles';

const { models } = common;

const { commanderActions } = api;
const { Budget, GameState } = models;
const { store } = state;

const FundingPage = () => {
  const [globalState] = store();

  const { gameState } = globalState;
  const budget = GameState.getBudget(gameState);

  const requestBudgetIncrease = () => commanderActions.requestBudgetIncrease();

  return (
    <Styles.Root>
      <h2 as = { Styles.ParliamentSentiment }>
        { `Parliament Sentiment: ${GameState.getParliamentSupportingMemberCount(gameState)} out of ${GameState.getParliamentTotalMemberCount(gameState)}` }
      </h2>
      <h3 as = { Styles.Budget }>
        { `Current Budget: ${Budget.getFormattedTotal(budget)}` }
      </h3>
      <button
        as = { Styles.RequestButton }
        onClick = { requestBudgetIncrease }
      >Request Additional Appropriations</button>
    </Styles.Root>
  );
};

export default FundingPage;
