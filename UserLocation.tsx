import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { HandleLocationPermissionComponent } from "./handle-location-permission";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const LOCATION_TRACKING = "location-tracking";

var l1;
var l2;

function UserLocation() {
  const locationPermissionBottomSheetRef = useRef<BottomSheet>(null);
  const [locationStarted, setLocationStarted] = React.useState(false);

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 0,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    setLocationStarted(hasStarted);
    console.log("tracking started?", hasStarted);
  };

  // const getPermissionsLocation = async () => {
  //   let { status: status1 } = await Location.getForegroundPermissionsAsync();
  //   let { status: status2 } =
  //     await Location.requestBackgroundPermissionsAsync();
  //   console.log(
  //     "🚀 ~ file: UserLocation.tsx:32 ~ getPermissionsLocation ~ status1:",
  //     status1
  //   );
  //   console.log(
  //     "🚀 ~ file: UserLocation.tsx:34 ~ getPermissionsLocation ~ status2:",
  //     status2
  //   );

  //   if (status1 === "granted") {
  //     console.log("Get Permission Granted, Mendapatkan Lokasi");
  //   } else {
  //     console.log(
  //       "Get Permission Denied, Lanjutkan dengan requestForegroungPermissionAsync"
  //     );
  //     locationPermissionBottomSheetRef.current?.expand();
  //     requestForegroundPermissions();
  //   }
  // };

  // const requestForegroundPermissions = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   console.log(
  //     "🚀 ~ file: UserLocation.tsx:48 ~ requestForegroundPermissions ~ status:",
  //     status
  //   );

  //   if (status === "granted") {
  //     console.log("Request Permission Granted, Mendapatkan Lokasi");
  //   } else {
  //     console.log(
  //       "Request Permission Denied, Ulangi requestForegroungPermissionAsync"
  //     );
  //     const timeoutId = setTimeout(() => {
  //       locationPermissionBottomSheetRef.current?.expand();
  //       console.log("Timeout berakhir");
  //     }, 2000);

  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }
  // };

  // useEffect(() => {
  //   getPermissionsLocation();
  // }, []);

  const showAlert = () => {
    Alert.alert(
      "Konfirmasi",
      "Apakah Anda yakin ingin melanjutkan?",
      [
        {
          text: "Yes",
          onPress: () => {
            // Aksi yang ingin Anda lakukan ketika tombol "Yes" ditekan
            Linking.openSettings();
            console.log("Tombol Yes ditekan");
          },
        },
      ],
      { cancelable: false }
    );
  };

  React.useEffect(() => {
    // getPermissionsLocation();
    const config = async () => {
      let resf = await Location.requestForegroundPermissionsAsync();
      let resb = await Location.requestBackgroundPermissionsAsync();
      if (resf.status != "granted" && resb.status !== "granted") {
        console.log("Permission to access location was denied");
        showAlert();
      } else {
        console.log("Permission to access location granted");
      }
    };

    config();
  }, []);

  const startLocation = () => {
    startLocationTracking();
  };

  const stopLocation = () => {
    setLocationStarted(false);
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((tracking) => {
      if (tracking) {
        Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
        console.log("tracking Stopped");
      }
    });
  };

  return (
    <>
      <View>
        {locationStarted ? (
          <TouchableOpacity onPress={stopLocation}>
            <Text style={styles.btnText}>Stop Tracking</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startLocation}>
            <Text style={styles.btnText}>Start Tracking</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* <HandleLocationPermissionComponent
        locationPermissionBottomSheetRef={locationPermissionBottomSheetRef}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 20,
    backgroundColor: "green",
    color: "white",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data) {
    const { locations }: any = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    l1 = lat;
    l2 = long;

    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
  }
});

export default UserLocation;
