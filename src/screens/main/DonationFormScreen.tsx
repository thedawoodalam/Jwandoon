import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, HelperText, RadioButton } from 'react-native-paper';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

type DonationFormRouteProp = RouteProp<RootStackParamList, 'DonationForm'>;

export const DonationFormScreen = () => {
  const route = useRoute<DonationFormRouteProp>();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [medications, setMedications] = useState('');
  const [hasRecentSurgery, setHasRecentSurgery] = useState('no');
  const [hasRecentIllness, setHasRecentIllness] = useState('no');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      if (!bloodType || !lastDonationDate) {
        setError('Please fill in all required fields');
        return;
      }

      // Mock successful submission
      console.log('Donation form submitted:', {
        requestId: route.params.requestId,
        bloodType,
        lastDonationDate,
        medicalConditions,
        medications,
        hasRecentSurgery,
        hasRecentIllness,
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigation.navigate('Main');
    } catch (error: any) {
      console.error('Donation submission error:', error);
      setError(error.message || 'Failed to submit donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Donation Form
          </Text>

          <TextInput
            label="Blood Type"
            value={bloodType}
            onChangeText={setBloodType}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Last Donation Date (YYYY-MM-DD)"
            value={lastDonationDate}
            onChangeText={setLastDonationDate}
            style={styles.input}
            mode="outlined"
            placeholder="YYYY-MM-DD"
          />

          <TextInput
            label="Medical Conditions (if any)"
            value={medicalConditions}
            onChangeText={setMedicalConditions}
            style={styles.input}
            mode="outlined"
            multiline
          />

          <TextInput
            label="Current Medications (if any)"
            value={medications}
            onChangeText={setMedications}
            style={styles.input}
            mode="outlined"
            multiline
          />

          <Text variant="bodyMedium" style={styles.label}>
            Have you had any surgery in the last 6 months?
          </Text>
          <RadioButton.Group
            onValueChange={value => setHasRecentSurgery(value)}
            value={hasRecentSurgery}
          >
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton value="yes" />
                <Text>Yes</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="no" />
                <Text>No</Text>
              </View>
            </View>
          </RadioButton.Group>

          <Text variant="bodyMedium" style={styles.label}>
            Have you been ill in the last 2 weeks?
          </Text>
          <RadioButton.Group
            onValueChange={value => setHasRecentIllness(value)}
            value={hasRecentIllness}
          >
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton value="yes" />
                <Text>Yes</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="no" />
                <Text>No</Text>
              </View>
            </View>
          </RadioButton.Group>

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
            Submit Donation
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
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  button: {
    marginTop: 16,
  },
}); 