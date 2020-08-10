import _ from 'lodash-es';
import React from 'react';
import * as Styles from './styles';
import { useOverviewPage } from './logic';

export const OverviewPage = () => {
  const [{ airBases }, { resupplyAircraft }] = useOverviewPage();

  return (
    <Styles.Root>
      {
        _.map(airBases, ab => (
          <Styles.Airbase key = { ab.id }>
            <Styles.AirbaseName>{ ab.name }</Styles.AirbaseName>
            <Styles.AircraftList>
              { _.map(ab.aircraft, a => (
                <Styles.Aircraft key = { a.id } onClick = { () => resupplyAircraft(a.id) } >
                  <Styles.AircraftName>{ a.name }</Styles.AircraftName>
                  <Styles.AircraftAmmo> { a.ammoRatio }</Styles.AircraftAmmo>
                </Styles.Aircraft>
              )) }
            </Styles.AircraftList>
          </Styles.Airbase>
        ))
      }
    </Styles.Root>
  );
};
