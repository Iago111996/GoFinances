import React, { useState } from 'react';
import { 
  Modal,
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert,
} from 'react-native';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { 
  Container,
  Form,
  Content,
  Footer,
  TransactionTypes
 } from './styles';

import { Header } from '../../components/Header';
import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../../components/Form/CategorySelect';
import { ModalCategorySelect } from '../ModalCategorySelect';

interface RegisterProps {}

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um número')
    .positive('O valor não pode ser negativo')
    .required('Preço é obrigatório'),
}).required()

export const Register = ({}: RegisterProps) => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleTransactionTypeSelect = ( type: 'up' | 'down' ) => {
    setTransactionType(type);
  }

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  }

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  }

  const handleRegister = (form: FormData) => {
    if(!transactionType)
    return Alert.alert('Selecione o tipo da transação');

    if(category.key === 'category') 
    return Alert.alert('Selecione a categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }

    console.log(data);
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
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />

              <TransactionTypeButton 
                title="Outcome" 
                type="down"
                onPress={() => handleTransactionTypeSelect('down')} 
                isActive={transactionType === 'down'}
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
