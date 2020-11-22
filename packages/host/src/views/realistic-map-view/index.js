import _ from 'lodash-es';
import GoogleMapReact from 'google-map-react';
import React from 'react';
import { useMapView } from './logic';
import { mapStyles } from './map-styles';
import { DebugInfo } from './components/debug-info';
import { LocationMarker } from './components/markers';

export const RealisticMapView = () => {
  const [
    { apiKey, cameraPosition, locations },
    { onGoogleMapsLoaded },
  ] = useMapView();

  return (
    <div style={{
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      position: 'fixed',
    }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: cameraPosition.lat, lng: cameraPosition.lng }}
        defaultZoom={ cameraPosition.z }
        onGoogleApiLoaded={ onGoogleMapsLoaded }
        options = {{
          disableDefaultUI: 'true',
          heading: 30,
          // mapTypeId: 'terrain',
          styles: mapStyles,
          tilt: 45,
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {
          _.map(locations, (l, i) => <LocationMarker
            abbreviation = { l.abbreviation }
            label = { l.label }
            key = { i }
            lat = { l.lat }
            lng = { l.lng }
          />)
        }
      </GoogleMapReact>
      <DebugInfo/>
    </div>
  );
};
