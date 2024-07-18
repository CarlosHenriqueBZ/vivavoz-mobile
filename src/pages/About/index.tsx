import React, { useEffect, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import InnerPages from '../../components/InnerPages';

import {Container, PageContent, Title, Description} from './styles';

const About: React.FC = () => {

  return (
    <InnerPages name="Sobre">
      <Container>
        <PageContent>
        <Title>Sobre o Aplicativo</Title>
        <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Aplicativo para possibilitar ao trabalhador comunicar ao seu sindicato problemas no local de trabalho em sigilo, segurança e anonimato.</Text>
      <Item number={1} text="Anonimamente o trabalhador poderá enviar para seu sindicato mensagem de texto anonimamente sobre problemas no seu local de trabalho;" />
      <Item number={2} text="Anonimamente o trabalhador poderá também enviar para seu sindicato documentos e fotos que comprovem situações irregulares e problemas no seu local de trabalho;" />
      <Item number={3} text="Anonimamente e de forma segura você poderá enviar mensagens de voz sobre problemas no seu local de trabalho, em total segurança. O envio de mensagem de voz é seguro sua voz será modificada não sendo possível a identificação de quem enviou. Sigilo e anonimato total." />
      <Item number={4} text="Você poderá acompanhar a ação sindical em relação ao problema que enviou através de notícias ou se desejar receber por SMS protocolo de acompanhamento;" />
      <Item number={5} text="Caso queira se cadastrar você terá acesso a convênios com vantagens e descontos que seu sindicato ofereça;" />
      <Item number={6} text="Você poderá declarar ao sindicato interesse em sindicalizar-se e seu sindicato irá até você!" />
      <Item number={7} text="Você poderá acessar notícias sobre o que acontece no seu setor" />
      <Item number={8} text="Você poderá responder pesquisas de interesse dos trabalhadores para auxiliar na ação sindical em defesa dos trabalhadores" />
      <Text style={styles.objective}>O objetivo deste aplicativo é dar voz protegida aos trabalhadores/as para possibilitar maior agilidade de ações para melhoria das condições de trabalho, combate ao trabalho análogo à escravidão, acompanhamento e correção de irregularidades trabalhistas.</Text>
    </ScrollView>
        </PageContent>
      </Container>
    </InnerPages>
  );
};



const Item = ({ number, text }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemNumber}>{number})</Text>
      <Text style={styles.itemText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  itemNumber: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  itemText: {
    flex: 1,
  },
  objective: {
    marginTop: 20,
    fontStyle: 'italic',
  },
});
export default About;
