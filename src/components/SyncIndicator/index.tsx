import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {sync} from '../../services/sync';

import {Container} from './styles';

const SyncIndicator: React.FC = () => {
 // const [syncState, setSyncState] = useState('Sicronizando dados...');
  const [syncState, setSyncState] = useState('');
  const [isSync, setIsSync] = useState(true);

  useEffect(() => {
    sync()
      .then(() => {
        setSyncState(null);
        setIsSync(false);
      })
      .catch((e) => {
        setSyncState('Erro na sincronização.');
        console.log(e);
      });
  }, []);
  return (
      <Container >
        <Text style={{color: '#ffffff'}}>{syncState}</Text>
      </Container>
  );
};

export default SyncIndicator;
