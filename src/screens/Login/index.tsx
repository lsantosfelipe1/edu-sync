import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Container, 
  LogoWrapper, 
  Logo, 
  AppName, 
  Title, 
  TitleC, 
  WelcomeText, 
  Subtitle, 
  ButtonWrapper, 
  LoginButton, 
  ButtonIcon, 
  ButtonText 
} from './style';
import theme from '../../global/styles/theme';

export function Login() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[theme.colors.splash_background, theme.colors.secondary_light]}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Container>
        <LogoWrapper>
          <Logo source={require('../../assets/logo_app.png')} />
          <AppName>
            <Title>Edu</Title>
            <TitleC>Sync</TitleC>
          </AppName>
        </LogoWrapper>
        
        <WelcomeText>Bem vindo!</WelcomeText>
        <Subtitle>Faça login para continuar</Subtitle>
        
        <ButtonWrapper>
          <LoginButton onPress={() => navigation.navigate('Home')}>
            <ButtonIcon source={require('../../assets/google.png')} />
            <ButtonText>Continue com Google</ButtonText>
          </LoginButton>
          
          <LoginButton onPress={() => navigation.navigate('Home')}>
            <ButtonIcon source={require('../../assets/apple.png')} />
            <ButtonText>Continue com Apple ID</ButtonText>
          </LoginButton>
        </ButtonWrapper>
      </Container>
    </LinearGradient>
  );
}
