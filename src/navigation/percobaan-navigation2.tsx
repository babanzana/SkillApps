// DetailProfileNavigator.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailProfileScreen from "../features/profile/detail-profile/screen/detail-profile.screen";
import NavigationProfileScreen from "../features/navigation-profile/navigation-profile.screen";
import TesNotificationsScreen from "../features/profile/tes-notifications/screen/tes-notifications.screen";
// ...import other screens

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={NavigationProfileScreen} />
      <Stack.Screen name="DetailProfile" component={DetailProfileScreen} />
      <Stack.Screen name="TesNotifications" component={TesNotificationsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
