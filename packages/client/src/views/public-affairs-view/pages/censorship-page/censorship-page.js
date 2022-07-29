import _ from 'lodash-es';
import React, { useState } from 'react';
import common from '@the-war-effort/common';
import { useStore } from '@/store';
import { censorArticle } from '../../api';
import * as Styles from './censorship-page.styles';

const { models } = common;

const { Article, GameState } = models;

const CensorshipPage = () => {
  const { gameState } = useStore();

  const censoredArticles = GameState.getCensoredArticles(gameState);
  const liveArticles = GameState.getLiveArticles(gameState);

  const [openArticleId, setOpenArticleId] = useState(null);

  const handleCensor = articleId => {
    censorArticle(articleId);
    if (openArticleId === articleId) setOpenArticleId(null);
  };

  const handleHeaderClick = id => setOpenArticleId((openArticleId === id) ? null : id);

  const renderLiveArticles = () => _.map(liveArticles, a => {
    const author = Article.getAuthor(a);
    const body = Article.getBody(a);
    const id = Article.getId(a);
    const isOpen = (id === openArticleId);
    const title = Article.getTitle(a);
    const views = Article.getViews(a);

    return (
        <Styles.Article key = { id }>
          <Styles.Header onClick = { () => handleHeaderClick(id) }>
            <Styles.Title>{ title }</Styles.Title>
            <Styles.Views>{ views }</Styles.Views>
          </Styles.Header>
          <Styles.Expanded isOpen = { isOpen }>
            <Styles.Body>{ body }</Styles.Body>
            <Styles.Author>{ author }</Styles.Author>
            <button as = { Styles.Censor } onClick = { () => handleCensor(id) }>Censor</button>
          </Styles.Expanded>
        </Styles.Article>
    );
  });

  const renderCensoredArticles = () => _.map(censoredArticles, a => {
    const author = Article.getAuthor(a);
    const body = Article.getBody(a);
    const id = Article.getId(a);
    const isOpen = (id === openArticleId);
    const title = Article.getTitle(a);
    const views = Article.getViews(a);

    return (
        <Styles.Article key = { id }>
          <Styles.Header onClick = { () => handleHeaderClick(id) }>
            <Styles.Title>{ title }</Styles.Title>
            <Styles.Views>{ views }</Styles.Views>
          </Styles.Header>
          <Styles.Expanded isOpen = { isOpen }>
            <Styles.Body>{ body }</Styles.Body>
            <Styles.Author>{ author }</Styles.Author>
          </Styles.Expanded>
        </Styles.Article>
    );
  });

  return (
      <Styles.Root>
        <Styles.LiveArticles>
          { renderLiveArticles() }
        </Styles.LiveArticles>

        <h2>Censored Articles</h2>
        <Styles.CensoredArticles>
          { renderCensoredArticles() }
        </Styles.CensoredArticles>
      </Styles.Root>
  );
};

export default CensorshipPage;
