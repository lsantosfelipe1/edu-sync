import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.splash_background};
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled.View`
  width: ${RFPercentage(20)}px;
  height: ${RFPercentage(20)}px;
  border-radius: ${RFPercentage(10)}px;
  background-color: ${({ theme }) => theme.colors.splash_icon};
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFPercentage(5)}px;
`;

export const Icon = styled.Image`
width: ${RFPercentage(15)}px;
height: ${RFPercentage(15)}px;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFPercentage(-3)}px;
`;

export const TitleEdu = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFPercentage(5)}px;
  color: ${({ theme }) => theme.colors.secondary_light};
`;

export const TitleSync = styled.Text`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: ${RFPercentage(5)}px;
  color: ${({ theme }) => theme.colors.title_light};
`;
