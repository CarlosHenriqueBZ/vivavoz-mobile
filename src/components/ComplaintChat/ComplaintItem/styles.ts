import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

interface StatusContainerProps {
  status: number;
}

export const ComplaintContainer = styled(RectButton)`
  padding: 24px;
  background: #ffffff;
  border-radius: 20px;

  position: relative;
  margin-top: 10px;
`;

export const ComplaintItemBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ComplaintItemFooter = styled.View`
  margin-top: 16px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ComplaintItemNotificationMarker = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #f38725;

  justify-content: center;
  align-items: center;

  align-self: flex-end;
`;

export const ComplaintItemNotificationMarkerText = styled.Text`
  color: #ffffff;
  font-family: 'AvenirNextLTPro-Regular';
`;

export const ComplaintProtocolContainer = styled.View`
  flex-direction: column;
`;

export const ComplaintProtocolLabel = styled.Text`
  font-family: 'AvenirNextLTPro-Regular';
  color: #666666;
`;

export const ComplaintProtocolText = styled.Text`
  font-family: 'AvenirNextLTPro-Bold';
  font-size: 18px;
  color: #006633;
`;

export const ComplaintStatusContainer = styled.View<StatusContainerProps>`
  ${(props) => props.status === 1 && 'background: #4ec2fd'}
  ${(props) => props.status === 2 && 'background: #F38725'}
  ${(props) => props.status === 3 && 'background: #006633'}
  padding: 8px 16px;
  border-radius: 20px;
`;

export const ComplaintStatusText = styled.Text`
  color: #ffffff;
  font-family: 'AvenirNextLTPro-Demi';
`;

export const ComplaintDateContainer = styled.View`
  flex-direction: column;
  margin-right: 24px;
`;

export const ComplaintDateLabel = styled.Text`
  color: #666666;
  font-family: 'AvenirNextLTPro-Regular';
`;

export const ComplaintDateText = styled.Text`
  color: #666666;
  font-family: 'AvenirNextLTPro-Demi';
`;
