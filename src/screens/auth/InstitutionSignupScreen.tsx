import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import * as DocumentPicker from "expo-document-picker";

export default function InstitutionSignupScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      setDocument(result);
    }
  };

  const handleSignup = async () => {
    if (!name || !address || !regNumber || !contactPerson || !contactNumber || !document) {
      Alert.alert("Error", "Please fill all fields and upload a document.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "institutions"), {
        name,
        address,
        regNumber,
        contactPerson,
        contactNumber,
        documentUrl: document.uri,
        status: "pending", // Needs admin approval
        createdAt: new Date(),
      });

      Alert.alert("Success", "Registration submitted. Await admin approval.");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "Failed to submit registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>Institution Signup</Text>

          <TextInput label="Institution Name" value={name} onChangeText={setName} style={styles.input} mode="outlined" />
          <TextInput label="Address" value={address} onChangeText={setAddress} style={styles.input} mode="outlined" />
          <TextInput label="Registration Number" value={regNumber} onChangeText={setRegNumber} style={styles.input} mode="outlined" />
          <TextInput label="Contact Person" value={contactPerson} onChangeText={setContactPerson} style={styles.input} mode="outlined" />
          <TextInput label="Contact Number" value={contactNumber} onChangeText={setContactNumber} keyboardType="phone-pad" style={styles.input} mode="outlined" />

          <Button mode="outlined" onPress={pickDocument} style={styles.button}>Upload Verification Document</Button>
          {document && <Text>Uploaded: {document.name}</Text>}

          <Button mode="contained" onPress={handleSignup} loading={loading} disabled={loading} style={styles.button}>Submit for Approval</Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  card: { margin: 16 },
  title: { color: "#E53935", marginBottom: 16 },
  input: { marginBottom: 16 },
  button: { marginTop: 10 },
});
