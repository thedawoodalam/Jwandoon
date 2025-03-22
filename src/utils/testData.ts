import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getFirebaseDB } from '../config/firebase';

export interface TestBloodRequest {
  userId: string;
  patientName: string;
  bloodType: string;
  units: number;
  urgencyLevel: 'normal' | 'urgent' | 'emergency';
  hospitalName: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  contactNumber: string;
  additionalNotes?: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

const sampleBloodRequests: TestBloodRequest[] = [
  {
    userId: '',  // Will be set to the test user's ID
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
    updatedAt: new Date().toISOString()
  },
  {
    userId: '',  // Will be set to the test user's ID
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
    updatedAt: new Date().toISOString()
  },
  {
    userId: '',  // Will be set to the test user's ID
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
    updatedAt: new Date().toISOString()
  }
];

export const initializeTestData = async (userId: string) => {
  const db = getFirebaseDB();
  
  // Check if test data already exists for this user
  const existingRequests = await getDocs(
    query(collection(db, 'blood_requests'), where('userId', '==', userId))
  );
  
  if (existingRequests.empty) {
    // Add test blood requests
    for (const request of sampleBloodRequests) {
      request.userId = userId;
      await addDoc(collection(db, 'blood_requests'), request);
    }
    console.log('Test data initialized successfully');
  } else {
    console.log('Test data already exists for this user');
  }
}; 