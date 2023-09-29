import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

const Loading: React.FC = ()=>{
  return (
    <Container>
      <ActivityIndicator size="small" color="#006633" />
    </Container>
  );
};

export default Loading;
