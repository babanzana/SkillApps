// NavigationHomeScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NavigationHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>NavigationHomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerText: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NavigationHomeScreen;
