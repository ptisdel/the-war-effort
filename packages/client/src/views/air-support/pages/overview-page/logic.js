import _ from 'lodash-es';
import common from '@the-war-effort/common';
import { resupplyAircraft } from '../../api';
import { useStore } from '@/hooks';

const { constants, models } = common;

const { ALL_FACTIONS, ALL_FEATURE_TYPES } = constants;
const {
  Feature,
  GameState,
  Location,
  Unit,
} = models;

export const useOverviewPage = () => {
  const { gameState } = useStore();

  const playerAirbases = _.reduce(GameState.getLocations(gameState),
    (acc, l) => [
      ...acc,
      ...Location.getFactionFeaturesByType(l, ALL_FACTIONS.PLAYERS, ALL_FEATURE_TYPES.AIRPORT),
    ], []);

  const airBases = _.map(playerAirbases, ab => {
    const id = Feature.getId(ab);
    const name = Feature.getName(ab);
    const aircraft = Feature.getUnits(ab);

    const formattedAircraft = _.map(aircraft, a => {
      const aircraftId = Unit.getId(a);
      const aircraftName = Unit.getName(a);
      const type = Unit.getType(a);
      const ammo = Unit.getAmmo(a);
      const maxAmmo = Unit.getMaxAmmo(a);

      return {
        id: aircraftId,
        name: `${aircraftName}: ${type}`,
        ammoRatio: `${ammo}/${maxAmmo}`,
      };
    });

    return {
      id,
      name,
      aircraft: formattedAircraft,
    };
  });

  return [{ airBases }, { resupplyAircraft }];
};
