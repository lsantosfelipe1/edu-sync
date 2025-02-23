import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { ptBR } from '../../utils/localeCalendarConfig';
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
  calendarTheme
} from './style';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export function Schedule() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const horarios = [
    '08:00', '09:00', '10:00',
    '13:30', '15:00', '16:00',
    '17:00', '18:30', '20:00'
  ];

  const handleSchedulePress = (hora) => {
    navigation.navigate('ConfirmaAgenda', { date: selectedDate, time: hora });
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
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: theme.colors.menu_button_dark_blue
              }
            }}
            theme={calendarTheme(theme)}
          />
        </CalendarContainer>

        <ScheduleContainer>
          <ScheduleTitle>
            {selectedDate ? 
              `${capitalizeFirstLetter(
                new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long'   
                })
              )}` 
              : 'Selecione uma data'}
          </ScheduleTitle>
          <ScheduleGrid>
            {horarios.map((hora, index) => (
              <ScheduleButton key={index} onPress={() => handleSchedulePress(hora)}>
                <ScheduleButtonText>{hora}</ScheduleButtonText>
              </ScheduleButton>
            ))}
          </ScheduleGrid>
        </ScheduleContainer>
      </ScrollView>
    </Container>
  );
}