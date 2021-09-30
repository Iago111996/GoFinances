import React, {useContext} from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppSvg from '../../assets/apple.svg';
import GoogleSvgSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/Auth';

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
 } from './styles';

export const SignIn = () => {

  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {`\n`}
            finanças de forma {`\n`}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
        Faça seu login com {`\n`}
        uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton 
            title="Entrar com Google"
            svg={GoogleSvgSvg}
            onPress={handleSignInWithGoogle}
          />

          <SignInSocialButton 
             title="Entrar com  Apple"
             svg={AppSvg}
           />
        </FooterWrapper>
      </Footer>

    </Container>
  );
}
