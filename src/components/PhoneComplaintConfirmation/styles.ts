import styled from 'styled-components/native';
import { Modal as ReactModal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';


export const Container = styled.View`
  padding: 0 16px;
`

export const FinishButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

export const FinishText = styled.Text`
  color: #ffffff;
  font-size: 14px;
`;

export const Modal = styled(ReactModal)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background: #ffffff;
  border-radius: 10px;
  padding: 8px;
  margin: 24px;
  align-items: center;
  padding: 24px;
`;

export const ModalHeader = styled.View`
  margin: 16px 0;
  border-bottom-color: #ccc;
  border-bottom-width: 2px;
  padding: 16px;
`;

export const ModalBody = styled.View`
  margin: 16px 0;
`;

export const ModalFooter = styled.View`
  padding: 8px 0;
  margin: 0 16px;
`;

export const Heading = styled.Text`
  font-family: 'AvenirNextLTPro-Bold';
  color: #006633;
  font-size: 16px;
`;

export const Description = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  text-align: center;
`;

export const OptionsContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
  padding: 8px 32px;
  background: #dedede;
  border-radius: 8px;
  margin: 0 16px;
`

export const ReceiveText = styled.Text`
  color: #006633;
  font-family: 'AvenirNextLTPro-Demi';
`;

export const CancelButton = styled.TouchableOpacity`
  padding: 8px 24px;
  background: #dedede;
  border-radius: 8px;
`

export const CancelText = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
`;

export const FormContainer = styled.View`
  flex-direction: column;
`;

export const InputMask = styled(TextInputMask)`
  padding: 8px 0;
  height: 48px;
`;

export const SelectContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  border-style: solid;
  margin-top: 24px;
`;

export const SelectLabel = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 12px;
  color: #006633;
`;

export const Select = styled(Picker)`
  font-family: 'AvenirNextLTPro-Demi';
`;

export const SelectError = styled.Text`
  margin-top: 4px;
  font-family: 'AvenirNextLTPro-Demi';
  color: red;
  font-style: italic;
`

export const NextStep = styled.TouchableOpacity`
  margin-top: 32px;
  padding: 16px;

  text-align: center;

  background-color: #f38725;
  border-radius: 16px;
`;

export const NextStepText = styled.Text`
  color: #ffffff;
  font-family: 'AvenirNextLTPro-Bold';
  font-size: 16px;
  text-align: center;
`;
