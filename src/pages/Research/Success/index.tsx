import React, { useCallback } from 'react';
import {useNavigation} from '@react-navigation/native';

import {Container, WelcomeText, IntroText, NextStep, NextStepText} from './styles';

const AccountCreated: React.FC = ()=>{
  const navigation = useNavigation();

  const handleFinish = useCallback(()=>{
    navigation.reset({
      index: 0,
      routes: [
        { name: 'Dashboard' }
      ]
    });
  }, []);

  return (
    <Container>
      <WelcomeText>Pesquisa respondida com sucesso!</WelcomeText>
      <IntroText>Obrigado por sua colaboração.</IntroText>
      <NextStep onPress={() => handleFinish()}>
        <NextStepText>Voltar</NextStepText>
      </NextStep>
    </Container>

  );
}

export default AccountCreated;
