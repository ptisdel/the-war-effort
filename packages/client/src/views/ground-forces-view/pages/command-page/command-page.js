import _ from 'lodash-es';
import React, { useState } from 'react';
import common from '@the-war-effort/common';
import { moveUnitGroups } from '../../api';
import { useStore } from '@/store';
import * as Styles from './styles';

const { models } = common;

const { groundForcesActions } = api;
const {
  GameState,
  Location,
  UnitGroup,
} = models;

const CommandPage = () => {
  const { gameState } = useStore();

  const [selectedUnitGroupIds, setSelectedUnitGroupIds] = useState([]);

  const locations = GameState.getLocations(gameState);
  const unitGroups = GameState.getUnitGroups(gameState);

  const selectUnitGroup = id => {
    // remove if present;
    if (_.includes(selectedUnitGroupIds, id)) {
      setSelectedUnitGroupIds(_.without(selectedUnitGroupIds, id));
      return;
    }

    // add if not present
    setSelectedUnitGroupIds([
      ...selectedUnitGroupIds,
      id,
    ]);
  };

  const renderUnitGroups = () => _.map(unitGroups, ug => {
    const id = UnitGroup.getId(ug);
    return (
      <Styles.UnitGroup
        key = { id }
        onClick = { () => selectUnitGroup(id) }
        selected = { _.includes(selectedUnitGroupIds, id) }
      >
        { `${UnitGroup.getName(ug)}: ${UnitGroup.getCurrentOrder(ug)} (${JSON.stringify(UnitGroup.getPosition(ug))})`}
      </Styles.UnitGroup>
    );
  });

  const selectLocation = id => {
    if (selectedUnitGroupIds.length === 0) return;

    moveUnitGroups({
      unitGroupIds: selectedUnitGroupIds,
      destinationId: id,
    });

    setSelectedUnitGroupIds([]);
  };

  const renderLocations = () => _.map(locations, l => {
    const name = Location.getName(l);
    const id = Location.getId(l);
    return (
      <Styles.Location
        key = { id }
        onClick = { () => selectLocation(id) }
      >
        { name }
      </Styles.Location>
    );
  });

  return <Styles.Root>
    <h2>Unit Groups</h2>
    { renderUnitGroups() }
    <h2>Locations</h2>
    { renderLocations() }
  </Styles.Root>;
};

export default CommandPage;
