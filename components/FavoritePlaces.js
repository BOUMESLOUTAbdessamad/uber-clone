import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';

const data = [
  {
    id: '123',
    icon: 'business-outline',
    location: 'Work',
    description: 'PROTEC SARL, Albert 1er',
  },
  {
    id: '456',
    icon: 'home-outline',
    location: 'Home',
    description: '93 cité 261, Ennedjma, Oran',
  },
];

const FavoritePlaces = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item: {location, description, icon}}) => (
        <TouchableOpacity style={tw`flex-row items-center p-4`}>
          <Icon style={tw`mr-4 bg-gray-200 p-3 rounded-full`} name={icon} type="ionicon" color="black" />
          <View>
            <Text style={tw`font-bold text-gray-700`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default FavoritePlaces;

const styles = StyleSheet.create({});
