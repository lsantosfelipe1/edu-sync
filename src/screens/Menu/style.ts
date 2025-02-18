import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar, Platform } from 'react-native';

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.menu_background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(10)}px;
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

export const MenuWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const MenuButton = styled.TouchableOpacity``;

export const MenuIcon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFPercentage(5)}px;
`;

export const HomeButton = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${RFPercentage(24.5)}px;
  background-color: ${({ theme }) => theme.colors.highlight};
`;

export const CalendarButton = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${RFPercentage(24.5)}px;
  background-color: ${({ theme }) => theme.colors.menu_button_dark_blue};
`;

export const ScheduleButton = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${RFPercentage(24.5)}px;
  background-color: ${({ theme }) => theme.colors.menu_button_light_blue};
`;

export const LogoutButton = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${RFPercentage(24.5)}px;
  background-color: ${({ theme }) => theme.colors.menu_button_light};
`;

export const MenuButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFPercentage(3)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonIcon = styled(MaterialIcons)`
padding-bottom: ${RFPercentage(1)}px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFPercentage(5)}px;
`;