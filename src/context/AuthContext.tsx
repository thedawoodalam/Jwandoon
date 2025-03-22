import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock user data
const MOCK_USER = {
  uid: 'test-user-id',
  email: 'test@jwandoon.com',
};

const MOCK_USER_PROFILE = {
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@jwandoon.com',
  phoneNumber: '+1234567890',
  bloodType: 'O+',
  address: '123 Test St, Test City',
  emergencyContact: '+1987654321',
  bio: 'Regular blood donor',
  lastDonationDate: '2024-01-15',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

type User = {
  uid: string;
  email: string;
} | null;

type UserProfile = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  bloodType: string;
  address?: string;
  emergencyContact?: string;
  bio?: string;
  lastDonationDate?: string;
  createdAt: string;
  updatedAt: string;
} | null;

type AuthContextType = {
  user: User;
  userProfile: UserProfile;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial auth state check
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Mock successful sign in
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(MOCK_USER);
      setUserProfile(MOCK_USER_PROFILE);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Mock successful sign up
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(MOCK_USER);
      setUserProfile(MOCK_USER_PROFILE);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // Mock successful sign out
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      // Mock password reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 