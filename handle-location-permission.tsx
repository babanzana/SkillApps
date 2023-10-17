import React, { useCallback, useRef, useMemo } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import AndroidOpenSettings from "react-native-android-open-settings";

export const HandleLocationPermissionComponent = ({
  locationPermissionBottomSheetRef,
}: any) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={"none"}
      />
    ),
    []
  );

  const handleLocationPermission = () => {
    // AndroidOpenSettings.locationSourceSettings();
    Linking.openSettings();
    locationPermissionBottomSheetRef.current?.close();
  };

  const snapPoints = useMemo(() => ["50%"], []);

  return (
    <BottomSheet
      ref={locationPermissionBottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      bottomInset={46}
      detached={true}
      enablePanDownToClose={false}
      enableContentPanningGesture={false}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: "white",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 0 },
      }}
      style={styles.sheetContainer}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.textContainer}>
          SolaGas location permissions are disabled on this device
        </Text>
        {/* <LottieView
          source={require("../../../assets/maps-loading.json")}
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          style={{
            width: "45%",
            height: "45%",
          }}
        /> */}
        <Text style={{ textAlign: "center", color: "red", fontSize: 14 }}>
          Enable location permission on your device to receive orders and ensure
          that the location status on your smartphone is active
        </Text>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            onPress={handleLocationPermission}
            mode="contained"
            style={{
              backgroundColor: "red",
              borderRadius: 100,
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            CONFIRM
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    width: "80%",
    borderRadius: 100,
  },
  textContainer: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  backdropContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});
