import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { MOVIES_STACK } from "./screenNames";
import MoviesStack from "./StackNavigators/MoviesStack";

const { Navigator, Screen } = createStackNavigator();

const RootNavigator = () => {
  return (
    <Navigator initialRouteName={MOVIES_STACK}>
      <Screen
        name={MOVIES_STACK}
        component={MoviesStack}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default RootNavigator;
