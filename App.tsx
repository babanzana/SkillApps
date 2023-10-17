// import { PaperProvider } from "react-native-paper";
// import React, { useEffect } from "react";
// import RooteStackNavigator from "./src/navigation/root-navigation";
// import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
// import { EvaIconsPack } from "@ui-kitten/eva-icons";
// import { evaTheme, evaMapping } from "./eva";
// import AuthenticationNavigation from "./src/navigation/auth-navigation";
// import * as Notifications from "expo-notifications";
// import { Text, View } from "react-native";

// export default function App() {
//   useEffect(() => {
//     const requestNotificationPermission = async () => {
//       try {
//         const { granted } = await Notifications.requestPermissionsAsync();
//         if (granted) {
//           console.log("Izin notifikasi diberikan!");
//         } else {
//           console.log("Izin notifikasi ditolak.");
//         }
//       } catch (error) {
//         console.log("Error ni Gus: ", error);
//       }
//     };
//     requestNotificationPermission();
//   }, []);
//   return (
//     <>
//       <IconRegistry icons={EvaIconsPack} />
//       <ApplicationProvider mapping={evaMapping} theme={{ ...evaTheme }}>
//         <PaperProvider>
//           {/* <RooteStackNavigator /> */}
//           <AuthenticationNavigation />
//         </PaperProvider>
//       </ApplicationProvider>
//     </>

//     // <View>
//     //   <Text>asdf</Text>
//     // </View>
//   );
// }

// import React, { useRef } from "react";
// import { StyleSheet, View } from "react-native";
// import UserLocation from "./UserLocation";
// import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
// import { HandleLocationPermissionComponent } from "./handle-location-permission";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <GestureHandlerRootView>
//         <UserLocation />
//       </GestureHandlerRootView>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// Location Background tuh yang ini

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
let foregroundSubscription: { remove: any } | null = null;

// define background untuk trackingnya
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations }: any = data;
    const location = locations[0];
    if (location) {
      // console.log("Location in Background", location.coords);

      const { locations }: any = data;
      let lat = locations[0].coords.latitude;
      let long = locations[0].coords.longitude;

      console.log(`${new Date(Date.now()).toLocaleString()}: ${lat}, ${long}`);
    }
  }
});

export default function App() {
  const positionPoint = {
    latitude: 0,
    longitude: 0,
  };
  const [position, setPosition] = useState(positionPoint);

  // Request permissions
  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      // Jika Foregroundnya Granted langsung cek Background
      if (foreground.granted)
        await Location.requestBackgroundPermissionsAsync();
    };
    requestPermissions();
  }, []);

  // Start location tracking untuk foreground
  const startForegroundUpdate = async () => {
    // Check if foreground permissionnya granted tidak
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
    }

    // Memastikan bahwa foreground sebelumnya berjalan atau tidak
    foregroundSubscription?.remove();

    // Start watching position ini untuk Foreground menggunakan watchPoisitonAsync
    foregroundSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 5000,
        distanceInterval: 0,
      },
      (location) => {
        // Disini ketika sudah mendapatkan lokasi apa yang mau dilakukan
        setPosition(location.coords);
      }
    );
  };

  // Stop tracking untuk foreground
  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove();
    const positionReset = positionPoint;
    setPosition(positionReset);
  };

  // Start location tracking untuk background
  const startBackgroundUpdate = async () => {
    // Check if background permissionnya granted tidak
    const { granted } = await Location.getBackgroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
    }

    // Memastikan task nya itu define atau tidak
    const isTaskDefined = TaskManager.isTaskDefined(LOCATION_TASK_NAME);
    if (!isTaskDefined) {
      console.log("Task is not defined");
      return;
    }

    // Memastikan background Location tracking sebelumnya berjalan atau tidak, jika sedang berjalan return saja.
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      console.log("Already started");
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 5000,
      distanceInterval: 0,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true, // ?? Ky nya ini tidak berfungsi
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    });
  };

  // Stop location tracking untuk background
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log("Location tacking stopped");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Foreground Latitude: {position?.latitude}</Text>
      <Text>Foreground Longitude: {position?.longitude}</Text>
      <View style={styles.separator} />
      <Button
        onPress={startForegroundUpdate}
        title="Start in foreground"
        color="green"
      />
      <View style={styles.separator} />
      <Button
        onPress={stopForegroundUpdate}
        title="Stop in foreground"
        color="red"
      />
      <View style={styles.separator} />
      <Button
        onPress={startBackgroundUpdate}
        title="Start in background"
        color="green"
      />
      <View style={styles.separator} />
      <Button
        onPress={stopBackgroundUpdate}
        title="Stop in foreground"
        color="red"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: 15,
  },
  separator: {
    marginVertical: 8,
  },
});

// Percobaan untuk Notifications

