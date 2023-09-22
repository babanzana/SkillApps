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
//     // <>
//     //   <IconRegistry icons={EvaIconsPack} />
//     //   <ApplicationProvider mapping={evaMapping} theme={{ ...evaTheme }}>
//     //     <PaperProvider>
//     //       {/* <RooteStackNavigator /> */}
//     //       <AuthenticationNavigation />
//     //     </PaperProvider>
//     //   </ApplicationProvider>
//     // </>

//     <View>
//       <Text>asdf</Text>
//     </View>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { isLocationEnabled } from "react-native-android-location-enabler";
import * as Location from "expo-location";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // const [enabled, setEnabled] = useState(false);
  // console.log("🚀 ~ file: App.tsx:65 ~ App ~ enabled:", enabled);

  // const checkLocationStatus = async () => {
  //   const { locationServicesEnabled } = await Location.hasServicesEnabledAsync();
  //   console.log("🚀 ~ file: App.tsx:70 ~ checkLocationStatus ~ valueOf:", valueOf)
  //   if (valueOf) {
  //     console.log("Layanan lokasi aktif.");
  //   } else {
  //     console.log("Layanan lokasi tidak aktif.");
  //   }
  // };

  const checkLocationStatus = async () => {
    const result = await Location.hasServicesEnabledAsync();
    if (result) {
      console.log("Layanan lokasi aktif.");
    } else {
      console.log("Layanan lokasi tidak aktif.");
    }
  };

  useEffect(() => {
    checkLocationStatus();
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Ini Response: ", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      <Button
        title="Press Notif 1"
        onPress={async () => {
          await sendNotification1();
        }}
      />
      <Button
        title="Press Notif 2"
        onPress={async () => {
          await sendNotification2();
        }}
      />
      <Button
        title="Press Notif 3"
        onPress={async () => {
          await sendNotification3();
        }}
      />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

const JAM = 21;
const MINUTE = 22;
// Fungsi untuk mengirim notifikasi
const sendNotification1 = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Judul Notifikasi1",
      body: "Isi pesan notifikasi di sini",
    },
    trigger: {
      hour: JAM,
      minute: MINUTE,
      repeats: true,
    },
  });
};

const sendNotification2 = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Judul Notifikasi2",
      body: "Isi pesan notifikasi di sini",
    },
    trigger: {
      hour: JAM,
      minute: MINUTE,
      repeats: true,
    },
  });
};

const sendNotification3 = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Judul Notifikasi3",
      body: "Isi pesan notifikasi di sini",
    },
    trigger: {
      hour: JAM,
      minute: MINUTE,
      repeats: true,
    },
  });
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "your-project-id",
      })
    ).data;
    console.log("Ini token: ", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
