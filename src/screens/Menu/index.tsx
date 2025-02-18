import React from 'react';
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
  return (
    <Container>
        <Header>
            <UserWrapper>
                <MenuButton>
                    <MenuIcon name="menu" />
                </MenuButton>
                <AppName>
                    <Title>Edu</Title>
                    <TitleC>Sync</TitleC>
                </AppName>
            </UserWrapper>
        </Header>
        <MenuWrapper>
            <HomeButton>
                <ButtonIcon name="home" />
                <MenuButtonText>Início</MenuButtonText>
            </HomeButton>
            <CalendarButton>
                <ButtonIcon name="calendar-today" />
                <MenuButtonText>Agendamentos</MenuButtonText>
            </CalendarButton>
            <ScheduleButton>
                <ButtonIcon name="schedule" />
                <MenuButtonText>Horários</MenuButtonText>
            </ScheduleButton>
            <LogoutButton>
                <ButtonIcon name="logout" />
                <MenuButtonText>Sair</MenuButtonText>
            </LogoutButton>
        </MenuWrapper>
    </Container>
  );
}
