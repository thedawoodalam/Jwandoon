import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Switch, Button, Divider, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  
  // Settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      // Navigation will be handled by the AuthContext
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <List.Section>
          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Push Notifications"
            right={() => (
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
              />
            )}
          />
          <List.Item
            title="Email Notifications"
            right={() => (
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
              />
            )}
          />
          <Divider />

          <List.Subheader>Privacy</List.Subheader>
          <List.Item
            title="Location Services"
            right={() => (
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
              />
            )}
          />
          <Divider />

          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Dark Mode"
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            )}
          />
          <Divider />

          <List.Subheader>Account</List.Subheader>
          <List.Item
            title="Edit Profile"
            left={props => <List.Icon {...props} icon="account-edit" />}
            onPress={() => navigation.navigate('EditProfile')}
          />
          <List.Item
            title="Change Password"
            left={props => <List.Icon {...props} icon="lock-reset" />}
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-account" />}
            onPress={() => console.log('Navigate to Privacy Policy')}
          />
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document" />}
            onPress={() => console.log('Navigate to Terms of Service')}
          />
          <Divider />

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSignOut}
              style={styles.signOutButton}
              buttonColor="#E53935"
            >
              Sign Out
            </Button>
          </View>
        </List.Section>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    margin: 16,
  },
  buttonContainer: {
    padding: 16,
  },
  signOutButton: {
    marginTop: 8,
  },
}); 