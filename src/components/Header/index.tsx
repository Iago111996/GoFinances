import * as React from 'react';
import { 
  Container,
   Title
   } from './styles';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <Container>
      <Title>{ title }</Title>
    </Container>
  );
};
