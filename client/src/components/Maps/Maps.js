import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader
} from "@react-google-maps/api";

import React, { useState } from "react";
import "./Maps.scss";

const containerStyle = {
  width: "100%",
  height: "40vh"
};

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };
const Maps = ({ markers,direction=false }) => {
  const defaultOption = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    keyboardShortcuts: false,
    fullscreenControl: false
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBZUyVBp73R0XAkMqsK5UkAWFL51Ek4Z4A"
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    const bounds = new window.google.maps.LatLngBounds(markers[0]);
    map.fitBounds(bounds);
    directionSet();
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const directionSet = () => {
    if (markers.length >= 2) {
      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin: markers[0],
          destination: markers[markers.length - 1],
          waypoints: markers.slice(1, markers.length - 1).map(marker => {
            return {
              location: new window.google.maps.LatLng(marker.lat, marker.lng)
            };
          }),
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
          }
        }
      );
    }
  };
  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={'travel__map'}
      mapContainerStyle={containerStyle}
      // center={center}
      zoom={2}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={defaultOption}
    >
      {markers&&!direction &&
        markers.map(marker => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelectedMarker(marker);
            }}
          />
        ))}
      {selectedMarker ? (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <p>{selectedMarker.name}</p>
        </InfoWindow>
      ) : null}
      {directions&&direction && (
        <DirectionsRenderer
          directions={directions}
          options={{
            draggable: false,
            infoWindow: new window.google.maps.InfoWindow({
              content: "33388383"
            }),
            suppressInfoWindows: false,
            suppressMarkers: false,
            markerOptions: { clickable: true, zIndex: 3 }
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Maps;
