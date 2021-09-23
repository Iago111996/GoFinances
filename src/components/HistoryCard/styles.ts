import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px;
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};

  padding: 10px 24px;

  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.title};
`;