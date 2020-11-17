import _ from 'lodash-es';
import { useState, useEffect } from 'react';
import common from '@the-war-effort/common';
import { useStore } from '../../hooks';

const { GameState, Location } = common.models;

export const useMapView = () => {
  const { gameState } = useStore();

  const [googleMapsInfo, setGoogleMapsInfo] = useState(null);

  const locations = GameState.getLocations(gameState);
  const locationsFormatted = _.map(locations, l => {
    const { lat, lng } = Location.getPosition(l);
    return {
      abbreviation: _.first(Location.getCallsign(l)),
      label: Location.getName(l),
      lat,
      lng,
    };
  });

  const createAirRoute = ({ origin, destination }) => {
    if (!googleMapsInfo) return;

    const { map, maps } = googleMapsInfo;
    const flightPath = new maps.Polyline({
      path: [origin, destination],
      geodesic: true,
      ...getDottedLineOptions(),
    });
    flightPath.setMap(map);
  };

  const createGroundRoute = ({ origin, destination }) => {
    if (!googleMapsInfo) return;

    const { directionsService, map, maps } = googleMapsInfo;
    const directionsRenderer = new maps.DirectionsRenderer(getLineOptions());
    directionsRenderer.setMap(map);

    const request = {
      origin: new maps.LatLng(origin),
      destination: new maps.LatLng(destination),
      travelMode: 'DRIVING',
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        console.log(result);
        directionsRenderer.setDirections(result);
      }
    });
  };

  useEffect(() => {
    if (!googleMapsInfo) return;

    createGroundRoute({
      origin: { lat: 34.5, lng: 69.122 },
      destination: { lat: 32, lng: 66 },
    });
    createAirRoute({
      origin: { lat: 34.533473, lng: 69.1484533 },
      destination: { lat: 31.6349554, lng: 65.7151501 },
    });
  }, [googleMapsInfo]);

  const onGoogleMapsLoaded = ({ map, maps }) => {
    const directionsService = new maps.DirectionsService();
    setGoogleMapsInfo({ directionsService, map, maps });
  };

  const { lat, lng, z } = GameState.getMapPosition(gameState);

  return [
    {
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
      cameraPosition: { lat, lng, z },
      locations: locationsFormatted,
    },
    {
      onGoogleMapsLoaded,
    },
  ];
};

function getLineOptions() {
  return {
    polylineOptions: {
      strokeColor: 'red',
      strokeWeight: 1,
    },
    suppressMarkers: true,
  };
}

function getDottedLineOptions() {
  return {
    icons: [
      {
        icon: {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          strokeWeight: 2,
          scale: 4,
        },
        offset: '0',
        repeat: '20px',
      },
    ],
    strokeColor: 'blue',
    strokeOpacity: 0,
    strokeWeight: 1,
  };
}
