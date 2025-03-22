import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Switch, Card, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { calculateDistance } from '../utils/location';
import { useAuth } from '../context/AuthContext';
import { BloodRequest } from '../types/blood';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  RequestDetails: { request: BloodRequest };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RequestDetails'>;

const HomeScreen = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [nearbyRequests, setNearbyRequests] = useState<BloodRequest[]>([]);
  
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();

  const toggleAvailability = async () => {
    if (!user) return;
    
    try {
      await firestore()
        .collection('donors')
        .doc(user.uid)
        .update({
          isAvailable: !isAvailable,
          lastUpdated: firestore.FieldValue.serverTimestamp(),
        });
      setIsAvailable(!isAvailable);
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const fetchNearbyRequests = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userDoc = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();
      
      const userData = userDoc.data();
      const userLocation = userData?.location;

      if (!userLocation) {
        setNearbyRequests([]);
        return;
      }

      const requestsSnapshot = await firestore()
        .collection('bloodRequests')
        .where('status', '==', 'active')
        .get();

      const filteredRequests = requestsSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as BloodRequest))
        .filter(request => {
          if (!request.location) return false;
          
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            request.location.latitude,
            request.location.longitude
          );
          
          return distance <= 50; // Within 50km radius
        })
        .sort((a, b) => {
          const distanceA = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            a.location.latitude,
            a.location.longitude
          );
          const distanceB = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            b.location.latitude,
            b.location.longitude
          );
          return distanceA - distanceB;
        });

      setNearbyRequests(filteredRequests);
    } catch (error) {
      console.error('Error fetching nearby requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchNearbyRequests().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchDonorStatus = async () => {
      try {
        const donorDoc = await firestore()
          .collection('donors')
          .doc(user.uid)
          .get();
        
        setIsAvailable(donorDoc.data()?.isAvailable || false);
      } catch (error) {
        console.error('Error fetching donor status:', error);
      }
    };

    fetchDonorStatus();
    fetchNearbyRequests();
  }, [user]);

  const renderRequestItem = ({ item }: { item: BloodRequest }) => (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <Text variant="titleMedium">{item.bloodType} Blood Needed</Text>
        <Text variant="bodyMedium">Hospital: {item.hospitalName}</Text>
        <Text variant="bodyMedium">Units Required: {item.unitsRequired}</Text>
        <Text variant="bodyMedium">Urgency: {item.urgency}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => navigation.navigate('RequestDetails', { request: item })}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <Text variant="headlineMedium">Please sign in to continue</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Welcome, {user.displayName}</Text>
        <View style={styles.availabilityContainer}>
          <Text variant="titleMedium">Available for Donation</Text>
          <Switch value={isAvailable} onValueChange={toggleAvailability} />
        </View>
      </View>

      <Text variant="titleLarge" style={styles.sectionTitle}>
        Nearby Blood Requests
      </Text>

      <FlatList
        data={nearbyRequests}
        renderItem={renderRequestItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {loading ? 'Loading requests...' : 'No nearby blood requests found'}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 24,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen; 