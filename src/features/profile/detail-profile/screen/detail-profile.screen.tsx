// import React from "react";
// import { View, Text, Button, SafeAreaView, StatusBar } from "react-native";
// import { HeaderBar } from "../../../../components/header-bar.component";
// import { ThemedSafeAreaView } from "../../../../components/ThemedSafeAreaView.component";

// const DetailProfileScreen = ({ navigation }: any) => {
//   const handleGoBack = () => {
//     navigation.goBack();
//   };
//   return (
//     <ThemedSafeAreaView style={{ flex: 1}}>
//       <View style={{ flex: 1 }}>
//         <HeaderBar title="Saved addresses" handleGoBack={handleGoBack} />
//         <Text>Detail Profile Screen</Text>
//       </View>
//     </ThemedSafeAreaView>
//   );
// };

// export default DetailProfileScreen;

//=================================================================================
//=================================================================================
//=================================================================================

import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
// import { defaultAddress, dummyMarkers } from "../utils/address.utils";
import { Input, Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { INDIGO_2 } from "../../components/color-databsae.component";
import * as Location from "expo-location";
import { INDIGO_2 } from "../../../../components/color-databsae.component";
import { defaultAddress } from "../../../utils/address.utils";
import * as TaskManager from "expo-task-manager";
import { LocationEventEmitter } from "expo-location/build/LocationEventEmitter";

// Nama tugas latar belakang Anda
const YOUR_TASK_NAME = 'background-location-task';

// Fungsi yang akan dipanggil ketika menerima pembaruan lokasi
TaskManager.defineTask(YOUR_TASK_NAME, ({ data: { locations }, error }) => {
 if (error) {
   console.log('Terjadi kesalahan:', error.message);
   return;
 }
 console.log("Menerima lokasi baru", locations);
});

const NavigationMapsScreen = () => {
  const intialRegion = { defaultAddress };
  const MapIcon = () => <Ionicons name={"map"} color={INDIGO_2} size={25} />;

  const initialRegion = {
    latitude: 37.559918160689115,
    longitude: -122.37215305068169,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const [location, setLocation] = useState(initialRegion);
  const [locationBackground, setLocationBackground] = useState(initialRegion);
  const [errorMsg, setErrorMsg] = useState("");

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      console.log("Izin lokasi diberikan.");
    } else {
      console.log("Izin lokasi ditolak.");
    }
  };

  // Fungsi untuk memulai tugas latar belakang
  const startBackgroundTask = async () => {
    await Location.startLocationUpdatesAsync(YOUR_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 1000, // Interval waktu (ms) untuk menerima pembaruan lokasi
      showsBackgroundLocationIndicator: true,
    });
    console.log("Tugas latar belakang telah dimulai.");
  };

  // Komponen efek samping untuk meminta izin dan memulai tugas latar belakang saat komponen pertama kali dimuat
  useEffect(() => {
    requestLocationPermission();
    startBackgroundTask();
  }, []);

  useEffect(() => {

    const handleLocationChangeBackground = (location: any) => {
      console.log("Posisi baru handleLocationChangeBackground:", location);
    };

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let { status: status2 } =
        await Location.requestBackgroundPermissionsAsync();
      console.log(
        "🚀 ~ file: detail-profile.screen.tsx:56 ~ status2:",
        status2
      );
      console.log("🚀 ~ file: navigation-maps.screen.tsx:92 ~ status:", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setLocation(newRegion);

      const handleLocationChange = (location: any) => {
        const newStateUpdate = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        setLocationBackground(newStateUpdate);
        console.log("Posisi baru handleLocationChange:", newStateUpdate);
      };

      const locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 1000 },
        handleLocationChange
      );

      return () => {
        locationSubscription.remove();
      };
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <Layout style={styles.container}>
      <MapView
        initialRegion={intialRegion.defaultAddress.gps}
        style={styles.container}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        ></Marker>
      </MapView>
      <Input
        accessoryLeft={MapIcon}
        placeholder="Silahkan Lakukan Pencarian"
        status="info"
        size="medium"
        style={styles.inputContainer}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
  },
});

export default NavigationMapsScreen;
