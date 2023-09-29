import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 16px 0;
  background: #edeef0;
  padding: 16px 24px;
  border-radius: 8px;
  border-color: #ccc;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
`;

export const Button = styled(RectButton)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;

export const ListenText = styled.Text`
  margin-left: 16px;
  font-size: 16px;
  font-family: 'AvenirNextLTPro-Demi';
`;
