import React, { useState, useEffect, useCallback  } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { ActivityIndicator } from 'react-native';

import { 
  Container,
  Header,
  UserInfo,
  User,
  Photo,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,
 } from './styles';

 import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { useTheme } from 'styled-components';



export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightDataProps {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightDataProps>({} as HighlightDataProps);

  const theme = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lasTransaction = new Date(Math.max.apply(Math,  collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())))
    
      return `${lasTransaction.getDate()} de ${lasTransaction.toLocaleString('pt-BR', {month: 'long'})}`;
  }

  async function loadTransactions() {
    const dataKey = '@gofinances:transaction';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;
    
    const transactionFormatted: DataListProps[] = transactions
    .map((item: DataListProps) => {

      if(item.type === 'positive') entriesTotal += Number(item.amount);
      if(item.type === 'negative') expensiveTotal += Number(item.amount);
      
      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const date = new Date().toLocaleDateString('pt-BR');

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }

    });

    setData(transactionFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensive = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 à ${lastTransactionExpensive}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
     entries: {
      amount: entriesTotal.toLocaleString('pt-BR',{
        style: 'currency',
        currency: 'BRL',
      }),
      lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
     },
     expensive: {
      amount: expensiveTotal.toLocaleString('pt-BR',{
        style: 'currency',
        currency: 'BRL',
      }),
      lastTransaction: `Última saída dia ${lastTransactionExpensive}`,
     },
     total: {
      amount: total.toLocaleString('pt-BR',{
        style: 'currency',
        currency: 'BRL',
      }),
      lastTransaction: totalInterval,
     }
    });

    setIsLoading(false);
    
  }

  useEffect(() => {
    loadTransactions();
  },[]);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  },[]));

  return (
    <Container>
      {
        isLoading ? 
           <LoadContainer>
              <ActivityIndicator
                color={theme.colors.primary}
                size="large"
              />
           </LoadContainer> :
        <>
        <ActivityIndicator />
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{uri: 'https://github.com/Iago111996.png'}}/>

              <User>
                <UserGreeting>Olá,</UserGreeting>
                <UserName>Iago</UserName>
              </User>
            </UserInfo>

            <LogoutButton onPress={() => {}}>
              <Icon name="power" />
            </LogoutButton>
          </UserWrapper>
        </Header>

        <HighlightCards>
          <HighlightCard
            type="up"
            title="Entradas"
            amount={highlightData.entries.amount}
            lastTransaction={highlightData.entries.lastTransaction}
          />
          <HighlightCard 
            type="down"
            title="Saídas"
            amount={highlightData.expensive.amount}
            lastTransaction={highlightData.expensive.lastTransaction}
          />
          <HighlightCard 
            type="total"
            title="Total"
            amount={highlightData.total.amount}
            lastTransaction={highlightData.total.lastTransaction}
          />
        </HighlightCards>

        <Transactions>
          <Title>Listagem</Title>

          <TransactionsList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <TransactionCard data={item}/>}
            contentContainerStyle={{
              paddingBottom: getBottomSpace()            
            }}
          />
        </Transactions>
        </>
      }
    </Container>
  );
};

