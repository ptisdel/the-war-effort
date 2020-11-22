import React from 'react';
import * as s from './styles';

export const LocationMarker = ({
  abbreviation, label, lat, lng,
}) => (
  <s.Marker lat={lat} lng={lng}>
    <s.Icon>{ abbreviation }</s.Icon>
    <s.Label>{ label }</s.Label>
  </s.Marker>
);

export const PathLine = ({
  locationA, locationB,
}) => (
  <svg height='100%' width='100%'>
    <line
      stroke='black'
      x1={`${locationA.lat}%`}
      y1={`${locationA.lng}%`}
      x2={`${locationB.lat}%`}
      y2={`${locationB.lng}%`}
    />
  </svg>
);

export const UnitGroupMarker = ({ abbreviation, label }) => (
  <div>
    { label }
  </div>
);
