import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Container, WelcomeText, IntroText, NextStep, NextStepText} from './styles';

const AccountCreated: React.FC = ()=>{
  const navigation = useNavigation();

  return (
    <Container>
      <WelcomeText>Sua conta foi cadastrada com sucesso!</WelcomeText>
      <IntroText>Você já pode se logar para usar o app.</IntroText>
      <NextStep onPress={() => navigation.navigate('SignIn')}>
        <NextStepText>Logar</NextStepText>
      </NextStep>
    </Container>

  );
}

export default AccountCreated;
