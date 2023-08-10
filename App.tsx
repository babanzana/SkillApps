import { PaperProvider } from "react-native-paper";
import React from "react";
import RooteStackNavigator from "./src/navigation/root-navigation";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { evaTheme, evaMapping } from "./eva";

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={evaMapping} theme={{ ...evaTheme }}>
        <PaperProvider>
          <RooteStackNavigator />
        </PaperProvider>
      </ApplicationProvider>
    </>
  );
}
