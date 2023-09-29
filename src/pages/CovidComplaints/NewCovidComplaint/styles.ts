import {RadioButton} from 'react-native-paper';
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
`;

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

export const Label = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 12px;
  color: #006633;
`;

export const ContainerView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  border-style: solid;
  margin: 10px 0px;
  padding-bottom: 10px;
`;

export const RadioView = styled.View`
  display: flex
  flex-direction: row
  align-items: center;
  justify-content: flex-start
  margin: 5px 0px
`;

export const RadioCustom = styled.View`
  border-width: 3px;
  border-color: #006633;
  border-style: solid;
  border-radius: 20px;
  width: 25px
  height: 25px
  margin-right: 5px
  padding: 2px
`;

export const RadioCustomChecked = styled.View`
  background-color: #006633;
  border-radius: 20px;
  width: 100%
  height: 100%
  margin: auto
`;

export const RadioLabel = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 15px;
  color: #cccccc;
`;

export const CheckBoxView = styled.View`
  display: flex
  flex-direction: row
  align-items: center;
  justify-content: flex-start
  margin: 8px 0px
`;

export const CheckBoxCustom = styled.View`
  border-width: 3px;
  border-color: #006633;
  border-style: solid;
  width: 25px
  height: 25px
  margin-right: 5px
  padding: 2px
`;

export const CheckBoxCustomChecked = styled.View`
  background-color: #006633;
  width: 100%
  height: 100%
  margin: auto
`;

export const CheckBoxLabel = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 15px;
  line-height: 18px;
  color: #cccccc;
  padding-right: 20px;
`;

export const PageDotsView = styled.View`
  display: flex
  flex-direction: row
  align-items: center;
  justify-content: flex-start
  margin: 0 auto 0 auto
  padding-right: 50px
  `;

export const PageDots = styled.View`
  border-width: 3px;
  border-color: #006633;
  border-style: solid;
  border-radius: 20px;
  width: 15px
  height: 15px
  margin-right: 5px
  padding: 1px
`;

export const PageDotsCheck = styled.View`
  background-color: #006633;
  border-radius: 20px;
  width: 100%
  height: 100%
  margin: auto
`;

export const ContainerFlex = styled.View`
display: flex
flex-direction: row
margin-bottom: 20px

`;
