import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
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
import { SuccessOverlay } from '../../Components/Sucesso';
import { ErrorOverlay } from '../../Components/Erro';

const formatDate = (dateString: string, timeString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  };

  const date = new Date(`${dateString}T${timeString}`);
  const formattedDate = date.toLocaleDateString('pt-BR', options);
  const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return `${formattedTime}, ${formattedDate}`;
};

export function ConfirmaAgenda() {
  const navigation = useNavigation();
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const route = useRoute();
  const { date, time } = route.params as { date: string; time: string };

  const handleSave = () => {
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      setSuccessVisible(true);
      setTimeout(() => {
        setSuccessVisible(false);
        navigation.goBack();
      }, 3000);
    } else {
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
    }
  };

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
          <Input placeholder="Tema do Compromisso "/>
        </ThemeContainer>
        <Divider />

        <Input placeholder="Nome: " />
        
        <Input placeholder="Email: " keyboardType="email-address" />
        
        <DateInput>{formatDate(date, time)}</DateInput>
        
        <TextArea placeholder="Observações: " multiline />
        
        <SaveButton onPress={handleSave}>
          <SaveButtonText>Salvar Agendamento</SaveButtonText>
        </SaveButton>
      </FormContainer>

      <SuccessOverlay 
        visible={successVisible} 
      />

      <ErrorOverlay 
        visible={errorVisible} 
      />
    </Container>
  );
}
