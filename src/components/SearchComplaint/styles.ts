import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const KeyboardHide = styled.TouchableWithoutFeedback``;

export const Container = styled.View`
  margin: 16px;
  background: #dedede;
  padding: 8px 16px;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
`;

export const Input = styled.TextInput`
  padding: 8px 0;
  flex: 1;
`;

export const IconContainer = styled(RectButton)`
  background: #006633;
  padding: 8px;
  margin-left: 16px;
  border-radius: 6px;
`;

