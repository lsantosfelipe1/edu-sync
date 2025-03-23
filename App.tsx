import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import { 
  useFonts, 
  Aleo_400Regular,
  Aleo_300Light_Italic,
  Aleo_700Bold,
  Aleo_300Light
} from '@expo-google-fonts/aleo';
import { OleoScript_400Regular } from '@expo-google-fonts/oleo-script';
import theme from './src/global/styles/theme';
import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppointmentProvider } from './src/contexts/AppointmentContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Aleo_400Regular,
    Aleo_300Light_Italic,
    Aleo_700Bold,
    Aleo_300Light,
    OleoScript_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppointmentProvider>
          <StatusBar style="auto" />
          <Routes />
        </AppointmentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}