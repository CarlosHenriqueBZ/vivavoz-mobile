import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from  'formik';

import search from '../../services/search';
import { sync } from '../../services/sync';

import { useNavigation } from '@react-navigation/native';

interface ISearch {
  protocol: string;
}

import {
  Container,
  Input,
  IconContainer,
} from './styles';

const SearchComplaint: React.FC = ()=>{
  const navigation = useNavigation();

  const [protocol, setProtocol] = useState('');

  const handleSearch = useCallback(async ({ protocol }: ISearch)=>{
    if(protocol.length < 15){
      Alert.alert('Protocolo inválido', 'Digite um protocolo válido para poder recuperar uma denúncia.');
    }

    try{
      const response = await search(protocol);

      if(response.changes.complaints.created.length < 1){
        Alert.alert('Protocolo não encontrado', 'Nenhuma denúncia com esse protocolo foi encontrada.');
      }

      if(response.changes.complaints.created.length >= 1){
        await sync();
        setProtocol('');
        Alert.alert('Protocolo encontrado', 'Por segurança, você não poderá ler as mensagens antigas desse protocolo.');

        const findedProtocolId = response.changes.complaints.created[0].id;

        navigation.navigate('ShowComplaint', {complaint_id: findedProtocolId, complaint_status: 'show-complaint'})
      }

    }catch(error){
      Alert.alert('Erro', 'Ocorreu um erro ao tentar recuperar a sua denúncia. Tente novamente mais tarde.');
    }

  }, []);

  const parseComplaint = useCallback((value, callback)=>{
    const parsedProtocol = value.replace(/([0-9]{13})([0-9])/, '$1-$2');
    setProtocol(parsedProtocol);
    return callback('protocol', parsedProtocol);
  }, []);

  return (
    <Container>
      <Formik
      initialValues={{
        protocol: '',
      }}
      onSubmit={handleSearch}
      >
        {({handleSubmit, values, setFieldValue})=>(
          <>
          <Input
            value={protocol}
            placeholder="Recupere um protocolo"
            placeholderTextColor="#8c8c8c"
            keyboardType="number-pad"
            maxLength={15}
            onChangeText={(value)=>{
              parseComplaint(value, setFieldValue);
            }}
          />
          <IconContainer onPress={() => handleSubmit()}>
            <Icon name="search" size={20} color="#ffffff" />
          </IconContainer>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default SearchComplaint;
