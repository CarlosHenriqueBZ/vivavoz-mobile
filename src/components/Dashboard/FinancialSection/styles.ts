import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface TextProps {
  status: 'warning' | 'danger' | 'success';
}

export const Container = styled.View`
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 24px 16px;
  background: white;
`;

export const TitleContainer = styled.View`
  border-bottom-width: 1px;
  border-color: #ccc;
  text-align: center;
`

export const TitleText = styled.Text`
  font-size: 16px;
  text-align: center;
  font-family: 'AvenirNextLTPro-Demi';
  color: #006633;
  padding-bottom: 24px;
`;

export const InvoiceContainer = styled.View`
  flex-direction: row;
  padding: 32px 0;
  border-bottom-width: 1px;
  border-color: #ccc;
`

export const InvoiceData = styled.View`
  flex: 1;
`;

export const InvoiceValue = styled.Text`
  font-family: 'AvenirNextLTPro-Demi';
  font-size: 22px;
  margin-bottom: 8px;
  color: #006633;
`;

export const InvoiceDueDate = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
`;

export const InvoiceStatus = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const InvoiceStatusText = styled.Text<TextProps>`
  font-family: 'AvenirNextLTPro-Demi';
  color: ${(props) => props.status === 'success' ? '#006633' : props.status === 'warning' ? '#ffcc00' : '#cc3300'};
  margin-left: 8px;
  font-size: 16px;
`

export const ButtonContainer = styled(RectButton)``;

export const ButtonText = styled.Text`
  border-color: #ccc;
  border-top-width: 1px;
  text-align: center;
  font-family: 'AvenirNextLTPro-Regular';
  padding: 16px 0;
`;

export const NoAvailableText = styled.Text`
  margin-bottom: 16px;
`
