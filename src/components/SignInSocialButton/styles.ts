import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Container = styled(RectButton)`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.shape};

  margin-bottom: 16px;

  border-radius: 5px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ImageContainer = styled.View`
  width: 20%;

  padding: 16px;

  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.background};

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  flex: 1;

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};

  text-align: center;
`; 
