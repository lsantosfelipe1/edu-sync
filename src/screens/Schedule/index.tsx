import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components';
import { Calendar, LocaleConfig } from 'react-native-calendars';
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
  const [selectedDate, setSelectedDate] = useState('');

  const horarios = [
    '08:00', '09:00', '10:00',
    '13:30', '15:00', '16:00',
    '17:00', '18:30', '20:00'
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <MenuButton>
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
        
        </CalendarContainer>

        <ScheduleContainer>
        </ScheduleContainer>
      </ScrollView>
    </Container>
  );
}