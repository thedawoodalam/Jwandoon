import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, StyleSheet } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { db } from "../../config/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { map } from "zod";

type Institution = {
  id: string;
  name: string;
  regNumber: string;
  contactPerson: string;
  contactNumber: string;
  status: string;
};

const AdminInstitutionApprovalScreen = () => {
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    card: { marginBottom: 10 },
    button: { marginTop: 5 },
  });
  
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "institutions"));
      const pendingInstitutions = querySnapshot.docs
        .map(doc => ({ ...(doc.data() as Institution), id: doc.id }))
        .filter(item => item.status === "pending");
      setInstitutions(pendingInstitutions);
      setLoading(false);
    };
    
    fetchInstitutions();
  }, []);

  const handleApproval = async (id: string, status: string) => {
    await updateDoc(doc(db, "institutions", id), { status });
    setInstitutions(prev => prev.filter(item => item.id !== id));
    Alert.alert("Success", `Institution ${status}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={institutions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="headlineSmall">{item.name}</Text>
              <Text>Registration: {item.regNumber}</Text>
              <Text>Contact: {item.contactPerson} ({item.contactNumber})</Text>
              <Button mode="contained" onPress={() => handleApproval(item.id, "approved")} style={styles.button}>Approve</Button>
              <Button mode="outlined" onPress={() => handleApproval(item.id, "rejected")} style={styles.button}>Reject</Button>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { marginBottom: 10 },
  button: { marginTop: 5 },
});

export default AdminInstitutionApprovalScreen;
