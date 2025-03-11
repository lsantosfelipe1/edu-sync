import styled from 'styled-components/native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const LogoWrapper = styled.View`
  position: absolute;
  top: ${RFPercentage(10)}px;
  width: 70%;
  align-items: center;
  flex-direction: row;
`;

export const Logo = styled.Image`
  width: ${RFPercentage(8)}px;
  height: ${RFPercentage(8)}px;
  margin-bottom: 10px;
`;

export const AppName = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFPercentage(5)}px;
  color: ${({ theme }) => theme.colors.secondary_light};
`;

export const TitleC = styled.Text`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: ${RFPercentage(5)}px;
  color: ${({ theme }) => theme.colors.title_light};
`;

export const WelcomeText = styled.Text`
  font-size: ${RFPercentage(6)}px;
  font-family: ${({ theme }) => theme.fonts.cursive};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${RFPercentage(10)}px;
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFPercentage(2.5)}px;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${RFPercentage(10)}px;
`;

export const ButtonWrapper = styled.View`
  align-items: center;
  position: absolute;
  bottom: ${RFPercentage(15)}px;
  width: 100%;
`;

export const LoginButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${RFPercentage(2)}px;
  border-radius: ${RFPercentage(2)}px;
  width: ${RFPercentage(33)}px;
  margin-bottom: ${RFPercentage(2)}px;
`;

export const ButtonIcon = styled.Image`
  width: ${RFPercentage(3)}px;
  height: ${RFPercentage(3)}px;
`;

export const ButtonText = styled.Text`
  margin-left: ${RFPercentage(3)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFPercentage(2)}px;
  color: ${({ theme }) => theme.colors.secondary};
`;
