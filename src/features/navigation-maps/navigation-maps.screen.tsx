import React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { defaultAddress, dummyMarkers } from "../utils/address.utils";
import { Input, Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { INDIGO_2 } from "../../components/color-databsae.component";

const NavigationMapsScreen = () => {
  const intialRegion = { defaultAddress };
  const MapIcon = () => (
    <Ionicons name={"map"} color={INDIGO_2} size={25} />
  );
  const MarkerIcon = () => {
    return <Ionicons name={"construct"} color={INDIGO_2} size={25} />;
  };

  return (
    <Layout style={styles.container}>
      <MapView
        initialRegion={intialRegion.defaultAddress.gps}
        style={styles.container}
      >
        {dummyMarkers.map((dummyMarkers) => (
          <Marker
            key={dummyMarkers.id}
            title={dummyMarkers.name}
            coordinate={{
              latitude: dummyMarkers.latitude,
              longitude: dummyMarkers.longitude,
            }}
          >
            {<MarkerIcon />}
          </Marker>
        ))}
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

//=================================================================================
//=================================================================================
//=================================================================================
