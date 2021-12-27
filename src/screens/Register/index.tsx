import React, { useState } from 'react';
import { 
  Modal,
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert,
} from 'react-native';

import { 
  Container,
  Form,
  Content,
  Footer,
  TransactionTypes
 } from './styles';

import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootBottomTabParamList } from '../../routes/app.routes';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { Header } from '../../components/Header';
import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../../components/Form/CategorySelect';
import { ModalCategorySelect } from '../ModalCategorySelect';
import { string } from 'yup/lib/locale';

type registerScreenProp = BottomTabNavigationProp<RootBottomTabParamList, 'Listagem'>;

interface RegisterProps {}

interface FormData {
  name: string;
  amount: string;
}

const schema = (t: string) => Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um número')
    .positive('O valor não pode ser negativo')
    .required('Preço é obrigatório'),
}).required()

export const Register: React.FC = ({}: RegisterProps) => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const navigation = useNavigation<registerScreenProp>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema("g")),
  });

  const handleTransactionTypeSelect = ( type: 'positive' | 'negative' ) => {
    setTransactionType(type);
  }

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  }

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: FormData)  {
    if(!transactionType)
    return Alert.alert('Selecione o tipo da transação');

    if(category.key === 'category') 
    return Alert.alert('Selecione a categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try{
      const dataKey = '@gofinances:transaction';
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType(''); 
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possícel cadastrar');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <Container>
        <Header title="Cadastro" />

        <Form>
          <Content>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypeButton 
                title="Income" 
                type="up" 
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />

              <TransactionTypeButton 
                title="Outcome" 
                type="down"
                onPress={() => handleTransactionTypeSelect('negative')} 
                isActive={transactionType === 'negative'}
              /> 
            </TransactionTypes>

            <CategorySelect 
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Content>

          <Footer>
            <Button 
              title="Enviar"
              onPress={handleSubmit(handleRegister)}
            />
          </Footer>
        </Form>

        <Modal visible={categoryModalOpen}>
          <ModalCategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
