import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
  },
});

export interface TabsProps {
  active?: string;
  onPressUpcommig?: () => void;
  onPressPopular?: () => void;
  onPressTop?: () => void;
}

const Tabs = ({
  onPressUpcommig,
  onPressPopular,
  onPressTop,
  active,
}: TabsProps) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={onPressUpcommig}
        style={{
          ...styles.bubble,
          backgroundColor:
            active === 'upcoming' ? '#53a82c' : 'rgb(200,200,200)',
        }}>
        <Text
          style={{
            ...styles.text,
            color: active === 'upcoming' ? 'white' : 'black',
          }}>
          Upcoming
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressPopular}
        style={{
          ...styles.bubble,
          backgroundColor:
            active === 'popular' ? '#53a82c' : 'rgb(200,200,200)',
        }}>
        <Text
          style={{
            ...styles.text,
            color: active === 'popular' ? 'white' : 'black',
          }}>
          Popular
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressTop}
        style={{
          ...styles.bubble,
          backgroundColor:
            active === 'topRated' ? '#53a82c' : 'rgb(200,200,200)',
        }}>
        <Text
          style={{
            ...styles.text,
            color: active === 'topRated' ? 'white' : 'black',
          }}>
          Top Rated
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tabs;
