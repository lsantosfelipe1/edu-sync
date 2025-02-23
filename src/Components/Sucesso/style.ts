import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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

export const Warning = styled.Text`
  font-size: ${RFPercentage(8)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${RFPercentage(2)}px;
`;

export const Message = styled.Text`
  font-size: ${RFPercentage(2.5)}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  margin-bottom: ${RFPercentage(3)}px;
`;