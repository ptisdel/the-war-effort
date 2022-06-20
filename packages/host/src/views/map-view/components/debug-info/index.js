import _ from 'lodash-es';
import React from 'react';
import { useDebugInfo } from './logic';
import * as s from './styles';

export const DebugInfo = () => {
  const [data, handlers] = useDebugInfo();

  return (
    <s.Information>
      { data.roomCode && <div data-test-id='room-code'>{data.roomCode}</div> }
      <s.InformationHeader onClick = { handlers.onToggle }>Stats</s.InformationHeader>
      <s.InformationContent isOpen = { data.isOpen }>
        <span>{ `Operation: ${data.roomCode}` }</span>
        <s.PlayerList>
          { /* TODO: use roles, not players */ }
          { _.map(data.players, (p, i) => <li key = {i}>{ p.rolename } : { p.budget }</li>) }
        </s.PlayerList>
        <s.Locations>
          { _.map(data.locations, (l, i) => renderLocation(l, i)) }
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
