import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Button, Surface, Avatar, Chip, FAB, useTheme, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    userId: 'mock-user-123',
    patientName: 'Sarah Johnson',
    bloodType: 'O-',
    units: 1,
    urgencyLevel: 'emergency',
    hospitalName: 'Memorial Hospital',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: '456 Oak Ave, Los Angeles, CA'
    },
    contactNumber: '+1234567891',
    additionalNotes: 'Emergency transfusion needed',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    userId: 'mock-user-123',
    patientName: 'Mike Wilson',
    bloodType: 'B+',
    units: 3,
    urgencyLevel: 'normal',
    hospitalName: 'St. Mary\'s Hospital',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: '789 Pine St, Los Angeles, CA'
    },
    contactNumber: '+1234567892',
    additionalNotes: 'Scheduled surgery next week',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const MOCK_STATS = {
  totalRequests: 156,
  activeRequests: 42,
  successfulDonations: 114,
  yourDonations: 8,
};

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const theme = useTheme();
  const { userProfile } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const navigateToMap = () => {
    // Navigate through root navigation
    const rootNavigation = navigation.getParent();
    if (rootNavigation) {
      rootNavigation.navigate('MainTabs', { screen: 'MapTab' });
    }
  };

  const navigateToCreateRequest = () => {
    // Navigate through root navigation
    const rootNavigation = navigation.getParent();
    if (rootNavigation) {
      rootNavigation.navigate('CreateRequest');
    }
  };

  const navigateToRequestDetails = (requestId: string) => {
    if (userProfile?.id) {
      navigation.navigate('RequestDetails', { requestId, userId: userProfile.id });
    }
  };

  const navigateToDonate = (requestId: string) => {
    if (userProfile?.id) {
      navigation.navigate('DonationForm', { requestId, userId: userProfile.id });
    }
  };

  const getUrgencyColor = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'emergency':
        return '#D32F2F';
      case 'urgent':
        return '#F57C00';
      default:
        return '#2196F3';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* User Profile Summary */}
        <Surface style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Avatar.Text
              size={60}
              label={userProfile?.name ? userProfile.name.substring(0, 2).toUpperCase() : 'U'}
              style={{ backgroundColor: theme.colors.primary }}
            />
            <View style={styles.profileInfo}>
              <Text variant="titleLarge">{userProfile?.name}</Text>
              <Text variant="bodyMedium">Blood Type: {userProfile?.bloodType}</Text>
              <Text variant="bodyMedium">Last Donation: {userProfile?.lastDonationDate || 'Not Available'}</Text>
            </View>
          </View>
        </Surface>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <Surface style={[styles.statCard, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.statNumber}>{MOCK_STATS.totalRequests}</Text>
            <Text style={styles.statLabel}>Total Requests</Text>
          </Surface>
          <Surface style={[styles.statCard, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.statNumber}>{MOCK_STATS.activeRequests}</Text>
            <Text style={styles.statLabel}>Active Requests</Text>
          </Surface>
          <Surface style={[styles.statCard, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.statNumber}>{MOCK_STATS.successfulDonations}</Text>
            <Text style={styles.statLabel}>Successful Donations</Text>
          </Surface>
          <Surface style={[styles.statCard, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.statNumber}>{MOCK_STATS.yourDonations}</Text>
            <Text style={styles.statLabel}>Your Donations</Text>
          </Surface>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Button
            mode="contained"
            onPress={navigateToMap}
            style={styles.actionButton}
            icon="map"
          >
            View Map
          </Button>
          <Button
            mode="contained"
            onPress={navigateToCreateRequest}
            style={styles.actionButton}
            icon="plus"
          >
            New Request
          </Button>
        </View>

        {/* Recent Blood Requests */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Recent Blood Requests</Text>
          {MOCK_BLOOD_REQUESTS.map((request) => (
            <Card
              key={request.id}
              style={styles.requestCard}
              onPress={() => navigateToRequestDetails(request.id)}
            >
              <Card.Content>
                <View style={styles.requestHeader}>
                  <View>
                    <Text variant="titleMedium">{request.bloodType} Blood Needed</Text>
                    <Text variant="bodyMedium">{request.hospitalName}</Text>
                  </View>
                  <Chip
                    style={{ backgroundColor: getUrgencyColor(request.urgencyLevel) }}
                    textStyle={{ color: 'white' }}
                  >
                    {request.urgencyLevel.toUpperCase()}
                  </Chip>
                </View>
                <Divider style={{ marginVertical: 8 }} />
                <View style={styles.requestDetails}>
                  <Text variant="bodyMedium">Units: {request.units}</Text>
                  <Text variant="bodyMedium" numberOfLines={2}>
                    <Icon name="map-marker" size={16} /> {request.location.address}
                  </Text>
                </View>
                <Button
                  mode="contained"
                  onPress={() => navigateToDonate(request.id)}
                  style={{ marginTop: 8 }}
                >
                  Donate Now
                </Button>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={navigateToCreateRequest}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  requestCard: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  requestDetails: {
    gap: 4,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#E53935',
  },
}); 