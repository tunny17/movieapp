import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBlock: 10
        }}
      >
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'center',
            gap: 16,
            marginVertical: 16
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          className="mt-2 pb-32"
          scrollEnabled={false}
          renderItem={({ item }) => <MovieCard {...item} />}
          ListHeaderComponent={
            <>
              <View className="w-full flex-row justify-center mt-20 items-center">
                <Image source={icons.logo} className="w-12 h-10" />
              </View>

              <View className="my-5">
                <SearchBar
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChangeText={(text: string) => setSearchQuery(text)}
                />
              </View>

              {moviesLoading && (
                <View className="flex-1 items-center justify-center">
                  <ActivityIndicator size="large" color="#0000ff" className="my-3" />
                </View>
              )}

              {moviesError && <Text className="text-red-500 px-5 my-5">Error: {moviesError}</Text>}

              {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for {''}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            !moviesLoading && !moviesError ? (
              <View className="mt-10 px-5">
                <Text className="text-gray-500 text-center">
                  {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                </Text>
              </View>
            ) : null
          }
        />
      </ScrollView>
    </View>
  );
};

export default Search;
