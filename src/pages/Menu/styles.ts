import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 3;
  background: #006633;
`;

export const ContentContainer = styled.ScrollView`
  flex: 1;
`;

export const Content = styled.View`
  background: #f7f7f7;
  flex: 2;
  align-items: center;
  margin-top: 96px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 0 16px;
  overlowY: auto;
`;

export const Worker = styled.View`
  margin-top: -75px;
  background: #F38725;
  width: 150px;
  height: 150px;
  border-radius: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const WorkerContainer = styled.View`
  display: flex;
  align-items: center;
`

export const WorkerInitials = styled.Text`
  font-family: 'AvenirNextLTPro-Bold';
  color: white;
  font-size: 48px;
`

export const WorkerName = styled.Text`
  margin-top: 16px;
  font-size: 24px;
  color: #006633;
  font-family: 'AvenirNextLTPro-Demi';
`;

export const HomeShortcutsButtons = styled.View`
  margin: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;



export const ShortcutButton = styled(RectButton)`
  background: #ffffff;
  border-radius: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 2;
  padding: 16px;
  margin-bottom: 8px;
`;

export const ShortcutDetail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 248px;
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
  color: #006633;
  flex: 1;
`;

export const AppInfoText = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  font-size: 16px;
  margin-top: 8px;
  color: #888;
  text-align: center;
`
