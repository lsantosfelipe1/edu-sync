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

export const TitleScreen = styled.Text`
  margin-top: ${RFPercentage(1)}px;
  font-size: ${RFPercentage(3)}px;
  color: ${({ theme }) => theme.colors.secondary_light};
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
`;

export const Section = styled.View`
  margin-top: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #555;
`;

export const AppointmentCard = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #dde7fa;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const StatusIcon = styled(MaterialIcons)`
  font-size: 24px;
  color: #4caf50;
  margin-right: 10px;
`;

export const AppointmentText = styled.Text`
  font-size: 16px;
  color: #333;
`;
