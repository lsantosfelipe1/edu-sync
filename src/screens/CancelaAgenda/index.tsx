import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { fetchAppointmentDetails } from '../../services/api';
import { fetchAppointments } from '../../services/api';
import { cancelAppointment } from '../../services/api';
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
  Overlay,
  ModalContainer,
  Warning,
  Message,
  WarnMessage,
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  CancelText,
  ConfirmText
} from './style';
import { ErrorOverlay } from '../../Components/Erro';
import { SuccessOverlay } from '../../Components/Sucesso';

type AppointmentDetails = {
  name: string;
  start_time: string;
  meeting_notes_plain: string | null;
  event_memberships: {
    user_name: string;
    user_email: string;
  }[];
};

export function CancelaAgenda() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CancelaAgenda'>>();
  const { appointmentId } = route.params;

  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

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
    const loadAppointmentDetails = async () => {
      try {
        const details: AppointmentDetails = await fetchAppointmentDetails(appointmentId);
      setAppointmentDetails(details);
      } catch (error) {
        console.error('Erro ao buscar detalhes do compromisso:', error);
      }
    };

    loadAppointmentDetails();
  }, [appointmentId]);

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = async () => {
    setModalVisible(false);
    setSuccessVisible(false);
    setErrorVisible(false);
  
    try {
      await cancelAppointment(appointmentId);
      setSuccessVisible(true);
      setTimeout(() => {
        setSuccessVisible(false);
        navigation.goBack();
      }, 3000);
    } catch (error) {
      console.error('Erro ao cancelar o agendamento:', error);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
    }
  };

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
        
        <SaveButton onPress={handleDelete}>
          <SaveButtonText>Cancelar Agendamento</SaveButtonText>
        </SaveButton>
      </FormContainer>

      <CancelConfirmation 
        visible={modalVisible} 
        onCancel={handleCancel} 
        onConfirm={handleConfirm} 
      />

      <SuccessOverlay 
        visible={successVisible} 
      />

      <ErrorOverlay 
        visible={errorVisible} 
      />
    </Container>
  );
}

const CancelConfirmation = ({ visible, onCancel, onConfirm }: { visible: boolean, onCancel: () => void, onConfirm: () => void }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <ModalContainer>
          <Warning>⚠</Warning>
          <Message>Realmente deseja cancelar?</Message>
          <WarnMessage>Esta ação será permanente!</WarnMessage>
          <ButtonContainer>
            <CancelButton onPress={onCancel}>
              <CancelText>Cancelar</CancelText>
            </CancelButton>
            <ConfirmButton onPress={onConfirm}>
              <ConfirmText>Sim</ConfirmText>
            </ConfirmButton>
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};