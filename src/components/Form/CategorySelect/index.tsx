import * as React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { 
  Container,
  Category,
  Icon,
} from './styles';

interface CategorySelectProps extends RectButtonProps  {
  title: string;
}

export const CategorySelect = ({
  title,
  ...rest
}: CategorySelectProps) => {
  return (
    <Container 
    activeOpacity={.7}
    {...rest}>
      <Category>{ title }</Category>

      <Icon name="chevron-down" />
    </Container>
  );
};
