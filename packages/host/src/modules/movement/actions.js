import _ from 'lodash-es';
import common from '@the-war-effort/common';

const { log } = common.helpers;
const { GameState, UnitGroup } = common.models;

export const move = (store, { gameState, unitGroup }) => {
  const id = UnitGroup.getId(unitGroup);
  const route = UnitGroup.getRoute(unitGroup);
  const {
    currentGeometryIndex,
    destination,
    duration,
    geometry,
    origin,
    speed,
  } = route;

  // const destinationString = JSON.stringify(destination);
  // const originString = JSON.stringify(origin);

  // log('movement', `UnitGroup ${id} wants to move along its route from ${originString} to ${destinationString}.`);

  // check for fuel
  // log('movement', 'The group has enough fuel to move.');

  const nextGeometryIndex = _.min([currentGeometryIndex + speed, geometry.length - 1]);
  console.log(nextGeometryIndex);

  const nextPosition = {
    lat: _.get(geometry, `${nextGeometryIndex}[0]`),
    lng: _.get(geometry, `${nextGeometryIndex}[1]`),
  };
  const hasArrived = (geometry.length - 1) <= currentGeometryIndex;

  log('movement', `UnitGroup ${id} moves from ${JSON.stringify(geometry[currentGeometryIndex])} to ${JSON.stringify(geometry[nextGeometryIndex])}.`);

  const newRoute = hasArrived
    ? null
    : {
      ...route,
      currentGeometryIndex: nextGeometryIndex,
    };

  const newCurrentOrder = hasArrived ? null : 'moving';

  const newUnitGroup = {
    ...unitGroup,
    currentOrder: newCurrentOrder,
    position: nextPosition,
    currentGeometryIndex: nextGeometryIndex,
    route: newRoute,
  };

  const newUnitGroups = [
    ..._.reject(GameState.getUnitGroups(gameState), ug => UnitGroup.getId(ug) === id),
    newUnitGroup,
  ];

  const newGameState = {
    ...gameState,
    unitGroups: newUnitGroups,
  };

  store.setState(newGameState);
};
