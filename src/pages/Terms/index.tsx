import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InnerPages from '../../components/InnerPages';

import {
  Container,
  PageContent,
  ContentContainer,
  BoxTerms,
  Title,
} from './styles';

const Terms: React.FC = () => {

  return (
    <InnerPages name="Termos de Uso">
      <Container>
        <PageContent>
          <Title>Termos de Uso</Title>
          <ContentContainer>
            <BoxTerms>
              <View style={styles.container}>
                <Text style={styles.paragraph}>
                  Bem-vindo ao nosso Aplicativo de Acessibilidade para
                  Sindicatos e Trabalhadores Rurais!
                </Text>
                <Text style={styles.paragraph}>
                  Nosso compromisso é tornar o ambiente de trabalho no setor
                  rural mais seguro, justo e transparente. Combinamos a força
                  dos sindicatos com a voz dos trabalhadores para criar um
                  espaço onde todos possam prosperar.
                </Text>
                <Text style={styles.paragraph}>
                  Aqui estão algumas das principais características do nosso
                  aplicativo:
                </Text>
                <Text style={styles.listItem}>
                  1. Denúncias Anônimas com Segurança
                </Text>
                <Text style={styles.listItem}>
                  2. Visão Gerencial para Sindicatos
                </Text>
                <Text style={styles.listItem}>
                  3. Colaboração para um Ambiente Melhor
                </Text>
                <Text style={styles.listItem}>
                  4. Transparência e Prestação de Contas
                </Text>
                <Text style={styles.listItem}>5. Facilidade de Uso</Text>
                <Text style={styles.paragraph}>
                  Estamos comprometidos em construir um ambiente de trabalho
                  mais seguro e justo para todos os envolvidos. Junte-se a nós
                  nesta jornada em direção a um futuro melhor para os
                  trabalhadores rurais e seus sindicatos.
                </Text>
                <Text style={styles.paragraph}>
                  Faça o download do nosso aplicativo agora e seja parte da
                  mudança!
                </Text>
              </View>
            </BoxTerms>
          </ContentContainer>
        </PageContent>
      </Container>
    </InnerPages>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  paragraph: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  listItem: {
    marginLeft: 20,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Terms;
