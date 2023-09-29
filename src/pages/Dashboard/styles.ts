import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #006633;
`;

export const Content = styled.ScrollView`
  background: #f7f7f7;
  flex: 1;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`;

export const UserTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 48px 24px;
`;

export const WelcomeUser = styled.View`
  flex-direction: row;
`;

export const WelcomeUserGreeting = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  color: #006633;
  font-size: 16px;
`;

export const WelcomeUserName = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  color: #006633;
  font-size: 16px;
  margin-left: 8px;
  max-width: 70%;
`;

export const UserLogoutContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const UserLogoutText = styled.Text`
  font-size: 16px;
  margin-right: 8px;
  color: #006633;
  font-family: 'AvenirNextLTPro-Demi';
`;

export const IntroTextContainer = styled.View`
  margin: 0 16px;
  background: #f38725;
  padding: 24px;
  border-radius: 16px;
`;

export const IntroTextContent = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 20px;
  line-height: 28px;
  color: #ffffff;
`;

export const HomeShortcutsButtons = styled.View`
  margin: 16px;
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
`;
