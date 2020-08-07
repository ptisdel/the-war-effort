import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../../../api';
import state from '../../../../state';
import * as Styles from './army-training-page.styles';

const { constants, models } = common;

const { trainingActions } = api;
const {
  allRoles, allFactions, allFeatureTypes, defaultLocations,
} = constants;
const {
  Feature,
  GameState,
  Location,
  Resource,
  Role,
  TrainingGroup,
  TrainingPath,
} = models;
const { store } = state;

const ArmyTrainingPage = () => {
  const [globalState] = store();
  const { gameState } = globalState;

  const homeLocation = GameState.getLocationById(gameState, Location.getId(defaultLocations.HOME));

  const renderTrainingOptions = () => {
    if (!homeLocation) return null;

    const availableTrainingFeatures = Location.getFactionFeaturesByType(
      homeLocation,
      allFactions.PLAYERS,
      allFeatureTypes.TRAINING,
    );

    return _.map(availableTrainingFeatures, feature => {
      const trainingPath = Feature.getTrainingOffered(feature);
      const trainingPathName = TrainingPath.getName(trainingPath);
      const traineeType = TrainingPath.getTraineeType(trainingPath);
      const traineeTypeName = Resource.getName(traineeType);
      const graduateType = TrainingPath.getGraduateType(trainingPath);
      const graduateTypeName = Resource.getName(graduateType);
      const maxTraineeCount = Feature.getMaxTraineeCount(feature);

      const trainingGroups = GameState.getTrainingGroups(gameState);
      const trainingGroup = _.find(
        trainingGroups,
        tg => TrainingGroup.getFeatureId(tg) === Feature.getId(feature),
      );
      const traineeCount = TrainingGroup.getTraineeCount(trainingGroup) || 0;

      const getProgressBarAttributes = () => {
        if (trainingGroup) {
          const startingTime = TrainingGroup.getStart(trainingGroup);
          const endingTime = TrainingGroup.getEnd(trainingGroup);
          const trainingLength = (endingTime - startingTime) / 1000; // in seconds
          const nowTime = new Date().getTime();
          const timeCompletedSoFar = (nowTime - startingTime) / 1000; // in seconds
          const startingPercent = `${(timeCompletedSoFar / trainingLength) * 100}%`;
          const timeRemaining = `${(trainingLength - timeCompletedSoFar)}s`;

          return {
            startingPercent,
            timeRemaining,
          };
        }

        return null;
      };

      const handlePathClick = featureId => {
        trainingActions.createTrainingGroup({ featureId });
      };

      return (
          <Styles.TrainingPath
            key = { trainingPathName }
            onClick = { () => handlePathClick(Feature.getId(feature)) }
          >
            <Styles.PathProgressBar { ...getProgressBarAttributes() } />
            <Styles.PathContent>
              <Styles.PathName>{ trainingPathName }</Styles.PathName>
              <Styles.PathDescription>
                { `Turns ${traineeTypeName} into ${graduateTypeName}.`}
              </Styles.PathDescription>
              <Styles.PathTraineeCount>
                { `${traineeCount} / ${maxTraineeCount}`}
              </Styles.PathTraineeCount>
            </Styles.PathContent>
          </Styles.TrainingPath>
      );
    });
  };

  const { roles } = gameState;
  const trainingRole = _.find(roles, r => Role.getName(r) === allRoles.TRAINING);
  const trainingFormattedBudget = Role.getFormattedBudget(trainingRole);

  return (
    <Styles.Root>
      <h1>Army Training</h1>
      <p>{ trainingFormattedBudget }</p>
      { renderTrainingOptions() }
    </Styles.Root>
  );
};

export default ArmyTrainingPage;
