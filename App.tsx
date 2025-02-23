import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
import { Schedule } from './src/screens/Schedule';
import { Agendamentos } from './src/screens/Agendamentos';
import { Login } from './src/screens/Login';
import { ConfirmaAgenda } from './src/screens/ConfirmaAgenda';
import { CancelaAgenda } from './src/screens/CancelaAgenda';
import { ExcluiAgenda } from './src/screens/ExcluiAgenda';
import theme from './src/global/styles/theme';

const Stack = createStackNavigator();

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isSplashVisible ? (
            <Stack.Screen name="Splash" component={Splash} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Menu" component={Menu} />
              <Stack.Screen name="Schedule" component={Schedule} />
              <Stack.Screen name="Agendamentos" component={Agendamentos} />
              <Stack.Screen name="CancelaAgenda" component={CancelaAgenda} />
              <Stack.Screen name="ExcluiAgenda" component={ExcluiAgenda} />
              <Stack.Screen name="ConfirmaAgenda" component={ConfirmaAgenda} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}