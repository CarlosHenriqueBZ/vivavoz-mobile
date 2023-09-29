import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

interface RadioButtonContainerProps{
  ios?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: #006633;
`;

export const LoadingWrapper = styled.View`
  flex: 1;
  justify-content: center;
  background: #f7f7f7;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`

export const Content = styled.ScrollView`
  background: #f7f7f7;
  flex: 1;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 16px;
`;

export const TitleWrapper = styled.View`
  margin-top: 16px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-color: #333;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: 'AvenirNextLTPro-Bold';
  font-size: 24px;
  color: #006633;
  flex-shrink: 1;
`;

export const QuestionsContainer = styled.View``

export const QuestionWrapper = styled.View`
  margin-bottom: 24px;
  flex-direction: column;
`;

export const QuestionText = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 18px;
  color: #006633;
  margin-bottom: 8px;
`;

export const AnswersWrapper = styled.View``;

export const SelectContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  border-style: solid;
`;

export const RadioButtonContainer = styled.View<RadioButtonContainerProps>`
  border: ${props => props.ios ? '2px solid gray' : '0'};
  margin: ${props => props.ios ? '8px 8px 8px 0': '0'};
  border-radius: 50px;
  padding: 4px;
  width: ${props => props.ios ? '24px' : 'unset'};
  height: ${props => props.ios ? '24px' : 'unset'};
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
  font-size: 16px;
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
