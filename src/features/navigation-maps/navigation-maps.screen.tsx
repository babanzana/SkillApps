// import React from "react";
// import MapView, { Callout, Marker } from "react-native-maps";
// import { defaultAddress, dummyMarkers } from "../utils/address.utils";
// import { Input, Layout, Text } from "@ui-kitten/components";
// import { StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { INDIGO_2 } from "../../components/color-databsae.component";

// const NavigationMapsScreen = () => {
//   const intialRegion = { defaultAddress };
//   const MapIcon = () => (
//     <Ionicons name={"map"} color={INDIGO_2} size={25} />
//   );
//   const MarkerIcon = () => {
//     return <Ionicons name={"construct"} color={INDIGO_2} size={25} />;
//   };

//   return (
//     <Layout style={styles.container}>
//       <MapView
//         initialRegion={intialRegion.defaultAddress.gps}
//         style={styles.container}
//       >
//         {dummyMarkers.map((dummyMarkers) => (
//           <Marker
//             key={dummyMarkers.id}
//             title={dummyMarkers.name}
//             coordinate={{
//               latitude: dummyMarkers.latitude,
//               longitude: dummyMarkers.longitude,
//             }}
//           >
//             {<MarkerIcon />}
//           </Marker>
//         ))}
//       </MapView>
//       <Input
//         accessoryLeft={MapIcon}
//         placeholder="Silahkan Lakukan Pencarian"
//         status="info"
//         size="medium"
//         style={styles.inputContainer}
//       />
//     </Layout>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   inputContainer: {
//     position: "absolute",
//     top: 50,
//     left: 20,
//     right: 20,
//   },
// });

// export default NavigationMapsScreen;

//=================================================================================
//=================================================================================
//=================================================================================

import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { defaultAddress, dummyMarkers } from "../utils/address.utils";
import { Input, Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { INDIGO_2 } from "../../components/color-databsae.component";
import * as Location from "expo-location";

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
  // console.log("🚀 ~ file: navigation-maps.screen.tsx:87 ~ NavigationMapsScreen ~ location:", location)
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("🚀 ~ file: navigation-maps.screen.tsx:92 ~ status:", status)
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
