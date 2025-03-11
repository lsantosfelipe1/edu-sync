import React, { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../../services/api';
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

type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  Agendamentos: undefined;
  Schedule: undefined;
  Login: undefined;
};

export function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const userData = await getUserData(accessToken);
          setUserName(userData.name);
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigation.navigate('Login');
      }
    };

    fetchUserName();
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
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
        <WelcomeText>Bem-vindo, {userName}!</WelcomeText>
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

const CancelConfirmation = ({ visible, onCancel, onConfirm }: { visible: boolean, onCancel: () => void, onConfirm: () => void }) => {
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