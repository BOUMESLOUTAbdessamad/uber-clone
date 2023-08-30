import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectTravelTime} from '../slices/navSlice';

const data = [
  {
    id: 'uber-x',
    title: 'UberX',
    description: 'Affordable everyday rides, enjoy!',
    miltiplier: 1,
    image:
      'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png',
  },
  {
    id: 'uber-xl',
    title: 'UberXL',
    description: 'Affordable rides for groups up to 6',
    miltiplier: 1.4,
    image:
      'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberXL.png',
  },
  {
    id: 'lux',
    title: 'Lux',
    description: 'Luxary cars with top-rated drivers',
    miltiplier: 1.6,
    image:
      'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png',
  },
];
const SURGE_CHARE_RATE = 55;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTime = useSelector(selectTravelTime);

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-3 flex-grow pt-3`}>
      <View style={tw`mb-6`}>
        <TouchableOpacity
          style={tw`absolute left-5 p-3`}
          onPress={() => {
            navigation.navigate('NavigateCard');
          }}>
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#123',
            fontSize: 14,
            // fontWeight: '500',
            textAlign: 'center',
          }}>
          Choose a ride
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({
          item: {id, title, description, miltiplier, image},
          item,
        }) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item);
            }}
            style={tw`flex-row justify-between px-2 items-center ${id === selected?.id && 'bg-gray-200'}`}>
            <View style={tw`flex-row justify-between px-2 items-center`}>
              <Image
                source={{uri: image}}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}
              />
              <View style={tw`-ml-3`}>
                <Text style={tw`text-black font-bold`}> {title}</Text>
                <Text style={tw`text-zinc-500`}>
                  {' '}
                  {travelTime?.duration?.text} Travel time
                </Text>
              </View>
            </View>

            <Text style={tw`text-black font-bold text-xl`}>
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'DZD',
              }).format(
                (travelTime?.duration?.value * SURGE_CHARE_RATE * miltiplier) /
                  100,
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Pressable
        style={tw`p-2 py-4 rounded-full ${
          !selected ? 'bg-gray-500' : 'bg-black'
        }`}
        // disabled={!selected ? true : false}
      >
        <Text style={tw`text-center text-white text-lg`}>
          Choose {selected?.title}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
