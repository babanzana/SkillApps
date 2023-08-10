// DetailProfileNavigator.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailProfileScreen from "../features/profile/detail-profile/screen/detail-profile.screen";
import NavigationProfileScreen from "../features/navigation-profile/navigation-profile.screen";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation";
// ...import other screens

const Stack = createStackNavigator();

const RooteStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Navigation" component={Navigation} />
        <Stack.Screen name="DetailProfile" component={DetailProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RooteStackNavigator;
