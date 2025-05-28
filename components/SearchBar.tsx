import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

const SearchBar = ({ onPress, placeholder }: { onPress: () => void; placeholder: string }) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />

      <TextInput
        onPress={onPress}
        onChangeText={() => {}}
        value=""
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="flex-1 text-white ml-2"
      />
    </View>
  );
};

export default SearchBar;
