import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/authContext";
import HomeScreen from "../screens/HomeScreen";
import { CreateRequestScreen } from "../screens/main/CreateRequestScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import InstitutionSignupScreen from "../screens/auth/InstitutionSignupScreen";
import AdminInstitutionApprovalScreen from "../screens/admin/AdminInstitutionApprovalScreen";
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {user ? (
        user.isAdmin ? (
          <>
            <Stack.Screen name="Admin Panel" component={AdminInstitutionApprovalScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        ) : user.isInstitution && user.status === "approved" ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Create Request" component={CreateRequestScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Institution Signup" component={InstitutionSignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Institution Signup" component={InstitutionSignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
