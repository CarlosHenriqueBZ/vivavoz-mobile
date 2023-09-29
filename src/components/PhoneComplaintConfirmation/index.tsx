import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Alert } from  'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import SMSNotificationRepository from '../../repositories/SMSNotificationRepository';
import { database } from '../../data/database';
import { useAuth } from  '../../hooks/auth';
import { useComplaint } from '../../hooks/complaint';

import {
  Modal,
  ModalContainer,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Container,
  FinishButton,
  FinishText,
  Heading,
  Description,
  OptionsContainer,
  FormContainer,
  Button,
  ReceiveText,
  CancelText,
  SelectContainer,
  SelectLabel,
  SelectError,
  InputMask,
  NextStep,
  NextStepText,
} from './styles';

interface IProps {
  complaint_id: string;
}

const PhoneComplaintConfirmation: React.FC<IProps> = ({ complaint_id })=>{
  const smsNotificationRepository = useMemo(() => new SMSNotificationRepository(database), []);
  const navigation = useNavigation();
  const route = useRoute();
  const { worker } = useAuth();
  const { dispatch } = useComplaint();

  const finishComplaint = useCallback(()=>{
    dispatch({ type: 'CLEAR_STATE' });

    navigation.reset({
      index: 0,
      routes: [
        { name: worker ? 'Dashboard' : 'ComplaintsList' }
      ]
    });
  }, []);

  const handleSavePhone = useCallback(async (values)=>{
    try{
      await smsNotificationRepository.create(values);
      Alert.alert('Sucesso', 'Informação salva com sucesso. Você receberá uma cópia do protocolo assim que ele for gerado.')

      finishComplaint();
    }catch(error){
      console.log(error);
      Alert.alert('Erro', 'Ocorreu algum erro ao tentar salvar a informação.')
    }

  }, []);

  const [visible, setVisible] = useState(false);
  const [showOptions, setShowOptions] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(()=>{

    if(!showOptions){
      setShowForm(true);
    }

  }, [showOptions])

  return (
    <>
    <Container>
      <FinishButton onPress={() => setVisible(true)}>
        <FinishText>Concluir</FinishText>
      </FinishButton>
    </Container>

    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <ModalContainer>
        <ModalContent style={{elevation: 5, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 4}} >
          <ModalHeader>
            <Heading>Deseja receber SMS?</Heading>
          </ModalHeader>
          <ModalBody>
            <Description>Você deseja receber um SMS com o número do protocolo da sua denúncia?</Description>
          </ModalBody>
          <ModalFooter>

            {showOptions === true && (
            <OptionsContainer>

              <Button onPress={() => setShowOptions(false)}>
                <ReceiveText>Sim</ReceiveText>
              </Button>

              <Button onPress={() => finishComplaint()}>
                <CancelText>Não</CancelText>
              </Button>

            </OptionsContainer>
            )}

            {showForm === true && (

            <FormContainer>
              <Formik
                initialValues={{
                  phone: '',
                  complaint_id: complaint_id,
                }}
                onSubmit={handleSavePhone}
              >
                {({values, handleChange, handleBlur, errors, handleSubmit, resetForm }) => (
                  <>
                  <SelectContainer>
                    <SelectLabel>Celular</SelectLabel>
                    <InputMask
                    type={'cel-phone'}
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) '
                    }}
                    placeholder="Digite aqui o seu celular"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    autoCapitalize="none"
                    />
                  </SelectContainer>
                  {errors.phone && <SelectError>{errors.phone}</SelectError>}

                  <NextStep onPress={() => handleSubmit()}>
                    <NextStepText>Concluir</NextStepText>
                  </NextStep>
              </>
              )}
              </Formik>

            </FormContainer>


            )}

          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </Modal>
    </>
  );
};

export default PhoneComplaintConfirmation;
