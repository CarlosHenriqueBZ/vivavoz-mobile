import React, { useEffect, useCallback, useState } from 'react';
import { Text } from 'react-native';
import InnerPages from '../../components/InnerPages';

import {Container, PageContent, Title, Description} from './styles';

const About: React.FC = () => {

  return (
    <InnerPages name="Sobre">
      <Container>
        <PageContent>
          <Title>Sobre o Aplicativo</Title>
          <Description>
            {' '}
            Nosso aplicativo foi projetado para melhorar o ambiente de trabalho
            no setor rural. Trabalhadores podem fazer denúncias anônimas,
            garantindo sua segurança, enquanto os sindicatos têm uma visão
            gerencial completa de seus membros ativos. Juntos, promovemos um
            ambiente de trabalho mais seguro e justo. Faça o download agora e
            faça parte dessa mudança!
          </Description>
        </PageContent>
      </Container>
    </InnerPages>
  );
};

export default About;
