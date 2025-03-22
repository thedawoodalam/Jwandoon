import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, ActivityIndicator, Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';

type RequestDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RequestDetails'>;
type RequestDetailsScreenRouteProp = RouteProp<RootStackParamList, 'RequestDetails'>;

// Mock blood request data (same as in HomeScreen)
const MOCK_BLOOD_REQUESTS = [
  {
    id: '1',
    userId: 'mock-user-123',
    patientName: 'John Smith',
    bloodType: 'A+',
    units: 2,
    urgencyLevel: 'urgent',
    hospitalName: 'City General Hospital',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: '123 Main St, Los Angeles, CA'
    },
    contactNumber: '+1234567890',
    additionalNotes: 'Need blood for surgery tomorrow morning',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // ... other mock data
];

export const RequestDetailsScreen = () => {
  const navigation = useNavigation<RequestDetailsScreenNavigationProp>();
  const route = useRoute<RequestDetailsScreenRouteProp>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState<any>(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const foundRequest = MOCK_BLOOD_REQUESTS.find(r => r.id === route.params.requestId);
        if (foundRequest) {
          setRequest(foundRequest);
        }
      } catch (error) {
        console.error('Error fetching request details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [route.params.requestId]);

  const handleDonate = () => {
    if (user && request) {
      navigation.navigate('DonationForm', {
        requestId: request.id,
        userId: user.uid,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E53935" />
      </View>
    );
  }

  if (!request) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="headlineSmall">Request not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.title}>
              Blood Request Details
            </Text>
            <Text
              variant="labelLarge"
              style={[
                styles.urgencyLabel,
                { color: request.urgencyLevel === 'emergency' ? '#D32F2F' : '#F57C00' },
              ]}
            >
              {request.urgencyLevel.toUpperCase()}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="titleMedium">Patient Name:</Text>
            <Text variant="bodyLarge">{request.patientName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="titleMedium">Blood Type:</Text>
            <Text variant="bodyLarge">{request.bloodType}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="titleMedium">Units Needed:</Text>
            <Text variant="bodyLarge">{request.units}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="titleMedium">Hospital:</Text>
            <Text variant="bodyLarge">{request.hospitalName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="titleMedium">Address:</Text>
            <Text variant="bodyLarge">{request.location.address}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="titleMedium">Contact:</Text>
            <Text variant="bodyLarge">{request.contactNumber}</Text>
          </View>

          {request.additionalNotes && (
            <View style={styles.notes}>
              <Text variant="titleMedium">Additional Notes:</Text>
              <Text variant="bodyLarge">{request.additionalNotes}</Text>
            </View>
          )}

          <Button
            mode="contained"
            onPress={handleDonate}
            style={styles.donateButton}
            contentStyle={styles.buttonContent}
          >
            Donate Blood
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#E53935',
  },
  urgencyLabel: {
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 16,
  },
  detailRow: {
    marginBottom: 12,
  },
  notes: {
    marginTop: 16,
    marginBottom: 24,
  },
  donateButton: {
    marginTop: 16,
  },
  buttonContent: {
    height: 48,
  },
}); 