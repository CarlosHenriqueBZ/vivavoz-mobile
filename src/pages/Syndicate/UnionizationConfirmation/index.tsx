import React from 'react';
import InnerPages from '../../../components/InnerPages';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native';

import {
  Container,
  Content,
  NextStep,
  NextStepText
} from './styles'

const UnionizationConfirmation: React.FC = ()=>{
  const navigation = useNavigation();

  return (
    <InnerPages name="Sindicato">
      <Container>
        <Content>
          <Text>Sua solicitação foi enviada com sucesso. Em breve você deverá ter um retorno do seu sindicato.</Text>
          <NextStep onPress={()=>navigation.navigate('Dashboard')}>
            <NextStepText>Voltar para o início</NextStepText>
          </NextStep>
        </Content>
      </Container>
    </InnerPages>
  )
}

export default UnionizationConfirmation;
