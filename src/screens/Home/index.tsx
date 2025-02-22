import React from 'react';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();

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

        <MenuButtonGrid onPress={() => navigation.navigate('Login')}>
          <MenuIconGrid name="logout" />
          <MenuText>Sair</MenuText>
        </MenuButtonGrid>
      </MenuGrid>
    </Container>
  );
}
