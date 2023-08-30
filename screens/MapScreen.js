import {View, Text, StatusBar, TouchableOpacity} from 'react-native';

import React from 'react';
import tw from 'twrnc';
import Map from '../components/Map/Map';
import {createStackNavigator} from '@react-navigation/stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {setOrigin, setDestination, setTravelTime} from '../slices/navSlice';
import {useDispatch} from 'react-redux';

export default function MapScreen() {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View>
        <TouchableOpacity
          onPress={() => {
            dispatch(
              setDestination(null),
              setOrigin(null),
              setTravelTime(null),
            );
            navigation.navigate('Home');
          }}
          style={tw`absolute bg-white shadow-md rounded-full top-16 left-4 z-50 p-3`}>
          <Icon type="ionicon" name="menu" size={24} />
        </TouchableOpacity>

        <View style={tw`h-1/2`}>
          <Map />
        </View>
        <View style={tw`h-1/2`}>
          <Stack.Navigator>
            <Stack.Screen
              name="NavigateCard"
              component={NavigateCard}
              options={{
                headerShown: false,
                gestureDirection: 'horizontal-inverted',
              }}
            />
            <Stack.Screen
              name="RideOptionsCard"
              component={RideOptionsCard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </View>
      </View>
    </>
  );
}
