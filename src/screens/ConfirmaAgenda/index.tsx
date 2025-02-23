import React from 'react';
import { useNavigation } from '@react-navigation/native';
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
  Divider
} from './style';

export function ConfirmaAgenda() {
  const navigation = useNavigation();

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
        
        <DateInput>09:00, Sexta-feira, 23 de julho</DateInput>
        
        <TextArea placeholder="Observações: " multiline />
        
        <SaveButton>
          <SaveButtonText>Salvar Agendamento</SaveButtonText>
        </SaveButton>
      </FormContainer>
    </Container>
  );
}
