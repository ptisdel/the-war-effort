import _ from 'lodash-es';
import { useState } from 'react';
import common from '@the-war-effort/common';
import state from '../../../../state';

const { allRoles } = common.constants;
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
  const [globalState] = state.store();
  const { gameState } = globalState;

  const locations = GameState.getLocations(gameState);
  const players = GameState.getPlayers(gameState);
  const roles = GameState.getRoles(gameState);

  const sortedLocations = _.sortBy(locations, l => Location.getName(l));
  const locationsFormatted = _.map(sortedLocations, l => ({
    features: _.map(Location.getFeatures(l), f => Feature.getName(f)),
    name: Location.getName(l),
    resources: _.map(Location.getResources(l), r => `${Resource.getAmount(r)} ${Resource.getFaction(r)} ${Resource.getName(r, Resource.getAmount(r))}`),
    units: _.map(Location.getUnits(l), u => `${Unit.getFaction(u)} ${Unit.getName(u)}`),
  }));

  const playersFormatted = _.map(players, p => {
    const role = _.find(roles, r => Role.getPlayerId(r) === p);
    const roleName = Role.getName(role) || allRoles.AUDIENCE;
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
