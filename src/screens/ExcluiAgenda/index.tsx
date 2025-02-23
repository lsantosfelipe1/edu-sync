import React, { useState } from 'react';
import { Modal } from 'react-native';
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
import { SuccessOverlay } from '../Sucesso';
import { ErrorOverlay } from '../Erro';

export function ExcluiAgenda() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    setModalVisible(false);
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
          <Input> Nome do Compromisso </Input>
        </ThemeContainer>
        <Divider />

        <Input>Nome</Input>
        
        <Input>Email</Input>
        
        <DateInput>09:00, Sexta-feira, 23 de julho</DateInput>
        
        <TextArea multiline>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id lorem pellentesque
           diam tincidunt sodales vitae et mauris. Vivamus lacus nunc, ultricies ut velit eu, dapibus tempus urna.
            Curabitur ultrices ligula arcu, vel convallis tellus pulvinar id. Praesent eget arcu lacus. Quisque 
            consectetur venenatis pellentesque. Etiam sagittis tortor mi, nec ultrices velit mattis nec. Proin mattis sollicitudin gravida. Quisque faucibus viverra dolor.</TextArea>
        
        <SaveButton onPress={handleDelete}>
          <SaveButtonText>Excluir</SaveButtonText>
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

const CancelConfirmation = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <ModalContainer>
          <Warning>⚠</Warning>
          <Message>Realmente deseja excluir?</Message>
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
