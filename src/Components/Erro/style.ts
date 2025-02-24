import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

export const Overlay = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.overlay};
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  width: 80%;
  background-color: ${({ theme }) => theme.colors.modal_container};
  padding: ${RFPercentage(2)}px;
  border-radius: ${RFPercentage(2)}px;
  align-items: center;
`;

export const Warning = styled.View`
  width: ${RFPercentage(10)}px;
  height: ${RFPercentage(10)}px;
  margin-bottom: ${RFPercentage(2)}px;
`;

export const Message = styled.Text`
  font-size: ${RFPercentage(2.5)}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  text-align: center;
  margin-bottom: ${RFPercentage(3)}px;
`;