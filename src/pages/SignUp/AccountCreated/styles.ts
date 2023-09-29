import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  background: #006633;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const WelcomeText = styled.Text`
  color: #ffffff;
  font-size: 24px;
  font-family: 'AvenirNextLTPro-Bold';
  text-align: center;
`;

export const IntroText = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  color: #ffffff;
  margin-top: 8px;
  font-size: 16px;
  text-align: center;
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
