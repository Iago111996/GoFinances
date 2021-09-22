import * as React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Icon,
  Title,
  Button
} from './styles';

interface TransactionTypeButtonProps extends RectButtonProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

export const TransactionTypeButton = ({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) => {
  return (
    <Container 
      isActive={isActive} 
      type={type} 
    >
      <Button {...rest}>
        <Icon name={icon[type]} type={type} />

        <Title>{ title }</Title>
      </Button>
    </Container>
  );
};
