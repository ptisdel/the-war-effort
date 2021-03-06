import _ from 'lodash-es';
import { useState } from 'react';
import common from '@the-war-effort/common';
import { useStore } from '../../../../hooks';

const { ALL_ROLES } = common.constants;
const {
  Feature,
  GameState,
  Location,
  Resource,
  Role,
  Unit,
} = common.models;

export const useDebugInfo = () => {
  const [isDebugInfoOpen, setIsDebugInfoOpen] = useState(false);

  // state info
  const { gameState } = useStore();

  const locations = GameState.getLocations(gameState);
  const players = GameState.getPlayers(gameState);
  const roles = GameState.getRoles(gameState);

  const sortedLocations = _.sortBy(locations, l => Location.getName(l));
  const locationsFormatted = _.map(sortedLocations, l => {
    const id = Location.getId(l);
    const features = Location.getFeatures(l);
    const name = Location.getName(l);
    const resources = Location.getResources(l);
    const units = GameState.getUnitsByLocation(gameState, id);

    return {
      features: _.map(features, f => Feature.getName(f)),
      name,
      resources: _.map(resources, r => `${Resource.getAmount(r)} ${Resource.getName(r, Resource.getAmount(r))}`),
      units: _.map(units, u => `${Unit.getFaction(u)} ${Unit.getName(u)}`),
    };
  });

  const playersFormatted = _.map(players, p => {
    const role = _.find(roles, r => Role.getPlayerId(r) === p);
    const roleName = Role.getName(role) || ALL_ROLES.AUDIENCE;
    const budget = Role.getFormattedBudget(role) || '$0';

    return {
      budget,
      roleName,
    };
  });

  return [
    {
      isOpen: isDebugInfoOpen,
      locations: locationsFormatted,
      players: playersFormatted,
    },
    {
      onToggle: () => setIsDebugInfoOpen(!isDebugInfoOpen),
    },
  ];
};
