import React from 'react';
import { useNavigation } from '@react-navigation/native';
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
} from './style';

export function Menu() {
  const navigation = useNavigation();

  return (
    <Container>
        <Header>
            <UserWrapper>
                <MenuButton onPress={() => navigation.goBack()}>
                    <MenuIcon name="menu" />
                </MenuButton>
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
            <LogoutButton onPress={() => navigation.navigate('Login')}>
                <ButtonIcon name="logout" />
                <MenuButtonText>Sair</MenuButtonText>
            </LogoutButton>
        </MenuWrapper>
    </Container>
  );
}
