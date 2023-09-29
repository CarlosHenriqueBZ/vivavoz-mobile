import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: white;
  elevation: 5;
  margin-bottom: 16px;
  border-radius: 10px;
  flex: 1 auto;
  flex-direction: column;
`;

export const Body = styled.View`
  padding: 16px;
`;

export const Footer = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  background: #f7f7f7;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;


export const PartnerInfo = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

export const PartnerLogoContainer = styled.View`
  background: #f7f7f7;
  width: 56px;
  height: 56px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-right: 16px;
`;

export const PartnerLogo = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`

export const PartnerInfoContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const PartnerName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #006633;
  margin-bottom: 4px;
`;

export const PartnerAddress = styled.Text`
  color: #006633;
  font-weight: 400;
  font-size: 12px;
`;

export const PartnerDescription = styled.Text`
  color: #006633;
  margin: 16px 0;
`
export const FooterButton = styled(RectButton)`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 16px;
  border-radius: 10px;
`;

export const FooterButtonText = styled.Text`
  color: #ff6600;
  margin-left: 8px;
  font-weight: bold;
`;
