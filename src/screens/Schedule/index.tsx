import React, { useState, useEffect, useContext } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ptBR } from '../../utils/localeCalendarConfig';
import { fetchCalendly, fetchAppointments} from '../../services/api';
import { ErrorOverlay } from '../../Components/Erro';
import { SuccessOverlay } from '../../Components/Sucesso';
import { createAppointment } from '../../services/api';
import { Linking } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

import {
  Container,
  Header,
  UserWrapper,
  AppName,
  Title,
  TitleC,
  MenuButton,
  MenuIcon,
  CalendarContainer,
  ScheduleContainer,
  ScheduleTitle,
  ScheduleGrid,
  ScheduleButton,
  ScheduleButtonText,
  TitleScreen,
  calendarTheme,
} from './style';

type RootStackParamList = {
  ConfirmaAgenda: { date: string; time: string };
  Menu: undefined;
};

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export function Schedule() {
  const theme = useTheme();
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const events = await fetchCalendly();

        const marked = events.reduce((acc: any, event: any) => {
          const date = event.start_time.split('T')[0];
          if (!acc[date]) {
            acc[date] = { marked: true, selectedColor: theme.colors.menu_button_dark_blue };
          }
          return acc;
        }, {});

        setAppointments(events);
        setMarkedDates(marked);
      } catch (error) {
        console.error('Erro ao carregar os agendamentos:', error);
      }
    };

    loadAppointments();
  }, [theme.colors.menu_button_dark_blue]);

  
  const handleSchedulePress = async (hora: string) => {
    try {
      const email = user?.email;
      if (!email) 
        throw new Error('Email do usuário não está disponível.');
      const { scheduled } = await fetchAppointments();
      if (scheduled.length > 0) {
        setErrorVisible(true);
        setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
        return
      }

      const bookingLink = await createAppointment(email);
  
      if (!bookingLink || typeof bookingLink !== 'string') {
        throw new Error('Link de agendamento inválido.');
      }
      setSuccessVisible(true);
      setTimeout(() => {
        setSuccessVisible(false);
        navigation.goBack();
      }, 3000);
      Linking.openURL(bookingLink);
    } catch (error) {
      console.error('Erro ao gerar o link de agendamento:', error);
      setErrorVisible(true);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
    }
  };

  const handleDayPress = async (day: { dateString: string }) => {
    setSelectedDate(day.dateString);

    setMarkedDates((prevMarkedDates: any) => {
      const updatedMarkedDates = Object.keys(prevMarkedDates).reduce((acc: any, date) => {
        acc[date] = { ...prevMarkedDates[date], selected: false };
        return acc;
      }, {});
  
      return {
        ...updatedMarkedDates,
        [day.dateString]: {
          ...(prevMarkedDates[day.dateString] || {}),
          selected: true,
          selectedColor: theme.colors.secondary_light,
        },
      };
    });

    try {
      const availability = await fetchCalendly();

      const availableTimes = availability
        .filter((slot: any) => slot.start_time.startsWith(day.dateString))
        .map((slot: any) => {
          const startTime = new Date(slot.start_time);
          return startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); 
        });

      setAvailableTimes(availableTimes);
    } catch (error) {
      console.error('Erro ao buscar os horários disponíveis:', error);
    }
  };

  return (
    <Container>
      <Header>
        <UserWrapper>
          <MenuButton onPress={() => navigation.navigate('Menu')}>
            <MenuIcon name="menu" />
          </MenuButton>
          <AppName>
            <Title>Edu</Title>
            <TitleC>Sync</TitleC>
          </AppName>
        </UserWrapper>
      </Header>

      <TitleScreen>Horários</TitleScreen>

      <ScrollView showsVerticalScrollIndicator={false}>
        <CalendarContainer>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            theme={calendarTheme(theme)}
          />
        </CalendarContainer>

        <ScheduleContainer>
          <ScheduleTitle>
            {selectedDate
              ? `${capitalizeFirstLetter(
                  new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })
                )}`
              : 'Selecione uma data'}
          </ScheduleTitle>
          <ScheduleGrid>
            {availableTimes.length > 0 ? (
              availableTimes.map((hora, index) => (
                <ScheduleButton key={index} onPress={() => handleSchedulePress(hora)}>
                  <ScheduleButtonText>{hora}</ScheduleButtonText>
                </ScheduleButton>
              ))
            ) : (
              <ScheduleButton noAvailability={true}>
                <ScheduleButtonText>Sem horários disponíveis</ScheduleButtonText>
              </ScheduleButton>
            )}
          </ScheduleGrid>
        </ScheduleContainer>
      </ScrollView>
      
      <SuccessOverlay 
        visible={successVisible} 
      />

      <ErrorOverlay 
        visible={errorVisible} 
      />

    </Container>
  );
}