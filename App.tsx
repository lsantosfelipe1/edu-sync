import React, { useState, useEffect } from 'react';
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

import { Home } from './src/screens/Home';
import { Splash } from './src/screens/Splash';
import { Menu } from './src/screens/Menu';
import theme from './src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Aleo_400Regular,
    Aleo_300Light_Italic,
    Aleo_700Bold,
    Aleo_300Light,
    OleoScript_400Regular
  });

  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      {isSplashVisible ? <Splash /> : <Menu />}
    </ThemeProvider>
  );
}