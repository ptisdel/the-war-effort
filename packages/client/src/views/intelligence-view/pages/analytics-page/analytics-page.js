import _ from 'lodash-es';
import React from 'react';
import common from '@the-war-effort/common';
import { useStore } from '@/hooks';
import * as Styles from './styles';

const {
  constants,
  models,
} = common;

const {
  ALL_FACTIONS,
} = constants;

const {
  Location,
  Feature,
  GameState,
  Unit,
} = models;

const AnalyticsPage = () => {
  const { gameState } = useStore();

  const renderFeatures = features => (
    <Styles.LocationFeatures>
      { _.map(features, f => {
        const locFeatureName = Feature.getName(f);
        return (
          <Styles.LocationFeature key = { locFeatureName }>
            { locFeatureName }
          </Styles.LocationFeature>
        );
      })}
    </Styles.LocationFeatures>
  );

  const renderUnits = units => (
    <Styles.LocationUnits>
      { _.map(units, u => {
        const locUnitId = Unit.getId(u);
        const locUnitName = Unit.getName(u);
        return <Styles.LocationUnit key = { locUnitId }>{ locUnitName }</Styles.LocationUnit>;
      })}
    </Styles.LocationUnits>
  );

  const renderLocation = ({ name, features, units }) => {
    const everythingByFaction = _.reduce(ALL_FACTIONS, (acc, factionName) => ({
      ...acc,
      [factionName]: {
        units: _.filter(units, u => Unit.getFaction(u) === factionName),
        features: _.filter(features, f => Feature.getFaction(f) === factionName),
      },
    }), {});

    return (
      <Styles.Location key = { name }>
        <Styles.LocationName>{ name }</Styles.LocationName>

          {
            _.map(everythingByFaction, e => {
              const locFeatures = _.get(e, 'features');
              const locUnits = _.get(e, 'units');

              return (
                <Styles.LocationContent>
                  { renderFeatures(locFeatures) }
                  { renderUnits(locUnits) }
                </Styles.LocationContent>
              );
            })
          }

      </Styles.Location>
    );
  };

  // const renderLocations = () => {
  //   const locations = GameState.getLocations(gameState);

  //   return _.map(locations, l => {
  //     const name = Location.getName(l);
  //     const features = Location.getFeatures(l);
  //     const units = Location.getUnits(l);

  //     return renderLocation({ name, features, units });
  //   });
  // };

  return (
    <Styles.Root>
      <h2>Analytics</h2>
      {/* { renderLocations() } */}
    </Styles.Root>
  );
};

export default AnalyticsPage;
