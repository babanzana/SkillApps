import { withStyles } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

const TSafeAreaView = (props: any) => {
  const { eva, style, ...restProps } = props;
  return <SafeAreaView {...restProps} style={[eva.style.awesome, style]} />;
};

export const ThemedSafeAreaView = withStyles(TSafeAreaView, (theme) => ({
  awesome: {
    backgroundColor: theme["background-basic-color-4"],
    paddingTop: StatusBar.currentHeight,
    padding: 10,
  },
}));
