import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';

import {
  ComplaintContainer,
  ComplaintItemNotificationMarker,
  ComplaintItemNotificationMarkerText,
  ComplaintProtocolContainer,
  ComplaintProtocolLabel,
  ComplaintProtocolText,
  ComplaintStatusContainer,
  ComplaintStatusText,
  ComplaintItemBody,
  ComplaintItemFooter,
  ComplaintDateContainer,
  ComplaintDateLabel,
  ComplaintDateText,
} from './styles';

interface Complaint {
  id: string;
  protocol: string;
  status: string;
  unseen_msg_count: number;
  createdAt: string;
  updatedAt: string;
}

interface ComplaintProps {
  complaint: Complaint;
}

const ComplaintItem: React.FC<ComplaintProps> = ({complaint}: any) => {
  const navigation = useNavigation();

  return (
    <ComplaintContainer
      onPress={() =>
        navigation.navigate('ShowComplaint', {complaint_id: complaint.id, complaint_status: 'show-complaint'})
      }>
      <ComplaintItemBody>
        <ComplaintProtocolContainer>
          <ComplaintProtocolLabel>Protocolo</ComplaintProtocolLabel>
          {complaint.protocol ? (
            <ComplaintProtocolText>{complaint.protocol}</ComplaintProtocolText>
          ) : (
            <ComplaintProtocolText>-</ComplaintProtocolText>
          )}
        </ComplaintProtocolContainer>

        <ComplaintStatusContainer status={complaint.status}>
          {complaint.status === 1 && (
            <ComplaintStatusText>Enviado</ComplaintStatusText>
          )}
          {complaint.status === 2 && (
            <ComplaintStatusText>Em análise</ComplaintStatusText>
          )}
          {complaint.status === 3 && (
            <ComplaintStatusText>Finalizado</ComplaintStatusText>
          )}
        </ComplaintStatusContainer>
      </ComplaintItemBody>

      <ComplaintItemFooter>
        <ComplaintDateContainer>
          <ComplaintDateLabel>Enviado em</ComplaintDateLabel>
          <ComplaintDateText>
            {format(new Date(complaint.createdAt), 'dd/MM/yyyy')}
          </ComplaintDateText>
        </ComplaintDateContainer>

        <ComplaintDateContainer>
          <ComplaintDateLabel>Atualizado em</ComplaintDateLabel>
          <ComplaintDateText>
            {format(new Date(complaint.updatedAt), 'dd/MM/yyyy')}
          </ComplaintDateText>
        </ComplaintDateContainer>

        {complaint.unseen_msg_count && (
          <ComplaintItemNotificationMarker>
            <ComplaintItemNotificationMarkerText>
              {complaint.unseen_msg_count}
            </ComplaintItemNotificationMarkerText>
          </ComplaintItemNotificationMarker>
        )}
      </ComplaintItemFooter>
    </ComplaintContainer>
  );
};

export default ComplaintItem;
