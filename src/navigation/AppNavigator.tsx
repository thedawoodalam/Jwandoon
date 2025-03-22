import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from './types';

// Auth Screens
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ChangePasswordScreen } from '../screens/auth/ChangePasswordScreen';

// Main Screens
import { HomeScreen } from '../screens/main/HomeScreen';
import { MapScreen } from '../screens/main/MapScreen';
import { CreateRequestScreen } from '../screens/main/CreateRequestScreen';
import { RequestDetailsScreen } from '../screens/main/RequestDetailsScreen';
import { DonationFormScreen } from '../screens/main/DonationFormScreen';

// Modal Screens
import { EditProfileScreen } from '../screens/modals/EditProfileScreen';
import { SettingsScreen } from '../screens/modals/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const theme = useTheme();
  const { userProfile } = useAuth();
  const navigation = useNavigation();

  const ProfileButton = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Settings')}
      style={{ marginRight: 16 }}
    >
      <Avatar.Text
        size={32}
        label={userProfile?.name ? userProfile.name.substring(0, 2).toUpperCase() : 'U'}
        style={{ backgroundColor: theme.colors.primary }}
      />
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        headerRight: () => <ProfileButton />,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MapTab"
        component={MapScreen}
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Icon name="map" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { user, loading } = useAuth();
  const theme = useTheme();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#fff',
        }}
      >
        {!user ? (
          // Auth Stack
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : (
          // Main Stack
          <>
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateRequest"
              component={CreateRequestScreen}
              options={{ title: 'Create Request' }}
            />
            <Stack.Screen
              name="RequestDetails"
              component={RequestDetailsScreen}
              options={{ title: 'Request Details' }}
            />
            <Stack.Screen
              name="DonationForm"
              component={DonationFormScreen}
              options={{ title: 'Donation Form' }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ title: 'Edit Profile' }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
              options={{ title: 'Change Password' }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: 'Settings' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 