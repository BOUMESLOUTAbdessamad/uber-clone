import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {selectDestination, selectOrigin, setTravelTime} from '../../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '@env';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom and adjust the map view to the Markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, bottom: 50, right: 50, left: 50},
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {

      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&key=${GOOGLE_MAPS_APIKEY}`)
      .then((res) => res.json() ) 
      .then((data) => {
        // console.log(data.rows[0].elements);
        dispatch(setTravelTime(data?.rows[0]?.elements[0]))
      });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} //Remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.012,
          longitudeDelta: 0.005,
        }}>
        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="Depart"
            description={origin.description}
            identifier="origin"
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}

        {origin && destination && (
          <MapViewDirections
            origin={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            destination={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            mode="DRIVING"
            strokeWidth={4}
            strokeColor="#111"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex:1,
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {...StyleSheet.absoluteFillObject},
});

export default Map;
