import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  align-items: center;
  border-radius: 10px;
  border-color: #f38725;
  background: #f38725;
  padding: 4px 0;
`;

export const ButtonText = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 16px;
  padding: 16px;
  width: 100%;
  color: #ffffff;
  text-align: center;
`;
