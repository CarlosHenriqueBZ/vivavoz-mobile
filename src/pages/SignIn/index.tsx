import React, {useEffect} from 'react';
import {Image, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {useFormik} from 'formik';
import logoImg from '../../assets/logo/1x/logoHorizontalWhite.png';
import {Alert} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {useSync} from '../../hooks/sync';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';

import {sync} from '../../services/sync';

import {useAuth} from '../../hooks/auth';

import vivaVozIcon from '../../assets/logo/1x/vivaVozIcon.png';
import covidIcon from '../../assets/icone-covid.png';

import {
  KeyboardHide,
  Container,
  Header,
  Body,
  Footer,
  Logo,
  WelcomeTitle,
  WelcomeText,
  LoginContainer,
  LoginText,
  CreateAccountButton,
  CreateAccountButtonText,
  ComplaintsSection,
  ComplaintsSectionButton,
  ComplaintsSectionButtonIconContainer,
  ComplaintsSectionButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const {syncData} = useSync();
  const {signIn} = useAuth();

  const {handleChange, handleSubmit, values} = useFormik({
    initialValues: {cpf: '', password: ''},
    onSubmit: async values => {
      try {
        await signIn({cpf: values.cpf, password: values.password});
        await analytics().logLogin({
          method: 'SignInPage',
        });
      } catch {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
    },
  });

  useEffect(() => {
    syncData();
  }, []);

  return (
    <KeyboardHide onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Header>
          <Logo
            source={logoImg}
            resizeMode="contain"
            resizeMethod="resize"
            style={{height: 80}}
          />
        </Header>
        <Body>
          <WelcomeTitle>Olá, seja bem-vindo!</WelcomeTitle>
          <WelcomeText>
            Relate problemas no seu trabalho, acompanhe notícias, acesse
            convênios e sindicalize-se pelo Viva Voz.
          </WelcomeText>

          <LoginContainer>
            <LoginText>
              Preecnha os dados abaixo para acessar o Viva Voz.
            </LoginText>
            <Input
              name="cpf"
              icon="user"
              placeholder="Digite aqui o seu CPF"
              value={values.cpf}
              onChangeText={handleChange('cpf')}
              keyboardType="numeric"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              name="password"
              value={values.password}
              icon="lock"
              maxLength={8}
              secureTextEntry
              returnKeyType="send"
              placeholder="Digite aqui a sua senha"
              onChangeText={handleChange('password')}
              onSubmitEditing={handleSubmit}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Button onPress={() => handleSubmit()}>Entrar</Button>
          </LoginContainer>
        </Body>
        <Footer>
          <ComplaintsSection>
            <ComplaintsSectionButton
              onPress={() => navigation.navigate('NewComplaint')}>
              <ComplaintsSectionButtonIconContainer>
                <Image
                  source={vivaVozIcon}
                  resizeMode="contain"
                  resizeMethod="resize"
                  style={{height: 32}}
                />
              </ComplaintsSectionButtonIconContainer>
              <ComplaintsSectionButtonText>
                Relatar problema em sigilo
              </ComplaintsSectionButtonText>
            </ComplaintsSectionButton>

            <ComplaintsSectionButton
              onPress={() => navigation.navigate('ComplaintsList')}>
              <ComplaintsSectionButtonIconContainer>
                <Icon name="eye" size={24} color="#F38725" />
              </ComplaintsSectionButtonIconContainer>
              <ComplaintsSectionButtonText>
                Acompanhamento do problema
              </ComplaintsSectionButtonText>
            </ComplaintsSectionButton>

            <ComplaintsSectionButton
              onPress={() => navigation.navigate('NewCovidComplaint')}>
              <ComplaintsSectionButtonIconContainer>
                <Image
                  source={covidIcon}
                  resizeMode="contain"
                  resizeMethod="resize"
                  style={{height: 32}}
                />
              </ComplaintsSectionButtonIconContainer>
              <ComplaintsSectionButtonText>
                Covid 19
              </ComplaintsSectionButtonText>
            </ComplaintsSectionButton>
          </ComplaintsSection>

          <CreateAccountButton
            onPress={() => navigation.navigate('CreateAccount')}>
            <Icon name="log-in" size={20} color="#ffffff" />
            <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
          </CreateAccountButton>
        </Footer>
      </Container>
    </KeyboardHide>
  );
};

export default SignIn;
