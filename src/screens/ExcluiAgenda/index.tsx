import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { fetchAppointmentDetails } from '../../services/api';
import { RootStackParamList } from '../../routes';
import { 
  Container, 
  Header, 
  UserWrapper,
  BackButton,
  ArrowIcon,
  AppName, 
  Title, 
  TitleC, 
  FormContainer, 
  ThemeContainer,
  Input, 
  DateInput, 
  TextArea, 
  SaveButton, 
  SaveButtonText,
  Divider,
} from './style';

type AppointmentDetails = {
  name: string;
  start_time: string;
  meeting_notes_plain: string | null;
  event_memberships: {
    user_name: string;
    user_email: string;
  }[];
};

export function ExcluiAgenda() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ExcluiAgenda'>>();
  const { appointmentId } = route.params;

  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', 
      day: '2-digit',
      month: 'long',
    };
  
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('pt-BR', options);
    const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
    return `${formattedTime}, ${formattedDate}`;
  };

  useEffect(() => {
    console.log('Route Params:', route.params);
    console.log('Appointment ID:', appointmentId);
    const loadAppointmentDetails = async () => {
      try {
        const details: AppointmentDetails = await fetchAppointmentDetails(appointmentId);
      setAppointmentDetails(details);
        console.log('Dados do compromisso:', details);
      } catch (error) {
        console.error('Erro ao buscar detalhes do compromisso:', error);
      }
    };

    loadAppointmentDetails();
  }, [appointmentId]);

  if (!appointmentDetails) {
    return (
      <Container>
        <Header>
          <UserWrapper>
            <BackButton onPress={() => navigation.goBack()}>
              <ArrowIcon name="chevron-left" />
            </BackButton>
            <AppName>
              <Title>Edu</Title>
              <TitleC>Sync</TitleC>
            </AppName>
          </UserWrapper>
        </Header>
        <FormContainer>
          <ThemeContainer>
            <Input>Carregando...</Input>
          </ThemeContainer>
        </FormContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <BackButton onPress={() => navigation.goBack()}>
            <ArrowIcon name="chevron-left" />
          </BackButton>
          <AppName>
            <Title>Edu</Title>
            <TitleC>Sync</TitleC>
          </AppName>
        </UserWrapper>
      </Header>
      
      <FormContainer>
        <ThemeContainer>
          <Input>{appointmentDetails.name || 'Sem nome'}</Input>
        </ThemeContainer>
        <Divider />

        <Input>{appointmentDetails.event_memberships[0]?.user_name || 'Sem convidado'}</Input>
        
        <Input>{appointmentDetails.event_memberships[0]?.user_email || 'Sem email'}</Input>
        
        <DateInput>{formatDate(appointmentDetails.start_time)}</DateInput>

        <TextArea multiline>{appointmentDetails.meeting_notes_plain || 'Sem notas'}</TextArea>
        
        <SaveButton onPress={() => navigation.goBack()}>
          <SaveButtonText>Voltar</SaveButtonText>
        </SaveButton>
      </FormContainer>

    </Container>
  );
}