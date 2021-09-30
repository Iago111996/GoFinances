import * as React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import {
  Container,
  ImageContainer,
  Title,
} from './styles';

interface SignInSocialButton extends RectButtonProps{
  title: string;
  svg: React.FC<SvgProps>
}

export const SignInSocialButton = ({
  title,
  svg: Svg,
  ...rest
}:  SignInSocialButton) => {
  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Title>{title}</Title>
    </Container>
  );
};

