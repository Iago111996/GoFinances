import React,{useState,useEffect,useCallback}  from 'react';
import { FlatList, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { 
  addMonths, 
  subMonths,
  format,
 } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';

import { 
  Container,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer
} from './styles';

import { Header } from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../global/utils/categories';

interface ResumeProps {}

interface TransactionProps {
  name: string;
  amount: string;
  category: string;
  date: string;
  type: 'positive' | 'negative';
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export const Resume = ({}: ResumeProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();

  const handleDateChange = (action: 'next' | 'prev') => {
    if(action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));

    } else {
      setSelectedDate(subMonths(selectedDate, 1));

    }
  }

  async function loadData() {
    setIsLoading(true);

    const dataKey = '@gofinances:transaction';
    const response = await AsyncStorage.getItem(dataKey);
    const dataFormatted = response ? JSON.parse(response) : [];

    const expensive = dataFormatted
    .filter((expensive: TransactionProps) => 
    expensive.type === 'negative' &&
    new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
    new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensiveTotal = expensive
    .reduce((ac: number, expensive: TransactionProps) => {
      return ac += Number(expensive.amount)
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensive.forEach((expensive: TransactionProps) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          totalFormatted,
          percent,
        });
      }
      
      setIsLoading(false);
    });

    setTotalByCategories(totalByCategory);
  }


  useFocusEffect(useCallback(() => {
    loadData();
  },[]));

  return (
    <Container>

      <Header title="Resumo por categoria" />

      {
         isLoading ? 
         <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
         </LoadContainer> :

        <Content>

          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              { format(selectedDate, 'MMMM, yyyy', {locale: ptBR}) }
            </Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie 
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                }
              }}
              labelRadius={50}
              height={280}
              width={280}
              x="percent"
              y="total"
            />
          </ChartContainer>
          <FlatList
            data={totalByCategories}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <HistoryCard 
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            )}
            contentContainerStyle={{
              paddingBottom: getBottomSpace(),
            }}
            showsVerticalScrollIndicator={false}
          />
        </Content>
      }
    </Container>
  );
};
