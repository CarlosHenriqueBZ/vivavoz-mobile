import React, { useCallback } from 'react';
import { Modal, Text } from 'react-native';
import { useAuth } from '../../../hooks/auth';
import { Alert } from 'react-native';

import api from '../../../services/api';

import {
  Container,
  ModalContainer,
  ModalHeader,
  HeaderTitle,
  ModalBody,
  ModalFooter,
  CancelButton,
  ConfirmButton
} from './styles';

interface IProps {
  visible: boolean;
  handleVisible: (value: boolean) => void;
}

const RemoveProfile: React.FC<IProps> = ({visible, handleVisible})=>{
  const { worker, signOut } = useAuth();

  const handleRemoveAccount = useCallback(async (id = worker.id)=>{
    try {
      await api.delete(`/workers/${id}`);
      Alert.alert('Sucesso', 'A sua conta foi removida com sucesso.');
      signOut();
    }catch(error){
      Alert.alert('Erro ao remover a conta', 'Ocorreu um erro ao tentar remover a sua conta. Tente novamente mais tarde.');
    }
  }, []);

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => handleVisible(false)}
      >
        <Container>
          <ModalContainer
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0
            },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5
            }}>
            <ModalHeader>
              <HeaderTitle>Remover conta</HeaderTitle>
            </ModalHeader>

            <ModalBody>
              <Text>Você está certo de que deseja remover a sua conta? Essa ação não poderá ser desfeita e todos os dados serão perdidos.</Text>
            </ModalBody>
            <ModalFooter>
              <CancelButton onPress={() => handleVisible(false)}>
                <Text>Cancelar</Text>
              </CancelButton>

              <ConfirmButton onPress={() => handleRemoveAccount()}>
                <Text style={{color: 'red' }}>Confirmar</Text>
              </ConfirmButton>

            </ModalFooter>
          </ModalContainer>
        </Container>
      </Modal>
    </Container>
  );
};

export default RemoveProfile;
