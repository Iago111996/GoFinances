import * as React from 'react';
import { TextInputProps } from 'react-native';
import { Container } from './styles';

interface InputProps extends TextInputProps {}

export const Input = ({...rest}: InputProps) => {
  return (
    <Container {...rest} />
  );
};
