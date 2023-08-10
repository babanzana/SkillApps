import React from "react";
import { View, Text, Button, SafeAreaView, StatusBar } from "react-native";
import { HeaderBar } from "../../../../components/header-bar.component";
import { ThemedSafeAreaView } from "../../../../components/ThemedSafeAreaView.component";

const DetailProfileScreen = ({ navigation }: any) => {
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <ThemedSafeAreaView style={{ flex: 1}}>
      <View style={{ flex: 1 }}>
        <HeaderBar title="Saved addresses" handleGoBack={handleGoBack} />
        <Text>Detail Profile Screen</Text>
      </View>
    </ThemedSafeAreaView>
  );
};

export default DetailProfileScreen;
