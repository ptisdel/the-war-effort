import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import { startResearchingPrototype } from '../../api';
import { useStore } from '@/hooks';
import * as Styles from './styles';

const { models } = common;

const {
  GameState,
  Prototype,
  Resource,
} = models;

const { procurementActions } = api;

const ResearchPage = () => {
  const { gameState } = useStore();

  const availablePrototypes = GameState.getPrototypes(gameState);
  const prototypesGroupedByOriginalResource = _.groupBy(
    availablePrototypes,
    r => Resource.getName(Prototype.getOriginalResource(r)),
  );

  const handlePrototypeClick = prototypeId => {
    startResearchingPrototype({ prototypeId });
  };

  const renderPrototype = prototype => {
    const id = Prototype.getId(prototype);
    const name = Prototype.getName(prototype);
    const cost = Prototype.getCost(prototype);
    return (
      <Styles.Prototype key = { name } onClick = { () => handlePrototypeClick(id) }>
        <Styles.PrototypeName>
          { name }
        </Styles.PrototypeName>
        <Styles.PrototypeCost>
          { cost }
        </Styles.PrototypeCost>
        <Styles.PrototypeStats>
          { _.map(Prototype.getStats(prototype), (stat, statName) => (
            <Styles.PrototypeStat key = { statName }> { `${statName}: ${stat}` }</Styles.PrototypeStat>
          )) }
        </Styles.PrototypeStats>
      </Styles.Prototype>
    );
  };

  const renderLists = () => _.map(
    prototypesGroupedByOriginalResource,
    (prototypeGroup, originalResourceName) => (
        <Styles.Group key = { originalResourceName }>
          <Styles.GroupName>{ originalResourceName }</Styles.GroupName>
          <Styles.List>
            { _.map(prototypeGroup, p => renderPrototype(p)) }
          </Styles.List>
        </Styles.Group>
    ),
  );

  return (
    <Styles.Root>
      { renderLists() }
    </Styles.Root>
  );
};

export default ResearchPage;
