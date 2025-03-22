import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement password reset logic
      // Show success message and navigate back
      navigation.goBack();
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Reset Password
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        Enter your email address and we'll send you instructions to reset your password.
      </Text>
      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handleResetPassword}
          loading={isLoading}
          disabled={isLoading || !email}
          style={styles.button}
        >
          Send Reset Link
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Back to Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.7,
  },
  form: {
    gap: 15,
  },
  input: {
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 10,
  },
  backButton: {
    marginTop: 5,
  },
}); 