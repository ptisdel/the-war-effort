import _ from 'lodash-es';
import React from 'react';
import { useDebugInfo } from './logic';
import * as s from './styles';

export const DebugInfo = () => {
  const [
    { isOpen, locations, players },
    { onToggle },
  ] = useDebugInfo();

  return (
    <s.Information>
      <s.InformationHeader onClick = { onToggle }>Stats</s.InformationHeader>
      <s.InformationContent isOpen = { isOpen }>
        <s.PlayerList>
          { _.map(players, (p, i) => <li key = {i}>{ p.rolename } : { p.budget }</li>) }
        </s.PlayerList>
        <s.Locations>
          { _.map(locations, (l, i) => renderLocation(l, i)) }
        </s.Locations>
      </s.InformationContent>
    </s.Information>
  );
};

function renderLocation(location, index) {
  return (
    <React.Fragment key = { index }>
      <s.LocationName>{ location.name }</s.LocationName>
      <div>
        <s.ResourcesTitle>Resources</s.ResourcesTitle>
        { _.map(location.resources, (r, i) => (
          <div key = { i }>{ r }</div>
        )) }
      </div>
      <div>
        <s.UnitsTitle>Units</s.UnitsTitle>
        { _.map(location.units, (u, i) => (
          <div key = { i }>{ u }</div>))}
      </div>
      <div>
        <s.FeaturesTitle>Features</s.FeaturesTitle>
        { _.map(location.features, (f, i) => (
          <div key = { i }>{ f }</div>))}
      </div>
    </React.Fragment>
  );
}
