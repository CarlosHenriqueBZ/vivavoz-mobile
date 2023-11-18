import { LinearGradient } from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const PageContent = styled.View`
  flex: 1;
  padding: 24px 16px;
`;

export const CardContent = styled.View`
  flex: 1;
  padding: 8px;
`;

export const SyndicateContainer = styled.View`
  background: white;
  elevation: 5;
  padding: 24px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
`;

export const SyndicateLogo = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 50px;
`;

export const SyndicateLogoCard = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 50px;
`;
export const SyndicateName = styled.Text`
  color: #006633;
  font-size: 16px;
  line-height: 20px;
  font-family: 'AvenirNextLTPro-Demi';
  margin-left: 16px;
  max-width: 70%;
`;

export const AssociateContainer = styled.View`
  background: #006632;
  padding: 16px;
  border-radius: 30px;
`;

export const AssociateId= styled.Text`
  color: white;
  font-family: 'AvenirNextLTPro-Bold';
  font-size: 30px;
`;

export const AssociateInfoBody = styled.View`
  margin-top: 2px;
`;

export const Row = styled.View`
   padding: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


export const LogoCard = styled.View`
  display: flex;
align-self: flex-end;

  flex-direction: row;
  align-items: center;
`;

export const AssociateInfoFooter = styled.View`
  margin: 16px 0;
  flex-direction: row;
`;

export const AssociateInfoContainer = styled.View`
  margin-right: 32px;
`;

export const AssociateInfoLabel = styled.Text`
  color: white;
  font-family: 'AvenirNextLTPro-Regular';
  margin: 8px 0;
`;

export const AssociateInfoSync = styled.Text`
  color: white;
  font-family: 'AvenirNextLTPro-Regular';
  margin: 8px 0;
  font-size: 18px;
  font-weight: bold;
`;


export const AssociateInfo = styled.Text`
  color: white;
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 16px;
`

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
