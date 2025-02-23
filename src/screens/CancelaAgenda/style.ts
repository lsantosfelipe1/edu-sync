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

export const BackButton = styled.TouchableOpacity`
  margin-right: ${RFPercentage(1)}px;
`;

export const ArrowIcon = styled(MaterialIcons)`
  font-size: ${RFPercentage(4)}px;
  color: ${({ theme }) => theme.colors.secondary_light};
`;

export const FormContainer = styled.View`
  align-items: center;
  margin-top: ${RFPercentage(1)}px;
  background-color: ${({ theme }) => theme.colors.calendar_background};
  border-radius: ${RFPercentage(3)}px;
  width: 95%;
  height: ${RFPercentage(90)}px;
  align-self: center;
  padding: ${RFPercentage(3)}px;
`;

export const ThemeContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  width: 115%;
  margin-top: ${RFPercentage(2)}px;
  margin-bottom: ${RFPercentage(1)}px;
  height: ${RFPercentage(6)}px;
  padding-left: ${RFPercentage(11.5)}px;
  align-items: center;
`;

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.text_extra_light,
  editable: false,
}))`
  background-color: ${({ theme }) => theme.colors.background};
  width: 90%;
  height: ${RFPercentage(6)}px;
  padding: ${RFPercentage(2)}px;
  border-radius: ${RFPercentage(1)}px;
  margin-bottom: ${RFPercentage(3)}px; 
  font-size: ${RFPercentage(2)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_light};
`;

export const DateInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.text_extra_light,
  editable: false,
}))`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${RFPercentage(2)}px;
  width: 90%;
  border-radius: ${RFPercentage(1)}px;
  margin-bottom: ${RFPercentage(3)}px;
  font-size: ${RFPercentage(2)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text_light};
  text-align: center;
`;

export const TextArea = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.text_extra_light,
  multiline: true,
  editable: false,
}))`
  background-color: ${({ theme }) => theme.colors.background};
  width: 90%;
  padding: ${RFPercentage(2)}px;
  border-radius: ${RFPercentage(1)}px;
  min-height: ${RFPercentage(15)}px;
  margin-bottom: ${RFPercentage(3)}px; 
  font-size: ${RFPercentage(2)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_light};
  text-align-vertical: top;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.warning};
  width: 90%;
  height: ${RFPercentage(6)}px;
  padding: ${RFPercentage(2)}px;
  border-radius: ${RFPercentage(4)}px;
  align-items: center;
  position: absolute;
  bottom: ${RFPercentage(3)}px;
`;

export const SaveButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFPercentage(2)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Divider = styled.View`
  width: 115%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text_light};
  margin-bottom: ${RFPercentage(3)}px; 
`;

export const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.modal_container};
  padding: ${RFPercentage(2)}px;
  border-radius: ${RFPercentage(2)}px;
  align-items: center;
  width: ${RFPercentage(40)}px;
`;

export const Warning = styled.Text`
  font-size: ${RFPercentage(8)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Message = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFPercentage(2)}px;
  margin-vertical: ${RFPercentage(1)}px;
`;

export const WarnMessage = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFPercentage(1.5)}px;
  font-family: ${({ theme }) => theme.fonts.light_italic};
  margin-vertical: ${RFPercentage(1)}px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: ${RFPercentage(2)}px;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.cancel_button};
  padding: ${RFPercentage(2)}px;
  border-radius: ${RFPercentage(1)}px;
  margin-right: ${RFPercentage(1)}px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.warning};
  padding: ${RFPercentage(2)}px;
  border-radius: ${RFPercentage(1)}px;
`;

export const CancelText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: white;
  font-size: ${RFPercentage(2)}px;
`;

export const ConfirmText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: white;
  font-size: ${RFPercentage(2)}px;
`;
