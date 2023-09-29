import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';

export const FormContainer = styled.View`
  flex-direction: column;
`;

export const Input = styled.TextInput`
  padding: 8px 0;
  margin: 4px 0;
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

export const NextStep = styled(RectButton)`
  margin-top: 32px;
  padding: 16px;

  text-align: center;

  background-color: #f38725;
  border-radius: 16px;

  margin-bottom: 48px;
`;

export const NextStepText = styled.Text`
  color: #ffffff;
  font-family: 'AvenirNextLTPro-Bold';
  font-size: 16px;
  text-align: center;
`;

export const RadioContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const RadioLabelContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
`;

export const RadioLabel = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  color: #006633;
`;

export const SwitchContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  border-style: solid;
  margin-top: 24px;
  padding-bottom: 24px;
`;

export const SwitchLabel = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 14px;
  color: #006633;
  margin-left: 24px;
  width: 75%;
`;
