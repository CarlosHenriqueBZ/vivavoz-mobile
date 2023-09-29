import styled from 'styled-components/native';

interface TextProps {
  status: 'danger' | 'success' | 'warning';
}

export const InvoiceContainer = styled.View`
  background: white;
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
  border-bottom-width: 1px;
  border-color: #ccc;
  padding-bottom: 16px;
`;

export const InvoiceData = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const InvoiceInfoContainer = styled.View`
    margin-left: 16px;
`

export const InvoiceDateText = styled.Text`
  font-size: 16px;
  font-family: 'AvenirNextLTPro-Demi';
  margin-bottom: 4px;
`;

export const InvoiceStatusText = styled.Text<TextProps>`
  color: ${(props) => props.status === 'success' ? '#006633' : props.status === 'warning' ? '#ffcc00' : '#cc3300'};
`;

export const InvoiceValue = styled.View``

export const InvoiceValueText = styled.Text`
  font-size: 20px;
  font-family: 'AvenirNextLTPro-Demi';
`;
