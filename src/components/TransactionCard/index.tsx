import * as React from 'react';
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

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  title: string;
  amount: string;
  category: Category;
  date: string;
  type: 'positive' | 'negative';
}

interface Props {
  data: TransactionCardProps;
}


export const TransactionCard = ({ data }: Props) => {
  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon 
            name={data.category.icon} 
          />

          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        
        <DateTransaction>
          {data.date}
        </DateTransaction>
      </Footer>
    </Container>
  );
};
