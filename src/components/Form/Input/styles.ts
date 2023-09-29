import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {TextInput as ReactTextInput} from 'react-native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 8px;
  background: #ffffff;
  border-color: #ffffff;
  border-radius: 10px;
  border-width: 2px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled(ReactTextInput)`
  flex: 1;
  color: #666666;
  font-size: 16px;
  font-family: 'AvenirNextLTPro-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
  color: #cccccc;
`;
