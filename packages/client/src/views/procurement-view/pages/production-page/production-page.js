import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import state from '../../../../state';
import * as Styles from './styles';

const { constants, models } = common;

const {
  ALL_RESOURCES,
  ALL_RESOURCE_TYPES,
} = constants;
const {
  GameState,
  Resource,
} = models;

const { store } = state;

const researchableResourceTypes = [
  ALL_RESOURCE_TYPES.AIRCRAFT,
  ALL_RESOURCE_TYPES.AMMUNITION,
  ALL_RESOURCE_TYPES.GROUND_VEHICLE,
];
const resourcesGroupedByType = _.groupBy(ALL_RESOURCES, r => Resource.getType(r));

const ProductionPage = () => {
  const [globalState] = store();
  const { gameState } = globalState;

  const renderResearchItems = resourceGroup => _.map(resourceGroup, r => {
    const name = Resource.getName(r);
    return <Styles.ResearchItem key = { name }>{ name }</Styles.ResearchItem>;
  });

  const renderLists = () => _.map(resourcesGroupedByType, (rg, key) => {
    if (_.includes(researchableResourceTypes, key)) {
      return (
        <Styles.Group key = { key }>
          <Styles.GroupName>{ key }</Styles.GroupName>
          <Styles.List key = { key }>
            { renderResearchItems(rg) }
          </Styles.List>
        </Styles.Group>
      );
    }
  });

  return (
    <Styles.Root>
      { renderLists() }
    </Styles.Root>
  );
};

export default ProductionPage;
