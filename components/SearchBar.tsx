import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText
}: {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />

      <TextInput
        onPress={onPress}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="flex-1 text-white ml-2"
      />
    </View>
  );
};

export default SearchBar;
