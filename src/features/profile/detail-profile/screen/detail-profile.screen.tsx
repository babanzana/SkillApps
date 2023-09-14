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

import React, { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
// import { defaultAddress, dummyMarkers } from "../utils/address.utils";
import { Input, Layout, Text } from "@ui-kitten/components";
import { Alert, Linking, StyleSheet, AppState } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { INDIGO_2 } from "../../components/color-databsae.component";
import * as Location from "expo-location";
import { INDIGO_2 } from "../../../../components/color-databsae.component";
import { defaultAddress } from "../../../utils/address.utils";
import * as TaskManager from "expo-task-manager";
import { LocationEventEmitter } from "expo-location/build/LocationEventEmitter";

// Nama tugas latar belakang
const YOUR_TASK_NAME = "background-location-task";

// TaskManager.defineTask(
//   YOUR_TASK_NAME,
//   ({ data: { locations }, error }: any) => {
//     if (error) {
//       console.log("Terjadi kesalahan:", error.message);
//       return;
//     }
//     // console.log("Menerima lokasi baru", locations);
//     const location = locations[0];
//     // console.log(`"latitude": ${location.coords.latitude},`);
//     // console.log(`"longitude": ${location.coords.longitude},`);
//   }
// );

const NavigationMapsScreen = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const intialRegion = { defaultAddress };
  const MapIcon = () => <Ionicons name={"map"} color={INDIGO_2} size={25} />;

  const initialRegion = {
    latitude: 37.559918160689115,
    longitude: -122.37215305068169,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const [location, setLocation] = useState(initialRegion);
  console.log(
    "🚀 ~ file: detail-profile.screen.tsx:70 ~ NavigationMapsScreen ~ location:",
    location
  );
  const [locationBackground, setLocationBackground] = useState(initialRegion);
  const [errorMsg, setErrorMsg] = useState("");

  TaskManager.defineTask(
    YOUR_TASK_NAME,
    ({ data: { locations }, error }: any) => {
      if (error) {
        console.log("Terjadi kesalahan:", error.message);
        return;
      }
      // console.log("Menerima lokasi baru", locations);
      const location = locations[0];
      // console.log(`"latitude": ${location.coords.latitude},`);
      // console.log(`"longitude": ${location.coords.longitude},`);
      const newStateUpdate = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setLocation(newStateUpdate);
    }
  );

  const handleOpenSettings = () => {
    Alert.alert(
      "Izin akses geolokasi ditolak",
      "Mohon nyalakan lokasi pada ponsel Anda untuk menggunakan fitur ini.",
      [
        {
          text: "OK",
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]
    );
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      // console.log("Izin lokasi diberikan.");
      // startBackgroundTask();
    } else {
      //Disini diberikan onPress buka settings.
      handleOpenSettings();
      // console.log("Izin lokasi ditolak.");
    }
  };

  // Fungsi untuk memulai tugas latar belakang
  const startBackgroundTask = async () => {
    await Location.startLocationUpdatesAsync(YOUR_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 1000,
      showsBackgroundLocationIndicator: true,
    });
    // console.log("Tugas latar belakang telah dimulai.");
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the Foreground!");
        // requestLocationPermission();
      } else {
        console.log("App Background!");
        startBackgroundTask();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const handleLocationChange = (location: any) => {
  //       const newStateUpdate = {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //         latitudeDelta: 0.005,
  //         longitudeDelta: 0.005,
  //       };
  //       setLocation(newStateUpdate);
  //       console.log("Lokasi yang baru diterima:", newStateUpdate);
  //     };

  //     //Disini bingung kenapa tidak update setiap 5 detik sekali, jadi ditambahkan setTimeout
  //     const locationSubscription = await Location.watchPositionAsync(
  //       {
  //         accuracy: Location.Accuracy.Balanced,
  //         timeInterval: 5000,
  //       },
  //       handleLocationChange
  //     );
  //     console.log("🚀 ~ file: detail-profile.screen.tsx:156 ~ locationSubscription:", locationSubscription)

  //     return () => {
  //       locationSubscription.remove();
  //     };
  //   })();
  // }, []);

  // useEffect(() => {
  //   const handleLocationChange = (location: any) => {
  //     const newStateUpdate = {
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //       latitudeDelta: 0.005,
  //       longitudeDelta: 0.005,
  //     };
  //     setLocation(newStateUpdate);
  //     // console.log("Lokasi yang baru diterima:", newStateUpdate);
  //   };

  //   let locationSubscription: any = null;

  //   const startLocationUpdates = async () => {
  //     locationSubscription = await Location.watchPositionAsync(
  //       {
  //         accuracy: Location.Accuracy.BestForNavigation,
  //         distanceInterval: 10,
  //         timeInterval: 5000,
  //       },
  //       handleLocationChange
  //     );
  //   };

  //   startLocationUpdates(); // Memulai pemantauan lokasi pertama kali

  //   const intervalId = setInterval(() => {
  //     if (locationSubscription) {
  //       locationSubscription.remove(); // Hentikan langganan saat ini jika ada
  //     }
  //     startLocationUpdates(); // Memulai pemantauan lokasi yang baru
  //   }, 5000);

  //   return () => {
  //     clearInterval(intervalId);
  //     if (locationSubscription) {
  //       locationSubscription.remove();
  //     }
  //   };
  // }, []);

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
        />
      </MapView>
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

//===============================

// import React, { useEffect, useState } from "react";
// import { View, Text, Button, AppState } from "react-native";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";
// import * as TaskManager from "expo-task-manager";

// const LOCATION_TASK_NAME = "background-location-task";

// TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   if (data) {
//     const { locations } = data;
//     console.log("Lokasi yang diperbarui:", locations);
//     // Lakukan sesuatu dengan data lokasi yang diperbarui di sini
//   }
// });

// export default function App() {
//   const [locationUpdatesEnabled, setLocationUpdatesEnabled] = useState(false);

//   useEffect(() => {
//     async function checkLocationPermission() {
//       const { status } = await Permissions.askAsync(Permissions.LOCATION);
//       if (status !== "granted") {
//         console.log("Izin lokasi tidak diberikan");
//       }
//     }

//     checkLocationPermission();
//   }, []);

//   useEffect(() => {
//     const handleAppStateChange = async (nextAppState) => {
//       if (nextAppState === "background") {
//         console.log(
//           "Aplikasi berada di latar belakang. Memulai pemantauan lokasi..."
//         );
//         await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//           accuracy: Location.Accuracy.Balanced,
//           timeInterval: 60000, // Interval pembaruan dalam milidetik (contoh: 60 detik)
//           distanceInterval: 100, // Jarak minimal (dalam meter) antara pembaruan lokasi
//         });
//         setLocationUpdatesEnabled(true);
//       } else if (nextAppState === "active") {
//         console.log(
//           "Aplikasi berada di foreground. Menghentikan pemantauan lokasi..."
//         );
//         await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
//         setLocationUpdatesEnabled(false);
//       }
//     };

//     // Langganan perubahan AppState
//     AppState.addEventListener("change", handleAppStateChange);

//     return () => {
//       // Hapus langganan saat komponen dibongkar
//       AppState.removeEventListener("change", handleAppStateChange as any);
//     };
//   }, []);

//   const startLocationUpdates = async () => {
//     // Dijalankan saat pengguna mengeklik tombol "Mulai Pemantauan Lokasi"
//   };

//   const stopLocationUpdates = async () => {
//     // Dijalankan saat pengguna mengeklik tombol "Hentikan Pemantauan Lokasi"
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>
//         Status Pemantauan Lokasi:{" "}
//         {locationUpdatesEnabled ? "Aktif" : "Tidak Aktif"}
//       </Text>
//       {locationUpdatesEnabled ? (
//         <Button
//           title="Hentikan Pemantauan Lokasi"
//           onPress={stopLocationUpdates}
//         />
//       ) : (
//         <Button
//           title="Mulai Pemantauan Lokasi"
//           onPress={startLocationUpdates}
//         />
//       )}
//     </View>
//   );
// }
