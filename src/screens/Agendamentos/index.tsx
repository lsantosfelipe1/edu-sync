import React, { useContext } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { RootStackParamList } from '../../routes';
import { AppointmentContext } from '../../contexts/AppointmentContext';
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
  StatusIcon,
} from './style';

export function Agendamentos() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { completedAppointments, scheduledAppointments, loading } = useContext(AppointmentContext);

  const handleNavigate = (screen: keyof RootStackParamList, params?: any) => {
    navigation.navigate(screen, params);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('pt-BR', options);
    const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return `${formattedDate}, ${formattedTime}h`;
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <UserWrapper>
            <MenuButton onPress={() => handleNavigate('Menu')}>
              <MenuIcon name="menu" />
            </MenuButton>
            <AppName>
              <Title>Edu</Title>
              <TitleC>Sync</TitleC>
            </AppName>
          </UserWrapper>
        </Header>
        <TitleScreen>Carregando agendamentos...</TitleScreen>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <MenuButton onPress={() => handleNavigate('Menu')}>
            <MenuIcon name="menu" />
          </MenuButton>
          <AppName>
            <Title>Edu</Title>
            <TitleC>Sync</TitleC>
          </AppName>
        </UserWrapper>
      </Header>

      <TitleScreen>Agendamentos</TitleScreen>

      <Section style={{ flex: 1 }}>
        <SectionTitle>Concluídos</SectionTitle>
        <FlatList
          data={completedAppointments}
          keyExtractor={item => item.uri}
          ListEmptyComponent={<AppointmentText>Nenhum agendamento concluído.</AppointmentText>}
          renderItem={({ item }) => (
            <AppointmentCard>
              <StatusIcon name="check-circle" />
              <AppointmentText>{item.name}, {formatDate(item.start_time)}</AppointmentText>
              <ArrowIcon
                name="chevron-right"
                onPress={() => {
                  const uuid = item.uri.split("/").pop();
                  handleNavigate('ExcluiAgenda', { appointmentId: uuid });
                }}
              />
            </AppointmentCard>
          )}
        />
      </Section>

      <Section style={{ flex: 1 }}>
        <SectionTitle>Agendados</SectionTitle>
        <FlatList
          data={scheduledAppointments}
          keyExtractor={item => item.uri}
          ListEmptyComponent={<AppointmentText>Nenhum agendamento futuro.</AppointmentText>}
          renderItem={({ item }) => (
            <AppointmentCard>
              <StatusIcon name="calendar-today" />
              <AppointmentText>{item.name}, {formatDate(item.start_time)}</AppointmentText>
              <ArrowIcon
                name="chevron-right"
                onPress={() => {
                  const uuid = item.uri.split("/").pop();
                  handleNavigate('CancelaAgenda', { appointmentId: uuid });
                }}
              />
            </AppointmentCard>
          )}
        />
      </Section>
    </Container>
  );
}