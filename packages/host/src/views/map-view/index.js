import _ from 'lodash-es';
import React from 'react';
import { useMapView } from './logic';
import { DebugInfo } from './components/debug-info';
import { LocationMarker, PathLine } from './components/markers';

export const MapView = () => {
  const [
    { locations, paths },
  ] = useMapView();

  return (
    <div style={{
      background: 'lightgrey',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      position: 'fixed',
    }}>
        {
          _.map(locations, (l, i) => <LocationMarker
            abbreviation = { l.abbreviation }
            label = { l.label }
            key = { i }
            lat = { l.lat }
            lng = { l.lng }
          />)
        }
        {
          _.map(paths, (p, i) => <PathLine
            key = { i }
            locationA = {p.locationA}
            locationB = {p.locationB}
          />)
        }
      <DebugInfo/>
    </div>
  );
};
