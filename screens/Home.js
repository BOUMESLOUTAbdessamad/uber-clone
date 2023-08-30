import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Input} from '@rneui/themed';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';
import {useDispatch} from 'react-redux';
import NavOptions from '../components/NavOptions';
import {setOrigin, setDestination} from '../slices/navSlice';

import FavoritePlaces from '../components/FavoritePlaces';

export default function Home() {
  const dispatch = useDispatch();

  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        textInputProps={{
          InputComp: Input,
          leftIcon: {type: 'font-awesome', name: 'location-arrow'},
          errorStyle: {color: 'red'},
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            // backgroundColor:"#123",
            // elevation: 4,
            // shadowColor: '#333',
            color: '#222',
            fontSize: 14,
          },
          description: {color: '#222'},
        }}
        fetchDetails={true}
        debounce={400}
        nearbyPlacesAPI="GooglePlacesSearch"
        placeholder="Where are you?"
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            }),
          ) 
          dispatch(setDestination(null))
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={tw` bg-white h-full p-6`}>
      <Image
        style={{
          resizeMode: 'contain',
          width: 100,
          height: 100,
        }}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/800px-Uber_logo_2018.svg.png?20180914002846',
        }}
      />
      <GooglePlacesInput />
      <NavOptions />
      <FavoritePlaces />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textColorDark: {
    color: '#222',
  },
});
