import styled from 'styled-components/native';
import {Picker} from '@react-native-picker/picker';
import {RectButton} from 'react-native-gesture-handler';

interface RadioButtonContainerProps{
  ios?: boolean;
}

export const Container = styled.View`
  background: #006633;
  flex: 1;
`;

export const BasePage = styled.ScrollView`
  background: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  flex: 1;
  padding: 24px 16px;
`;

export const Intro = styled.Text`
  font-size: 24px;
  text-align: center;
`;

export const Main = styled.View`
  padding-top: 16px;
`;

export const FormContainer = styled.View`
  flex-direction: column;
`;

export const Input = styled.TextInput`
  padding: 8px 0;
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

export const RadioButtonContainer = styled.View<RadioButtonContainerProps>`
  border: ${props => props.ios ? '2px solid gray' : '0'};
  margin: ${props => props.ios ? '8px 8px 8px 0': '0'};
  border-radius: 50px;
  padding: 0;
  width: ${props => props.ios ? '24px' : 'unset'};
  height: ${props => props.ios ? '24px' : 'unset'};
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContentContainer = styled.ScrollView`
  flex: 1;
  border: solid 2px white;
`;

export const BoxTerms = styled.View`,
  background: #f2f2f2;
  flex: 1;
  min-height: 900px;
`;

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
  margin-top: 8px;
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

export const RowTerms = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SwitchLabel = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 14px;
  color: #006633;
  margin-left: 24px;
  width: 75%;
`;
