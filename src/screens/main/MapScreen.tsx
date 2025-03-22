import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { Text, Button, ActivityIndicator, Surface } from 'react-native-paper';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type MapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock blood requests data
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
  },
  {
    id: '2',
    userId: 'mock-user-124',
    patientName: 'Sarah Johnson',
    bloodType: 'O-',
    units: 1,
    urgencyLevel: 'emergency',
    hospitalName: 'Memorial Hospital',
    location: {
      latitude: 34.0622,
      longitude: -118.2537,
      address: '456 Oak Ave, Los Angeles, CA'
    },
    contactNumber: '+1234567891',
    additionalNotes: 'Emergency transfusion needed',
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    userId: 'mock-user-125',
    patientName: 'Mike Wilson',
    bloodType: 'B+',
    units: 3,
    urgencyLevel: 'normal',
    hospitalName: 'St. Mary\'s Hospital',
    location: {
      latitude: 34.0422,
      longitude: -118.2337,
      address: '789 Pine St, Los Angeles, CA'
    },
    contactNumber: '+1234567892',
    additionalNotes: 'Scheduled surgery next week',
    status: 'open',
    createdAt: new Date().toISOString(),
  }
];

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const URGENCY_LEVELS = ['normal', 'urgent', 'emergency'];

export const MapScreen = () => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E53935" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 34.0522,
            longitude: -118.2437,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {MOCK_BLOOD_REQUESTS.map((request) => (
            <Marker
              key={request.id}
              coordinate={{
                latitude: request.location.latitude,
                longitude: request.location.longitude,
              }}
              pinColor={getUrgencyColor(request.urgencyLevel)}
            >
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{request.bloodType} Blood Needed</Text>
                  <Text style={styles.calloutText}>Hospital: {request.hospitalName}</Text>
                  <Text style={styles.calloutText}>Units: {request.units}</Text>
                  <Text style={[
                    styles.calloutUrgency,
                    { color: getUrgencyColor(request.urgencyLevel) }
                  ]}>
                    {request.urgencyLevel.toUpperCase()}
                  </Text>
                  <Button
                    mode="contained"
                    onPress={() => navigation.navigate('RequestDetails', { requestId: request.id })}
                    style={styles.calloutButton}
                  >
                    View Details
                  </Button>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
      
      <Surface style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('CreateRequest')}
          style={styles.button}
        >
          Create Request
        </Button>
      </Surface>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callout: {
    width: 200,
    padding: 8,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 14,
    marginBottom: 2,
  },
  calloutUrgency: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 8,
  },
  calloutButton: {
    marginTop: 8,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
  },
  button: {
    backgroundColor: '#E53935',
  },
});

function getUrgencyColor(urgencyLevel: string) {
  switch (urgencyLevel) {
    case 'emergency':
      return '#D32F2F';
    case 'urgent':
      return '#F57C00';
    default:
      return '#2196F3';
  }
} 