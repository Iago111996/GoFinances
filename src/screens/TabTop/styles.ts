import styled from 'styled-components/native';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.black};
`;

export const Content = styled.View`
    width: 100%;
    height: 100px;

    background-color: ${({ theme}) => theme.colors.primary};
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 24px;

    color: ${({ theme }) => theme.colors.black};
`;