import styled from  'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  margin: 24px 16px;
  margin-top: 10px;
    flex: 1;
`;

export const IntroContainer= styled.View`
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-color: #333;
  margin-bottom: 16px;
`

export const Title = styled.Text`
  font-family: 'AvenirNextLTPro-Bold';
  font-size: 32px;
  color: #006633;
  margin-bottom: 8px;
`;

export const IntroText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  font-family: 'AvenirNextLTPro-Bold';
  color: #006633;
`

export const Wrapper = styled.ScrollView`
  background: #f7f7f7;
  flex: 1;
`;

export const ShortcutButton = styled(RectButton)`
  background: #ffffff;
  border-radius: 16px;
  flex-direction: row;
  flex: 1;
  align-items: center;
  elevation: 2;
  padding: 16px;
  margin-bottom: 8px;
`;

export const ShortcutDetail = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

export const ShortcutDeatailIcon = styled.View`
  background: #f7f7f7;
  width: 48px;
  height: 48px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const ShortcutName = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 16px;
  color: black;
`;

export const NoAvailableText = styled.Text`
  margin-bottom: 16px;
`
