import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: 48, fontWeight: 'bold' }]}>
        Jwandoon
      </Text>
      <Text style={styles.subtitle}>
        Connect with blood donors in your area
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        >
          Login
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        >
          Register
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#E53935',
  },
  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 18,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    width: '100%',
  },
}); 