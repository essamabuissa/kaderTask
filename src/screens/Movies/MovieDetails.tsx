import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  actorContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  actorImage: {
    width: 75,
    height: 75,
    borderRadius: 60,
    marginHorizontal: 0,
  },
  actorName: {
    marginTop: 5,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 50,
  },
  genres: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: 'rgb(200,200,200)',
  },
  genresSection: {
    flexDirection: 'row',
    width: width * 0.9,
    marginTop: 10,

    flexWrap: 'wrap',
  },
  image: {
    width: width * 0.35,
    height: height * 0.25,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 25,
  },
  overView: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  overViewDescription: {
    marginTop: 10,
    color: 'rgb(100,100,100)',
    fontWeight: '600',
  },
  voteAvg: {
    fontSize: 25,
    color: '#53a82c',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export interface MovieDetailsProps {
  route: {
    params: {
      title: string;
      voteAvg: number;
      overView: string;
      genres?: any[];
      image?: string;
      genre_ids?: number[];
      credits?: [];
    };
  };
  navigation: any;
}

const MovieDetails = ({route, navigation}: MovieDetailsProps) => {
  const goBack = () => {
    navigation.goBack();
  };

  const _renderItem = (actor: {item: {name: string; profile_path: string}}) => {
    return (
      <View style={styles.actorContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${actor?.item?.profile_path}`,
          }}
          style={styles.actorImage}
        />
        <Text style={styles.actorName}>{actor.item.name}</Text>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView />
      <TouchableOpacity>
        <EvilIcons
          onPress={goBack}
          name="chevron-left"
          size={50}
          color="black"
        />
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.image}
          source={{
            uri: route.params.image,
          }}
        />
        <Text style={styles.title}>{route.params.title}</Text>
        <Text style={styles.voteAvg}>{route.params.voteAvg * 10}%</Text>
      </View>
      <View>
        <Text style={styles.overView}>Overview</Text>
        <Text style={styles.overViewDescription}>{route.params.overView}</Text>
      </View>
      <Text style={styles.overView}>Genres</Text>
      <View style={styles.genresSection}>
        {route.params.genres?.map((genre: {id: number; name: string}) => {
          const genre_id = route.params.genre_ids?.find((id) => {
            return id === genre.id;
          });
          if (genre_id === genre.id)
            return (
              <View style={styles.genres}>
                <Text style={{color: 'rgb(30,30,30)'}}>{genre.name}</Text>
              </View>
            );
          else return <View />;
        })}
      </View>
      <Text style={styles.overView}>Credits</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={route.params.credits}
        renderItem={_renderItem}
        keyExtractor={(actor) => actor.name}
      />
    </ScrollView>
  );
};

export default MovieDetails;
