import styled from 'styled-components/native';

export const NotificationContainer = styled.TouchableOpacity`
  padding: 16px 24px;
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  flex-direction: row;
  flex: 1;
  width: 90%;
`

export const NotificationIcon = styled.View`
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  padding: 16px;
  border-radius: 48px;
`;

export const NotificationContent = styled.View`
  padding-left: 24px;
  flex-direction: column;
  justify-content: space-between;
`;

export const NotificationText = styled.Text`
  font-size: 16px;
  font-family: 'AvenirNextLTPro-Bold';
  color: #006633;
  margin-top: 8px;
`;

export const NotificationTimestamp = styled.Text`
  font-size: 12px;
  font-family: 'AvenirNextLTPro-Demi';
  color: #333;
`;
