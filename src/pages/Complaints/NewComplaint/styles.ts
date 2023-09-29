import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {Picker} from '@react-native-picker/picker';

export const Container = styled.View`
  flex: 1;
  background: #006633;
`;

export const ContentContainer = styled.ScrollView`
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 24px 16px;
  background: #ffffff;
  flex: 1;
`;

export const SectionContainer = styled.View`
  flex-direction: column;
  flex: 1;
  margin-bottom: 48px;
`;

export const Title = styled.Text`
  font-family: 'AvenirNextLTPro-Bold';
  font-size: 32px;
  color: #006633;
  margin-bottom: 8px;
`;

export const Description = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  margin-bottom: 38px;
`;

export const FormContainer = styled.View`
  flex-direction: column;
  flex: 1;
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
`;

export const NextStepText = styled.Text`
  color: #ffffff;
  font-family: 'AvenirNextLTPro-Bold';
  font-size: 16px;
  text-align: center;
`;
