import {Icon} from './../../components/NotificationsIndicator/styles';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const KeyboardHide = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const Container = styled.View`
  background-color: #006633;
  flex: 1;
  justify-content: space-between;
  padding: 40px 16px 0 16px;
`;

export const Header = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;
export const Body = styled.View``;
export const Footer = styled.View``;

export const Logo = styled.Image``;

export const WelcomeTitle = styled.Text`
  font-family: 'AvenirNextLTPro-Bold';
  color: #ffffff;
  font-size: 28px;
  text-align: center;
  margin-bottom: 8px;
`;

export const WelcomeText = styled.Text`
  color: #ffffff;
  text-align: center;
  font-size: 16px;
  font-family: 'AvenirNextLTPro-Regular';
`;

export const LoginContainer = styled.View`
  margin-top: 24px;
`;

export const LoginText = styled.Text`
  color: #ffffff;
  text-align: center;
  font-family: 'AvenirNextLTPro-Regular';
  margin-bottom: 16px;
`;

export const ComplaintsSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 24px;
`;

export const ComplaintsSectionButton = styled(RectButton)`
  background-color: #ffffff;
  border-radius: 10px;
  width: 32%;
  padding: 8px;
`;

export const ComplaintsSectionButtonIconContainer = styled.View`
  background-color: #f6f6f6;
  width: 40px;
  height: 40px;
  border-radius: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 8px;
`;

export const ComplaintsSectionButtonText = styled.Text`
  color: #006633;
  font-family: 'AvenirNextLTPro-Demi';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  border-top-width: 1px;
  border-color: #ffffff;

  padding: 16px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CreateAccountButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  margin-left: 16px;
`;

export const CovidIcon = styled(Icon)`
  background-image: ./assets/icone-covid.png;
`;
