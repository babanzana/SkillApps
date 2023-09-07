import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Di sini, Anda dapat menambahkan logika untuk mendaftarkan pengguna baru ke database atau penyimpanan yang sesuai.
    // Misalnya, Anda dapat menggunakan Firebase atau server backend.
    // Setelah mendaftarkan pengguna, Anda dapat mengarahkannya ke halaman login atau yang sesuai.
  };

  return (
    <View>
      <Text>Register</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
