import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: white;
  border-radius: 10px;
  elevation: 5;
  margin: 8px;
  flex-basis: 0;
  max-width: 45%;
`;

export const IconContainer = styled.View`
  padding: 8px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: #f7f7f7;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  margin-top: 16px;
  color: #006633;
  font-weight: bold;
  font-size: 16px;
`;
