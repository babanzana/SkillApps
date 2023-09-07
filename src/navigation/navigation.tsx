import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationHomeScreen from "../features/navigation-home/navigation-home.screen";
import NavigationMapsScreen from "../features/navigation-maps/navigation-maps.screen";
import NavigationProfileScreen from "../features/navigation-profile/navigation-profile.screen";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@ui-kitten/components";
import {
  INDIGO_1,
  INDIGO_2,
  INDIGO_3,
  INDIGO_4,
  INDIGO_5,
  INDIGO_6,
} from "../components/color-databsae.component";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: INDIGO_1 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={NavigationHomeScreen}
        options={{
          headerShown: false,
          headerTitle: "Home",
          tabBarLabel: "Home",
          tabBarActiveBackgroundColor: INDIGO_6,
          tabBarInactiveTintColor: INDIGO_5,
          tabBarActiveTintColor: INDIGO_4,
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={focused ? INDIGO_2 : INDIGO_3}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MapsStackNavigator"
        component={NavigationMapsScreen}
        options={{
          headerShown: false,
          headerTitle: "Maps",
          tabBarLabel: "Maps",
          tabBarActiveBackgroundColor: INDIGO_6,
          tabBarInactiveTintColor: INDIGO_5,
          tabBarActiveTintColor: INDIGO_4,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              color={focused ? INDIGO_2 : INDIGO_3}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={NavigationProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: INDIGO_1,
          },
          headerTitle: "Profile",
          tabBarLabel: "Profile",
          tabBarActiveBackgroundColor: INDIGO_6,
          tabBarInactiveTintColor: INDIGO_5,
          tabBarActiveTintColor: INDIGO_4,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              color={focused ? INDIGO_2 : INDIGO_3}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
