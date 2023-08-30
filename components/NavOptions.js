import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../slices/navSlice';

const data = [
  {
    id: 'ride',
    title: 'Get a ride',
    image:
      'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png',
    screen: 'MapScreen',
  },
  {
    id: 'food',
    title: 'Order food',
    image:
      'https://img.freepik.com/free-vector/sticker-template-with-pizza-isolated_1308-62307.jpg?w=1060&t=st=1692023308~exp=1692023908~hmac=f3db400a436afbd15d56244d1aee875877888e5aa4761a62bf408334f37d275f',
    screen: 'EatsScreen',
  },
];

export default function NavOptions() {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({item}) => (
          <TouchableOpacity
            disabled={!origin}
            onPress={() => {
              navigation.navigate(item.screen);
            }}
            style={[
              tw`p-4 pl-6 pb-6 pt-4 bg-white shadow-md rounded m-2 w-32 ${
                !origin ? 'opacity-20' : null
              }`,
            ]}>
            <View>
              <Image
                style={{width: 84, height: 84, resizeMode: 'contain'}}
                source={{uri: item.image}}
              />
              <Text style={tw`font-semibold text-zinc-900`}>{item.title}</Text>
              <Icon
                style={tw`self-start mt-2`}
                type="ionicon"
                name="arrow-forward-circle"
                color="#222"
                size={35}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
