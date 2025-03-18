import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { Splash } from '../screens/Splash';
import { Menu } from '../screens/Menu';
import { Schedule } from '../screens/Schedule';
import { Agendamentos } from '../screens/Agendamentos';
import { Login } from '../screens/Login';
import { ConfirmaAgenda } from '../screens/ConfirmaAgenda';
import { CancelaAgenda } from '../screens/CancelaAgenda';
import { ExcluiAgenda } from '../screens/ExcluiAgenda';

const Stack = createStackNavigator<RootStackParamList>();

export function Routes() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
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
  );
}

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Home: undefined;
    Menu: undefined;
    Schedule: undefined;
    Agendamentos: undefined;
    CancelaAgenda: { appointmentId: string };
    ExcluiAgenda: { appointmentId: string };
    ConfirmaAgenda: { appointmentId: string };
  };
