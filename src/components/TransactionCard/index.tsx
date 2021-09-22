import * as React from 'react';
import { categories } from '../../global/utils/categories';
import { 
  Container,
  Category,
  CategoryName,
  Title,
  Icon,
  Footer,
  Amount,
  DateTransaction,
 } from './styles';

export interface TransactionCardProps {
  name: string;
  amount: string;
  category: string;
  date: string;
  type: 'positive' | 'negative';
}

interface Props {
  data: TransactionCardProps;
}


export const TransactionCard = ({ data }: Props) => {
  const [ category ] = categories.filter(
    item => item.key === data.category
  );

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon 
            name={category.icon} 
          />

          <CategoryName>{category.name}</CategoryName>
        </Category>
        
        <DateTransaction>
          {data.date}
        </DateTransaction>
      </Footer>
    </Container>
  );
};
