import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationHomeScreen from "../features/navigation-home/navigation-home.screen";
import NavigationMapsScreen from "../features/navigation-maps/navigation-maps.screen";
import NavigationProfileScreen from "../features/navigation-profile/navigation-profile.screen";
import { FontAwesome } from "@expo/vector-icons";
import DetailProfileScreen from "../features/profile/detail-profile/screen/detail-profile.screen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    // <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={NavigationHomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="MapsStackNavigator"
          component={NavigationMapsScreen}
          options={{
            // headerShown: false,
            headerTitle: "Maps",
            tabBarLabel: "Maps",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={NavigationProfileScreen}
          options={{
            headerTitle: "Profile",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default Navigation;
