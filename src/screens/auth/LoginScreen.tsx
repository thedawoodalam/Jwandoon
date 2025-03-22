import React, { useState } from "react";
import { View, Button, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useAuth } from "../../context/authContext";

export default function LoginScreen() {
  const { user, loginWithEmail, loginWithGoogle, loginWithFacebook } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      await loginWithEmail(email, password);
      Alert.alert("Success", "Logged in successfully!");
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Text style={styles.welcomeText}>Welcome, {user.displayName || user.email}</Text>
      ) : (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Button title="Login with Email" onPress={handleEmailLogin} />
          <Button title="Login with Google" onPress={loginWithGoogle} />
          <Button title="Login with Facebook" onPress={loginWithFacebook} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
