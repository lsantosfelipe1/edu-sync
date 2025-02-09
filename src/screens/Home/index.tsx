import React from 'react';
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
  MenuText
} from './style';

export function Home() {
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

      <AvatarWrapper>
        <AvatarBackground>
          <AvatarIcon name="person" />
          <Avatar/>
        </AvatarBackground>
        <WelcomeText>Bem-vindo, ********!</WelcomeText>
      </AvatarWrapper>

      <MenuGrid>
        <MenuButtonGrid>
          <MenuIconGrid name="home" />
          <MenuText>Home</MenuText>
        </MenuButtonGrid>

        <MenuButtonGrid>
          <MenuIconGrid name="calendar-today" />
          <MenuText>Agendamentos</MenuText>
        </MenuButtonGrid>

        <MenuButtonGrid>
          <MenuIconGrid name="access-time" />
          <MenuText>Horários</MenuText>
        </MenuButtonGrid>

        <MenuButtonGrid>
          <MenuIconGrid name="logout" />
          <MenuText>Sair</MenuText>
        </MenuButtonGrid>
      </MenuGrid>
    </Container>
  );
}
