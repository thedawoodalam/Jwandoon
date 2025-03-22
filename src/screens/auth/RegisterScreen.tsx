import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    bloodType: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    try {
      // TODO: Implement registration logic
      navigation.navigate('Main');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const updateFormData = (key: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Create Account
        </Text>
        <View style={styles.form}>
          <TextInput
            label="Full Name"
            value={formData.fullName}
            onChangeText={updateFormData('fullName')}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={updateFormData('email')}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={formData.password}
            onChangeText={updateFormData('password')}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
          />
          <TextInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={updateFormData('confirmPassword')}
            secureTextEntry={!showConfirmPassword}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
            style={styles.input}
          />
          <TextInput
            label="Phone Number"
            value={formData.phoneNumber}
            onChangeText={updateFormData('phoneNumber')}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            label="Blood Type"
            value={formData.bloodType}
            onChangeText={updateFormData('bloodType')}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleRegister} style={styles.button}>
            Register
          </Button>
          <View style={styles.loginContainer}>
            <Text variant="bodyMedium">Already have an account? </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
            >
              Login
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
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
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginButton: {
    marginLeft: -15,
  },
}); 