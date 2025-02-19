import React from 'react';
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
  AppointmentText,
  StatusIcon
} from './style';

const appointments = [
  { id: '1', name: 'Nome do compromisso, 14/07, 15:00h', status: 'completed' },
  { id: '2', name: 'Nome do compromisso, 14/07, 15:00h', status: 'completed' },
  { id: '3', name: 'Nome do compromisso, 14/07, 15:00h', status: 'completed' },
  { id: '4', name: 'Nome do compromisso, 14/07, 15:00h', status: 'scheduled' }
];

export function Agendamentos() {
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

      <Section>
        <SectionTitle>Concluídos</SectionTitle>
        <FlatList
          data={appointments.filter(item => item.status === 'completed')}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AppointmentCard>
              <StatusIcon name="check-circle" />
              <AppointmentText>{item.name}</AppointmentText>
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
              <StatusIcon name="schedule" />
              <AppointmentText>{item.name}</AppointmentText>
            </AppointmentCard>
          )}
        />
      </Section>
    </Container>
  );
}
