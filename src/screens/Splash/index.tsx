import React from 'react';
import { 
    Container, 
    IconWrapper, 
    Icon, 
    TitleWrapper, 
    TitleEdu, 
    TitleSync 
} from './style';

export function Splash() {
  return (
    <Container>
      <IconWrapper>
        <Icon source={require('../../assets/logo_app.png')} />
      </IconWrapper>
      <TitleWrapper>
        <TitleEdu>Edu</TitleEdu>
        <TitleSync>Sync</TitleSync>
      </TitleWrapper>
    </Container>
  );
}
