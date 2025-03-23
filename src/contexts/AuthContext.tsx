import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../services/api';

type User = {
  uri: string;
  name: string;
  avatar_url: string;
  email: string;
}

type AuthContextData = {
  user: User | null;
  loading: boolean;
  signIn: (accessToken: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const userData = await getUserData(accessToken);
        setUser(userData.resource);
      }
      setLoading(false);
    };

    loadStorageData();
  }, []);

  const signIn = async (accessToken: string) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    const userData = await getUserData(accessToken);
    setUser(userData.resource);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
