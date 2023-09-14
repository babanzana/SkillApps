import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailProfileScreen from "../features/profile/detail-profile/screen/detail-profile.screen";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation";
import LoginScreen from "../features/authentication/login/screen/login.screen";
import RegisterScreen from "../features/authentication/register/register.screen";
import RooteStackNavigator from "./root-navigation";

const Stack = createStackNavigator();

const AuthenticationNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RootNavigation" component={RooteStackNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {/* <Stack.Screen name="RootNavigation" component={RooteStackNavigator} /> */}
        {/* /Disini Menggunakan Screen Register atau Login, udh itu baru di arahkan masuk ke root-navigation */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticationNavigation;
