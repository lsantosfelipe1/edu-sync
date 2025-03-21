import React, { useState, useContext } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';
import { 
    Container,
    Header,
    UserWrapper,
    AppName,
    Title,
    TitleC,
    MenuIcon,
    MenuWrapper,
    MenuButtonText,
    MenuButton,
    ButtonIcon,
    HomeButton,
    CalendarButton,
    ScheduleButton,
    LogoutButton,
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
import { Modal } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  Agendamentos: undefined;
  Schedule: undefined;
  Login: undefined;
};

export function Menu() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { signOut } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = async () => {
    setModalVisible(false);
    await signOut();
    navigation.navigate('Login');
  };

  return (
    <Container>
        <Header>
            <UserWrapper>
                <AppName>
                    <Title>Edu</Title>
                    <TitleC>Sync</TitleC>
                </AppName>
            </UserWrapper>
        </Header>
        <MenuWrapper>
            <HomeButton onPress={() => navigation.navigate('Home')}>
                <ButtonIcon name="home" />
                <MenuButtonText>Início</MenuButtonText>
            </HomeButton>
            <CalendarButton onPress={() => navigation.navigate('Agendamentos')}>
                <ButtonIcon name="calendar-today" />
                <MenuButtonText>Agendamentos</MenuButtonText>
            </CalendarButton>
            <ScheduleButton onPress={() => navigation.navigate('Schedule')}>
                <ButtonIcon name="schedule" />
                <MenuButtonText>Horários</MenuButtonText>
            </ScheduleButton>
            <LogoutButton onPress={handleLogout}>
                <ButtonIcon name="logout" />
                <MenuButtonText>Sair</MenuButtonText>
            </LogoutButton>
        </MenuWrapper>

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
