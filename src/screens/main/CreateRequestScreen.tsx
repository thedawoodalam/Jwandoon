import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, TextInput, Button, Card, HelperText, SegmentedButtons } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/authContext";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { db, saveUserToFirestore } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const CreateRequestScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [patientName, setPatientName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("normal");
  const [hospitalName, setHospitalName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [region, setRegion] = useState({
    latitude: 37.7749, // Default to San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Get user location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to select a blood request location.");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setLocation({ latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude });
    })();
  }, []);

  const handleMapPress = (event: any) => {
    setLocation(event.nativeEvent.coordinate);
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    card: {
      marginVertical: 8,
    },
    title: {
      marginBottom: 16,
    },
    map: {
      height: 200,
      marginVertical: 16,
    },
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (!patientName || !bloodType || !units || !hospitalName || !address || !contactNumber || !location) {
        setError("Please fill in all required fields and select a location.");
        return;
      }

      // Save user to Firestore (Ensures only new users are stored)
      await saveUserToFirestore(user);

      // Store blood request in Firestore
      await addDoc(collection(db, "bloodRequests"), {
        patientName,
        bloodType,
        units: parseInt(units),
        urgencyLevel,
        hospitalName,
        location: {
          address,
          latitude: location.latitude,
          longitude: location.longitude,
        },
        contactNumber,
        additionalNotes,
        userId: user?.uid, // Store user ID with the request
        createdAt: new Date(),
      });

      Alert.alert("Success", "Blood request submitted successfully!");
      navigation.goBack();
    } catch (error: any) {
      console.error("Request submission error:", error);
      setError(error.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>Create Blood Request</Text>
          <MapView style={styles.map} region={region} onPress={handleMapPress}>
            {location && <Marker coordinate={location} />}
          </MapView>
          <Button mode="contained" onPress={handleSubmit} loading={loading} disabled={loading}>Submit Request</Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};
