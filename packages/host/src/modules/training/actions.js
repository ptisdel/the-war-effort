import _ from 'lodash-es';
import common from '@the-war-effort/common';

export const graduate = (store, { gameState, trainingGroup }) => {
  // const trainingGroups = GameState.getTrainingGroups(gameState);
  // const location = GameState.getLocationById(gameState, Location.getId(DEFAULT_LOCATIONS.HOME));

  // const newLocation = {
  //   ...location,
  //   resources: [
  //     ...Location.getResources(location),
  //     ...create(TrainingGroup.getGraduateType(trainingGroup), {
  //       amount: TrainingGroup.getTraineeCount(trainingGroup),
  //       faction: ALL_FACTIONS.PLAYERS,
  //     }),
  //   ],
  // };

  // const locations = GameState.getLocations(gameState);
  // const newGameState = {
  //   ...gameState,
  //   trainingGroups: _.without(trainingGroups, trainingGroup),
  //   locations: [
  //     ..._.differenceWith(locations, [location], _.isEqual),
  //     newLocation,
  //   ],
  // };

  // store.setState(newGameState);
};
