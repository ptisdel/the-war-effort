import _ from 'lodash';
import React from 'react';
import common from '@the-war-effort/common';
import * as api from '../../../../api';
import state from '../../../../state';
import * as Styles from './army-training-page.styles';

const { constants, models } = common;

const { trainingActions } = api;
const { defaultLocations, armyTrainingPaths } = constants;
const {
  Budget, GameState, Location, TrainingPath,
} = models;
const { store } = state;

const ArmyTrainingPage = () => {
  const [globalState] = store();
  const { gameState } = globalState;

  const homeLocation = GameState.getLocationByName(gameState, defaultLocations.HOME);

  const renderTrainingOptions = () => {
    if (!homeLocation) return null;


    return _.map(armyTrainingPaths, path => {
      const requiredFeatureName = TrainingPath.getHostFeatureName(path);
      const existingFeatures = Location.getFeaturesByName(homeLocation, requiredFeatureName);

      if (existingFeatures.length > 0) {
        const pathName = TrainingPath.getName(path);
        const traineeCount = _.reduce(existingFeatures, (acc, feature) => acc + _.get(feature, 'traineeCount'), 0);
        const maxTraineeCount = _.reduce(existingFeatures, (acc, feature) => acc + _.get(feature, 'maxTraineeCount'), 0);

        return (
          <Styles.TrainingPath key = { pathName }>
            <Styles.PathName>{ pathName }</Styles.PathName>
            <Styles.PathTraineeCount>
              { `${traineeCount} / ${maxTraineeCount}`}
            </Styles.PathTraineeCount>
          </Styles.TrainingPath>
        );
      }

      return null;
    });
  };

  return (
    <Styles.Root>
      <h1>Army Training</h1>
      { renderTrainingOptions() }
    </Styles.Root>
  );
};

export default ArmyTrainingPage;
