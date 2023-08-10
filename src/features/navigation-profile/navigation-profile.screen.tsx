// NavigationProfileScreen.tsx

import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

const NavigationProfileScreen = ({ navigation }:any) => {
  const handleNavigateDetailProfile = () => {
    navigation.navigate("DetailProfile");
  };
  return (
    <View>
      <Text>NavigationProfileScreen</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={handleNavigateDetailProfile}
      >
        Press me
      </Button>
    </View>
  );
};

export default NavigationProfileScreen;
