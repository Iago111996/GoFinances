import * as React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';
import { categories } from '../../global/utils/categories';

import {
  Container,
  Category,
  Icon,
  Name,
  Separator,
  Footer
} from './styles';

interface Category {
  key: string;
  name: string;
}

interface ModalCategorySelectProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export const ModalCategorySelect = ({
  category,
  setCategory,
  closeSelectCategory
}: ModalCategorySelectProps) => {

  const handleCategorySelect = (category: Category) => {
    setCategory(category);
  }

  return (
    <Container>
      <Header title="Categoria" />
      <FlatList 
        data={categories}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />

            <Name>{item.name}</Name>
          </Category>
        )}
      />

      <Footer>
        <Button 
          title="Selecionar" 
          activeOpacity={.7}
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  );
};
