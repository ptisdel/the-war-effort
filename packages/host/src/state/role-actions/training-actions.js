import common from '@the-war-effort/common';
import { Feature } from '@the-war-effort/common/models';

const { constants, models } = common;

const {
  GameState,
  Location,
  TrainingPath,
} = models;

export const createTrainingGroup = (store, payload) => {
  const { gameState } = store.state;
  const { featureId } = payload;

  const { ALL_FACTIONS, ALL_FEATURE_TYPES, DEFAULT_LOCATIONS } = constants;
  const home = GameState.getLocationById(gameState, Location.getId(DEFAULT_LOCATIONS.HOME));
  const feature = Location.getFeatureById(home, featureId);
  if (
    !feature
    || Feature.getType(feature) !== ALL_FEATURE_TYPES.TRAINING
    || Feature.getFaction(feature) !== ALL_FACTIONS.PLAYERS
  ) return;

  const travelGroupAlreadyExists = Boolean(GameState.getTravelGroupAtFeatureId(
    gameState,
    featureId,
  ));
  if (travelGroupAlreadyExists) return;

  const trainingPath = Feature.getTrainingOffered(feature);
  const trainingLength = TrainingPath.getLength(trainingPath) * 1000; // in milliseconds
  const newTrainingGroup = ({
    end: new Date((new Date()).getTime() + trainingLength).getTime(),
    featureId,
    graduateType: TrainingPath.getGraduateType(trainingPath),
    start: new Date().getTime(),
    traineeCount: Feature.getMaxTraineeCount(feature),
  });

  const trainingGroups = GameState.getTrainingGroups(gameState);
  const newGameState = {
    ...gameState,
    trainingGroups: [
      ...trainingGroups,
      newTrainingGroup,
    ],
  };

  store.setState({ gameState: newGameState });
};
