import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./src/context/authContext";
import LoginScreen from "./src/screens/auth/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();

// Protected Screen Wrapper
function ProtectedRoutes() {
  const { user } = useAuth();

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <ProtectedRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}
