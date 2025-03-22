export interface Location {
  latitude: number;
  longitude: number;
}

export interface BloodRequest {
  id: string;
  bloodType: string;
  unitsRequired: number;
  hospitalName: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'active' | 'completed' | 'cancelled';
  location: Location;
  requestedBy: string;
  requestedAt: Date;
  description?: string;
} 