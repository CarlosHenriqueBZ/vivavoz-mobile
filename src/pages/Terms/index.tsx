import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InnerPages from '../../components/InnerPages';

import Pdf from 'react-native-pdf';
import {
  Container,
  PageContent,
  ContentContainer,
  BoxTerms,
  Title,
} from './styles';
import ContentTerms from './content';

const Terms: React.FC = () => {
  return (
    <InnerPages name="Termos de Uso">
      <Container>
        <ContentTerms/>
      </Container>
    </InnerPages>
  );
};

export default Terms;
