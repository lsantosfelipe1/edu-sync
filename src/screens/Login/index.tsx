import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { makeRedirectUri, useAuthRequest, exchangeCodeAsync } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  ButtonText,
} from './style';
import theme from '../../global/styles/theme';

type RootStackParamList = {
  Home: undefined;
};

const CALENDLY_CLIENT_SECRET = process.env.EXPO_CALENDLY_CLIENT_SECRET;
const CALENDLY_CLIENT_ID = process.env.EXPO_CALENDLY_CLIENT_ID;
const AUTHORIZATION_ENDPOINT = 'https://auth.calendly.com/oauth/authorize';
const TOKEN_ENDPOINT = 'https://auth.calendly.com/oauth/token';

export function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const redirectUri = makeRedirectUri({
    scheme: 'edusync',
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CALENDLY_CLIENT_ID!,
      scopes: ['default'],
      redirectUri,
      responseType: 'code',
      usePKCE: true,
    },
    { authorizationEndpoint: AUTHORIZATION_ENDPOINT }
  );

  useEffect(() => {
    const handleAuthResponse = async () => {
      if (response?.type === 'success' && response.params.code) {
        try {
          const tokenResponse = await exchangeCodeAsync(
            {
              code: response.params.code,
              clientId: CALENDLY_CLIENT_ID!,
              clientSecret: CALENDLY_CLIENT_SECRET!,
              redirectUri,
              extraParams: {
                grant_type: 'authorization_code',
                code_verifier: request?.codeVerifier || '',
              },
            },
            { tokenEndpoint: TOKEN_ENDPOINT }
          );

          await AsyncStorage.setItem('accessToken', tokenResponse.accessToken);
          navigation.navigate('Home');
        } catch (error) {
          console.error('Erro ao obter token:', error);
        }
      }
    };
    handleAuthResponse();
  }, [response]);

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
          <LoginButton onPress={() => promptAsync()}>
            <ButtonIcon source={require('../../assets/google.png')} />
            <ButtonText>Continue com Calendly</ButtonText>
          </LoginButton>
        </ButtonWrapper>
      </Container>
    </LinearGradient>
  );
}