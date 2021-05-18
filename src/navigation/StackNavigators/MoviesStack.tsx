import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Movies from "../../screens/Movies";
import { MOVIES, MOVIES_DETAILS } from "../screenNames";
import MovieDetails from "../../screens/Movies/MovieDetails";

const { Navigator, Screen } = createStackNavigator();

const MoviesStack = () => {
  return (
    <Navigator>
      <Screen
        name={MOVIES}
        component={Movies}
        options={{ headerShown: false }}
      />
      <Screen
        name={MOVIES_DETAILS}
        component={MovieDetails}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default MoviesStack;
