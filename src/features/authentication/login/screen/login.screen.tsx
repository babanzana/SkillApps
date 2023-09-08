import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemedSafeAreaView } from "../../../../components/ThemedSafeAreaView.component";
import { Input, Layout, Text, Button, Icon } from "@ui-kitten/components";
import {
  INDIGO_1,
  INDIGO_2,
  INDIGO_6,
} from "../../../../components/color-databsae.component";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import { lotties } from "../../../../assets-data/lotties/index.lotties";

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["55%"], []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  useEffect(() => {
    setIsDisabled(username.length === 0);
    setIsDisabled(password.length === 0);
  }, []);

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

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const captionUsername = () => {
    if (username === "") {
      return (
        <Text category="label" status="danger">
          {/* Bagian category dan status tidak berfungsi, cari tau kenapa */}
          Enter Your Username
        </Text>
      );
    }
    return undefined;
  };

  const captionPassword = () => {
    if (password === "") {
      return (
        <Text category="label" status="danger">
          {/* Bagian category dan status tidak berfungsi, cari tau kenapa */}
          Enter Your Password
        </Text>
      );
    }
    return undefined;
  };

  const handleOnPressLogin = () => {
    if (username === "Admin" && password === "Admin") {
      setUsername("");
      setPassword("");
      navigation.navigate("RootNavigation");
    } else {
      sheetRef.current?.expand();
      Keyboard.dismiss();
    }
  };

  const handleOnChangeUsername = (usernameText: any) => {
    setUsername(usernameText);
    setIsDisabled(usernameText.length === 0);
  };

  const handleOnChangePassword = (passwordText: any) => {
    setPassword(passwordText);
    setIsDisabled(passwordText.length === 0);
  };

  const handleNavigateRegister = () => {
    console.log("Navigate to Register Screen");
    navigation.navigate("Register");
  };

  const registerInformation = () => {
    return (
      <TouchableOpacity onPress={handleNavigateRegister}>
        <Text
          category="label"
          status="success"
          style={{ textDecorationLine: "underline" }}
        >
          Register Here...
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <Layout style={styles.innerContainer}>
        <Text style={{ marginBottom: 20 }} category="h2">
          Login
        </Text>
        <Input
          label={"Username"}
          placeholder="Username"
          caption={captionUsername()}
          value={username}
          onChangeText={handleOnChangeUsername}
          style={{ marginBottom: 20 }}
        />
        <Input
          label={"Password"}
          placeholder="Password"
          caption={captionPassword()}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={handleOnChangePassword}
          style={{ marginBottom: 20 }}
        />
        <Button
          style={{ borderRadius: 100 }}
          onPress={handleOnPressLogin}
          status="success"
          appearance="filled"
          disabled={isDisabled}
        >
          Login
        </Button>
      </Layout>
      <Layout
        style={{
          backgroundColor: INDIGO_1,
        }}
      >
        <Text
          category="label"
          status="info"
          style={{ top: 5, justifyContent: "center", alignItems: "center" }}
        >
          Don't have an account? {registerInformation()}
        </Text>
      </Layout>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        bottomInset={46}
        detached={true}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        style={styles.sheetContainer}
        backgroundStyle={{ backgroundColor: INDIGO_6 }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Layout
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: INDIGO_6,
            }}
          >
            <Text
              status="danger"
              category="h6"
              style={{
                width: "80%",
                textAlign: "center",
                top: 10,
                position: "absolute",
              }}
            >
              Login Unsuccessful, Please Verify Your Credentials Again
            </Text>
            <LottieView
              source={lotties.failureLogin}
              key="animation"
              autoPlay
              loop
              resizeMode="contain"
              style={{ height: 250, width: 250 }}
            />
            <Button
              style={{
                width: "80%",
                borderRadius: 100,
                bottom: 10,
                position: "absolute",
              }}
              onPress={handleClosePress}
              status="danger"
              appearance="filled"
            >
              Close
            </Button>
          </Layout>
        </BottomSheetView>
      </BottomSheet>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: INDIGO_1,
  },
  innerContainer: {
    width: "80%",
    backgroundColor: INDIGO_1,
  },
  sheetContainer: {
    flex: 1,
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
