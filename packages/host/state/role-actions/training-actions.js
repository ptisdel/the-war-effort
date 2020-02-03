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

  const { allFactions, allFeatureTypes, defaultLocations } = constants;
  const home = GameState.getLocationByName(gameState, defaultLocations.HOME);
  const feature = Location.getFeatureById(home, featureId);
  if (
    !feature
    || Feature.getType(feature) !== allFeatureTypes.TRAINING
    || Feature.getFaction(feature) !== allFactions.PLAYERS
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
