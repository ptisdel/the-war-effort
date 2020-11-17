import _ from 'lodash-es';
import common from '@the-war-effort/common';
import { Article } from '@the-war-effort/common/models';

const { helpers, models } = common;
const { log } = helpers;
const { GameState } = models;

export const censorArticle = (store, articleId) => {
  const gameState = store.state;

  const liveArticles = GameState.getLiveArticles(gameState);
  const censoredArticles = GameState.getCensoredArticles(gameState);
  const articleToCensor = _.find(liveArticles, a => Article.getId(a) === articleId);
  if (!articleToCensor) return;

  const newLive = _.without(liveArticles, articleToCensor);
  const newCensored = _.concat(censoredArticles, articleToCensor);

  const newGameState = {
    ...gameState,
    articles: {
      live: newLive,
      censored: newCensored,
    },
  };
  log('publicAffairs', `Censoring article ${articleId}.`);

  store.setState(newGameState);
};
