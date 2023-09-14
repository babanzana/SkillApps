import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailProfileScreen from "../features/profile/detail-profile/screen/detail-profile.screen";
import NavigationProfileScreen from "../features/navigation-profile/navigation-profile.screen";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation";
import TesNotificationsScreen from "../features/profile/tes-notifications/screen/tes-notifications.screen";
import * as Notifications from "expo-notifications";

const Stack = createStackNavigator();

const RooteStackNavigator = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const { granted } = await Notifications.requestPermissionsAsync();
        if (granted) {
          console.log("Izin notifikasi diberikan!");
        } else {
          console.log("Izin notifikasi ditolak.");
        }
      } catch (error) {
        console.log("Error ni Gus");
      }
    };
    requestNotificationPermission();
  }, []);
  return (
    // <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Navigation" component={Navigation} />
      <Stack.Screen name="DetailProfile" component={DetailProfileScreen} />
      <Stack.Screen
        name="TesNotifications"
        component={TesNotificationsScreen}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default RooteStackNavigator;
