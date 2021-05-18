import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 15,
    shadowOpacity: 0.1,
  },
  date: {
    marginTop: 10,
    paddingLeft: 5,
  },
  description: {
    paddingLeft: 5,
    alignItems: 'flex-start',
  },
  genres: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: 'rgb(200,200,200)',
  },
  genresSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.5,
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 18,
    width: width * 0.5,
  },
  voteAvg: {
    fontSize: 20,
    alignSelf: 'flex-end',
    color: '#53a82c',
    fontWeight: 'bold',
    paddingRight: 20,
  },
});

export interface MovieCardProps {
  image?: string;
  title?: string;
  releaseDate?: Date;
  genres?: any[];
  voteAvg?: number;
  onPress?: () => void;

  genre_ids?: number[];
}

var movieGeners: any[] = [];

const MovieCard = ({
  image,
  title,
  releaseDate,
  voteAvg,
  genre_ids,
  genres,
  onPress,
}: //   genres,
MovieCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        style={{width: '30%', height: height * 0.2, borderRadius: 10}}
        source={{
          uri: image,
        }}
      />
      <View style={styles.description}>
        <Text style={styles.title}> {title}</Text>
        <Text style={styles.date}>
          {moment(releaseDate).format('MMMM DD,YYYY')}
        </Text>
        <View style={styles.genresSection}>
          {genres?.map((genre: {id: number; name: string}) => {
            const genre_id = genre_ids?.find((id) => {
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
      </View>
      <Text style={styles.voteAvg}>{voteAvg * 10}%</Text>
    </TouchableOpacity>
  );
};

export default MovieCard;
