import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import { createTrainingGroup } from '../../api';
import { useStore } from '../../../../hooks';
import * as Styles from './army-training-page.styles';

const { constants, models } = common;

const { trainingActions } = api;
const {
  ALL_ROLES, ALL_FACTIONS, ALL_FEATURE_TYPES, DEFAULT_LOCATIONS,
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

const ArmyTrainingPage = () => {
  const { gameState } = useStore();

  const homeLocation = GameState.getLocationById(gameState, Location.getId(DEFAULT_LOCATIONS.HOME));

  const renderTrainingOptions = () => {
    if (!homeLocation) return null;

    const availableTrainingFeatures = Location.getFactionFeaturesByType(
      homeLocation,
      ALL_FACTIONS.PLAYERS,
      ALL_FEATURE_TYPES.TRAINING,
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
        createTrainingGroup({ featureId });
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
  const trainingRole = _.find(roles, r => Role.getName(r) === ALL_ROLES.TRAINING);
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
