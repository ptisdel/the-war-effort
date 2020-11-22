import mapboxgl from 'mapbox-gl';
import React, { useEffect } from 'react';
import { useMapView } from './logic';
import { DebugInfo } from './components/debug-info';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

export const MapView = () => {
  const [{ cameraPosition, locations }] = useMapView();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [cameraPosition.lng, cameraPosition.lat],
      zoom: cameraPosition.z,
    });

    locations.forEach(l => {
      const {
        abbreviation, label, lat, lng,
      } = l;
      console.log(lat, lng);
      const marker = createLocationMarker({
        abbreviation,
        color: 'black',
        label,
      });

      new mapboxgl.Marker(marker)
        .setLngLat([lat, lng])
        .addTo(map);
    });
  }, []);

  return (
    <div>
      <div
        id = 'mapContainer'
        style = {{
          bottom: '0',
          left: '0',
          position: 'absolute',
          right: '0',
          top: '0',
        }}
      />
      <DebugInfo/>
    </div>
  );
};

function createLocationMarker({
  abbreviation = 'X', color = '#000', label = null,
}) {
  return (
      <svg xmlns='http://www.w3.org/2000/svg' width='300' height='20' viewBox='0 0 19 19'>
        <g fill='#fff' stroke='#707070' strokeWidth='1'>
          <rect width='20' height='20' stroke='none'/>
          <rect x='1' y='1' width='17' height='17' fill='none'/>
        </g>
        <text x='50%' y ='11' dominantBaseline='middle' fontSize='13' fontWeight='bold' fontFamily='Bahnschrift' textAnchor='middle' fill={color}>{abbreviation}</text>
        <text x='22' y ='11' dominantBaseline='middle' fontSize='8' fontWeight='bold' fontFamily='Bahnschrift' textAnchor='left' fill='black'>{label}</text>
      </svg>
  );
}

function createUnitGroupMarker({
  abbreviation = 'X', color = '#000', label = null,
}) {
  return `data:image/svg+xml;utf-8, ${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="20" viewBox="0 0 19 19">
        <g fill="#fff" stroke="#707070" stroke-width="1">
          <rect width="20" height="20" stroke="none"/>
          <rect x="1" y="1" width="17" height="17" fill="none"/>
        </g>
        <text x="50%" y ="11" dominant-baseline="middle" font-size="13" font-weight="bold" font-family="Bahnschrift" text-anchor="middle" fill="${color}">${abbreviation}</text>
        <text x="22" y ="11" dominant-baseline="middle" font-size="8" font-weight="bold" font-family="Bahnschrift" text-anchor="left" fill="black">${label}</text>
      </svg>
    `)}`;
}
