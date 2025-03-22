// src/screens/main/CreateRequestScreen.tsx

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, HelperText, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/authContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const CreateRequestScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [patientName, setPatientName] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [units, setUnits] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('normal');
  const [hospitalName, setHospitalName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      if (!patientName || !bloodType || !units || !hospitalName || !address || !contactNumber) {
        setError('Please fill in all required fields');
        return;
      }

      const requestData = {
        patientName,
        bloodType,
        units: parseInt(units),
        urgencyLevel,
        hospitalName,
        location: {
          address,
          latitude: 0, // Update with actual latitude if available
          longitude: 0, // Update with actual longitude if available
        },
        contactNumber,
        additionalNotes,
        userId: user?.uid,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'bloodRequests'), requestData);

      navigation.goBack();
    } catch (error: any) {
      console.error('Request submission error:', error);
      setError(error.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Create Blood Request
          </Text>

          <TextInput
            label="Patient Name"
            value={patientName}
            onChangeText={setPatientName}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Blood Type"
            value={bloodType}
            onChangeText={setBloodType}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Units Needed"
            value={units}
            onChangeText={setUnits}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
          />

          <Text variant="bodyMedium" style={styles.label}>Urgency Level</Text>
          <SegmentedButtons
            value={urgencyLevel}
            onValueChange={setUrgencyLevel}
            buttons={[
              { value: 'normal', label: 'Normal' },
              { value: 'urgent', label: 'Urgent' },
              { value: 'emergency', label: 'Emergency' },
            ]}
            style={styles.segmentedButtons}
          />

          <TextInput
            label="Hospital Name"
            value={hospitalName}
            onChangeText={setHospitalName}
            style={styles.input}
            mode="outlined"
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
            label="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
            style={styles.input}
            mode="outlined"
            keyboardType="phone-pad"
          />

          <TextInput
            label="Additional Notes"
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
            style={styles.input}
            mode="outlined"
            multiline
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
            Submit Request
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
  label: {
    marginBottom: 8,
    color: '#757575',
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
