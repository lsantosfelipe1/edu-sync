import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar, Platform } from 'react-native';

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(9)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  padding-top: ${statusBarHeight}px;
`;

export const UserWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

export const AppName = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin-left: ${RFPercentage(-4)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFPercentage(3.7)}px;
  color: ${({ theme }) => theme.colors.secondary_light};
`;

export const TitleC = styled.Text`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: ${RFPercentage(3.7)}px;
  color: ${({ theme }) => theme.colors.title_light};
`;

export const MenuButton = styled.TouchableOpacity``;

export const MenuIcon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.secondary_light};
  font-size: ${RFPercentage(5)}px;
`;

export const AvatarWrapper = styled.View`
  margin-top: ${RFPercentage(8)}px; 
  height: ${RFPercentage(37)}px;
  align-items: center;
  justify-content: center;
`;

export const AvatarBackground = styled.View`
  width: ${RFPercentage(20)}px;
  height: ${RFPercentage(20)}px;
  border-radius: ${RFPercentage(10)}px;
  background-color: ${({ theme }) => theme.colors.secondary_light};
  align-items: center;
  justify-content: center;
`;

export const AvatarIcon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFPercentage(15)}px;
`;

export const Avatar = styled.Image`
  width: ${RFPercentage(20)}px;
  height: ${RFPercentage(20)}px;
  border-radius: ${RFPercentage(7.5)}px;
  position: absolute;
`;

export const WelcomeText = styled.Text`
  margin-top: ${RFPercentage(4)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFPercentage(3.5)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const MenuGrid = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${RFPercentage(2)}px;
`;

export const MenuButtonGrid = styled.TouchableOpacity`
  width: ${RFPercentage(23)}px;
  height: ${RFPercentage(23)}px;
  background-color: ${({ theme }) => theme.colors.card_background};
  align-items: center;
  justify-content: center;
  margin: ${RFPercentage(0.2)}px;
  border-radius: ${RFPercentage(1)}px;
`;

export const MenuIconGrid = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFPercentage(6)}px;
`;

export const MenuText = styled.Text`
  margin-top: ${RFPercentage(1)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFPercentage(2)}px;
  color: ${({ theme }) => theme.colors.text};
`;
