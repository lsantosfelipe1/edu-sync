import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { 
  Container,
  Header,
  UserWrapper,
  AppName,
  Title,
  TitleC,
  MenuButton,
  MenuIcon,
  TitleScreen,
  Section,
  SectionTitle,
  AppointmentCard,
  ArrowIcon,
  AppointmentText,
  StatusIcon
} from './style';

const appointments = [
  { id: '1', name: 'Nome do compromisso, 14/07, 15:00h', status: 'completed' },
  { id: '2', name: 'Nome do compromisso, 14/07, 15:00h', status: 'completed' },
  { id: '3', name: 'Nome do compromisso, 14/07, 15:00h', status: 'completed' },
  { id: '4', name: 'Nome do compromisso, 14/07, 15:00h', status: 'completed' },
  { id: '5', name: 'Nome do compromisso, 14/07, 15:00h', status: 'scheduled' }
];

export function Agendamentos() {
  const navigation = useNavigation();
  
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

      <TitleScreen>Agendamentos</TitleScreen>

      <Section>
        <SectionTitle>Concluídos</SectionTitle>
        <FlatList
          data={appointments.filter(item => item.status === 'completed')}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AppointmentCard>
              <StatusIcon name="check-circle" />
              <AppointmentText>{item.name}</AppointmentText>
              <ArrowIcon name="chevron-right" onPress={() => navigation.navigate('ExcluiAgenda')} />
            </AppointmentCard>
          )}
        />
      </Section>

      <Section>
        <SectionTitle>Agendados</SectionTitle>
        <FlatList
          data={appointments.filter(item => item.status === 'scheduled')}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AppointmentCard>
              <StatusIcon name="calendar-today" />
              <AppointmentText>{item.name}</AppointmentText>
              <ArrowIcon name="chevron-right" onPress={() => navigation.navigate('CancelaAgenda')} />
            </AppointmentCard>
          )}
        />
      </Section>
    </Container>
  );
}
