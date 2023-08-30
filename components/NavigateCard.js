import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Input} from '@rneui/themed';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';
import {useDispatch} from 'react-redux';
import {setDestination} from '../slices/navSlice';
import FavoritePlaces from '../components/FavoritePlaces';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Icon} from 'react-native-elements';

const NavigateCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-2`}>
      <Text
        style={{
          color: '#123',
          fontSize: 24,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        Hello, Abdessamed
      </Text>
      <View>
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          enablePoweredByContainer={false}
          textInputProps={{
            InputComp: Input,
            leftIcon: {type: 'font-awesome', name: 'map-marker'},
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
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              }),
              navigation.navigate('RideOptionsCard')
            );
          }}
        />
        <FavoritePlaces />
      </View>
      <View
        style={tw`flex flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity
        onPress={() => {navigation.navigate('RideOptionsCard')}}
          style={tw`flex flex-row justify-center bg-black w-32 px-4 py-3 rounded-full items-center`}>
          <Icon type="ionicon" name="car" color="white" size={16} />
          <Text style={tw`text-white text-center`}> Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-center bg-gray-200 w-32 px-4 py-3 rounded-full items-center`}>
          <Icon type="ionicon" name="pizza" color="black" size={16} />
          <Text style={tw`text-black text-center`}> Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({});
