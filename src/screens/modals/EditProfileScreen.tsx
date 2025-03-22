import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, HelperText, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

export const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.fullName || '');
      setPhoneNumber(userProfile.phoneNumber || '');
      setAddress(userProfile.address || '');
      setBloodType(userProfile.bloodType || '');
      setEmergencyContact(userProfile.emergencyContact || '');
      setBio(userProfile.bio || '');
    }
  }, [userProfile]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      if (!fullName || !phoneNumber) {
        setError('Name and phone number are required');
        return;
      }

      // Mock successful profile update
      console.log('Profile updated:', {
        userId: user?.uid,
        fullName,
        phoneNumber,
        address,
        bloodType,
        emergencyContact,
        bio,
        updatedAt: new Date().toISOString(),
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigation.goBack();
    } catch (error: any) {
      console.error('Profile update error:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.avatarContainer}>
            <Avatar.Text
              size={80}
              label={fullName ? fullName.substring(0, 2).toUpperCase() : 'U'}
              style={styles.avatar}
            />
            <Button mode="text" onPress={() => console.log('Change photo')}>
              Change Photo
            </Button>
          </View>

          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
            mode="outlined"
            keyboardType="phone-pad"
          />

          <TextInput
            label="Address"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            mode="outlined"
            multiline
          />

          <TextInput
            label="Blood Type"
            value={bloodType}
            onChangeText={setBloodType}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Emergency Contact"
            value={emergencyContact}
            onChangeText={setEmergencyContact}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Bio"
            value={bio}
            onChangeText={setBio}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={3}
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
            Save Changes
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    marginBottom: 8,
    backgroundColor: '#E53935',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
}); 