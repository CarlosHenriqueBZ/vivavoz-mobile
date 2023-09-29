import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background: white;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 24px 16px;
  flex: 1;
`;

export const Content = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
