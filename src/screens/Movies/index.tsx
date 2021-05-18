import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MovieCard from '../../components/MovieCard';
import Tabs from '../../components/Tabs';
import {MOVIES_DETAILS} from '../../navigation/screenNames';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -15,
  },
  header: {
    fontSize: 25,
    fontWeight: '800',
  },
  movies: {
    marginTop: 10,
  },
  tabs: {
    marginTop: 15,
  },
});

export interface MoviesProps {
  navigation?: any;
}

var genres: never[] = [];
var genresUrl =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=16ab27782d45ddc5bab5ccc7855a6792&language=en-US';

var apiKey = '16ab27782d45ddc5bab5ccc7855a6792';
var token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmFiMjc3ODJkNDVkZGM1YmFiNWNjYzc4NTVhNjc5MiIsInN1YiI6IjYwOWE3MDNmNDFlZWUxMDAzZGRhMWVkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hke_sLN51MJGlUQ45I9mrKODyLW0TwAtB2ZC_XeqOEI';

var GENRES: any[] = [];
const Movies = ({navigation}: MoviesProps) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [movies, setMovies] = useState([]);

  //Upcoming Movies Call
  const getUpcomingMovies = async (tab: React.SetStateAction<string>) => {
    const config = {
      method: 'get',
      url: `https://api.themoviedb.org/4/list/1?api_key=${apiKey}`,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const genres = await axios.get(genresUrl);
    GENRES = genres.data.genres;
    setActiveTab(tab);
    const response = await axios(config);

    response.data.results.map((movie: any) => {
      genres.data.genres.map((item: any) => {});
    });
    setMovies(response?.data?.results);
  };

  //Popular Movies Call
  const getPopularMovies = async (tab: React.SetStateAction<string>) => {
    const config = {
      method: 'get',
      url: `https://api.themoviedb.org/4/list/2?api_key=${apiKey}`,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setActiveTab(tab);
    const response = await axios(config);
    setMovies(response?.data?.results);
  };

  //Top Rated Movies Call
  const getTopRatedMovies = async (tab: React.SetStateAction<string>) => {
    const config = {
      method: 'get',
      url: `https://api.themoviedb.org/4/list/3?api_key=${apiKey}`,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setActiveTab(tab);
    const response = await axios(config);

    setMovies(response?.data?.results);
  };

  const getMovieCredits = async (movie: {
    item: {
      title: string | undefined;
      release_date: Date;
      poster_path: string;
      vote_average: number;
      id: number;
      overview: string;
      genre_ids: [];
    };
  }) => {
    const config = {
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${movie.item.id}/credits?api_key=${apiKey}&language=en-US}`,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config);
    navigation.navigate(MOVIES_DETAILS, {
      title: movie?.item?.title,
      voteAvg: movie?.item?.vote_average,
      overView: movie?.item?.overview,
      image: `https://image.tmdb.org/t/p/w500/${movie?.item?.poster_path}`,
      genres: GENRES,
      genre_ids: movie?.item?.genre_ids,
      credits: response?.data?.cast,
    });
  };

  useEffect(() => {
    getUpcomingMovies('upcoming');
  }, []);

  const renderElements = (movie: {
    item: {
      title: string | undefined;
      release_date: Date;
      poster_path: string;
      vote_average: number;
      id: number;
      overview: string;
      genre_ids: [];
    };
  }) => {
    return (
      <MovieCard
        onPress={() => getMovieCredits(movie)}
        genres={GENRES}
        genre_ids={movie?.item?.genre_ids}
        title={movie?.item?.title}
        releaseDate={movie?.item?.release_date}
        image={`https://image.tmdb.org/t/p/w500/${movie?.item?.poster_path}`}
        voteAvg={movie?.item?.vote_average}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />

      {movies.length === 0 ? (
        <ActivityIndicator color={'#53a82c'} style={{alignSelf: 'center'}} />
      ) : (
        <>
          <Text style={styles.header}>Movies</Text>
          <View style={styles.tabs}>
            <Tabs
              active={activeTab}
              onPressUpcommig={() => getUpcomingMovies('upcoming')}
              onPressPopular={() => getPopularMovies('popular')}
              onPressTop={() => getTopRatedMovies('topRated')}
            />
          </View>
          <FlatList
            contentContainerStyle={styles.movies}
            data={movies}
            renderItem={renderElements}
            keyExtractor={(movie, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

export default Movies;
