import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

export const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate inputs
      if (!currentPassword || !newPassword || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }

      if (newPassword.length < 6) {
        setError('New password must be at least 6 characters long');
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        return;
      }

      // Mock successful password change
      console.log('Password changed for user:', user?.uid);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigation.goBack();
    } catch (error: any) {
      console.error('Password change error:', error);
      setError(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Change Password
          </Text>

          <TextInput
            label="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
          />

          <HelperText type="error" visible={!!error}>
            {error}
          </HelperText>

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Change Password
          </Button>
        </Card.Content>
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
  title: {
    color: '#E53935',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
}); 