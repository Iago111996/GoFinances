import * as React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
  Container,
  Title
 } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export const Button = ({
  onPress,
  title,
  ...rest
}: ButtonProps) => {
  return (
    <Container 
      activeOpacity={0.7} 
      onPress={onPress} 
      {...rest}
    >
      <Title>{ title }</Title>
    </Container>
  );
};
