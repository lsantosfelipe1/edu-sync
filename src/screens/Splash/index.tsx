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
        <Icon name="school" />
      </IconWrapper>
      <TitleWrapper>
        <TitleEdu>Edu</TitleEdu>
        <TitleSync>Sync</TitleSync>
      </TitleWrapper>
    </Container>
  );
}
