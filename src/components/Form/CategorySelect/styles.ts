import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  width: 100%;
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 5px;

  padding: 20px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;

  color: ${({ theme }) => theme.colors.text};
`;