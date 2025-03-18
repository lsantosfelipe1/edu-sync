import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ptBR } from '../../utils/localeCalendarConfig';
import { fetchCalendly } from '../../services/api';
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
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        // Busca os eventos do Calendly
        const events = await fetchCalendly();

        // Marca as datas no calendário
        const marked = events.reduce((acc: any, event: any) => {
          const date = event.start_time.split('T')[0]; // Extrai a data do evento
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

  const handleSchedulePress = (hora: string) => {
    navigation.navigate('ConfirmaAgenda', { date: selectedDate, time: hora });
  };

  const handleDayPress = async (day: { dateString: string }) => {
    setSelectedDate(day.dateString);

    try {
      // Busca os horários disponíveis para a data selecionada
      const availability = await fetchCalendly();

      // Filtra os horários disponíveis para a data selecionada
      const availableTimes = availability
        .filter((slot: any) => slot.start_time.startsWith(day.dateString)) // Filtra por data selecionada
        .map((slot: any) => {
          const startTime = new Date(slot.start_time);
          return startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Formata a hora
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
    </Container>
  );
}