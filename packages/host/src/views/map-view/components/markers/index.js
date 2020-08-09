import React from 'react';
import * as s from './styles';

export const LocationMarker = ({ abbreviation, label }) => (
  <s.Marker>
    <s.Icon>{ abbreviation }</s.Icon>
    <s.Label>{ label }</s.Label>
  </s.Marker>
);

export const UnitGroupMarker = ({ abbreviation, label }) => (
  <div>
    { label }
  </div>
);
