import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Modal } from 'react-native';
import { 
  Container,
  Header,
  UserWrapper,
  AppName,
  Title,
  TitleC,
  MenuButton,
  MenuIcon,
  AvatarWrapper,
  AvatarBackground,
  AvatarIcon,
  Avatar,
  WelcomeText,
  MenuGrid,
  MenuButtonGrid,
  MenuIconGrid,
  MenuText,
  Overlay, 
  ModalContainer,
  Warning,  
  Message,
  ButtonContainer,
  CancelButton,
  CancelText,
  ConfirmButton,
  ConfirmText,
} from './style';

export function Home() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.navigate('Login');
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

      <AvatarWrapper>
        <AvatarBackground>
          <AvatarIcon name="person" />
          <Avatar/>
        </AvatarBackground>
        <WelcomeText>Bem-vindo, ********!</WelcomeText>
      </AvatarWrapper>

      <MenuGrid>
        <MenuButtonGrid onPress={() => navigation.navigate('Home')}>
          <MenuIconGrid name="home" />
          <MenuText>Home</MenuText>
        </MenuButtonGrid>

        <MenuButtonGrid onPress={() => navigation.navigate('Agendamentos')}>
          <MenuIconGrid name="calendar-today" />
          <MenuText>Agendamentos</MenuText>
        </MenuButtonGrid>

        <MenuButtonGrid onPress={() => navigation.navigate('Schedule')}>
          <MenuIconGrid name="access-time" />
          <MenuText>Horários</MenuText>
        </MenuButtonGrid>

        <MenuButtonGrid onPress={handleLogout}>
          <MenuIconGrid name="logout" />
          <MenuText>Sair</MenuText>
        </MenuButtonGrid>
      </MenuGrid>

      <CancelConfirmation 
        visible={modalVisible} 
        onCancel={handleCancel} 
        onConfirm={handleConfirm} 
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
          <Message>Realmente deseja Sair?</Message>
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
