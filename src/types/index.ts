export type UserRole = 'donor' | 'recipient' | 'hospital';

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  bloodType?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  isAvailable?: boolean;
  lastDonationDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BloodRequest {
  id: string;
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

export interface Donation {
  id: string;
  requestId: string;
  donorId: string;
  recipientId: string;
  bloodType: string;
  units: number;
  donationDate: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  hospitalName: string;
  location: Location;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
} 