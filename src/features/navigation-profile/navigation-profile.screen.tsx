// NavigationProfileScreen.tsx

import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

const NavigationProfileScreen = ({ navigation }: any) => {
  const handleNavigateDetailProfile = () => {
    navigation.navigate("DetailProfile");
  };

  const handleNavigateTesNotifications = () => {
    navigation.navigate("TesNotifications");
  };
  return (
    <View>
      <Text>NavigationProfileScreen</Text>
      <Button
        // icon="camera"
        mode="contained"
        onPress={handleNavigateDetailProfile}
      >
        Tes Google Maps
      </Button>
      <Button
        // icon="camera"
        mode="contained"
        onPress={handleNavigateTesNotifications}
        style={{ top: 10 }}
      >
        Tes Notifications
      </Button>
    </View>
  );
};

export default NavigationProfileScreen;
