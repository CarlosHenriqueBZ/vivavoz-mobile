import React, {useEffect, useState, useCallback} from 'react';
import {Platform} from 'react-native';

import InputMessage from '../../../components/ComplaintChat/InputMessage';
import ComplaintMessage from '../../../components/ComplaintChat/ComplaintMessage';
import {database} from '../../../data/database';
import withObservables from '@nozbe/with-observables';
import Complaint from '../../../data/models/Complaint';
import Message from '../../../data/models/Message';
import {Q} from '@nozbe/watermelondb';
import {useComplaint} from '../../../hooks/complaint';

import {
  Container,
  ChatContainer,
  ChatBody,
  ChatMessages,
  ChatMain,
} from './styles';

interface IProps {
  complaint: Complaint;
  complaintMessages: Message[];
  route: any;
}

const ShowComplaint: React.FC<IProps> = ({
  complaint,
  complaintMessages,
  route,
}) => {
  const {handleCreateFirstMessage} = useComplaint();
  const [messages, setMessages] = useState<Message[]>([] as Message[]);

  const {complaint_status} = route.params;

  const handleFirstMessage = useCallback(
    async () => await handleCreateFirstMessage(complaint.id),
    [],
  );

  useEffect(() => {
    if (complaint_status === 'new-complaint') {
      handleFirstMessage();
    }
  }, [handleFirstMessage]);

  useEffect(() => {
    setMessages(complaintMessages);
  }, [complaintMessages]);

  return (
    <Container>
      <ChatContainer>
        <ChatMain
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 112 : 80}>
          <ChatBody>
            <ChatMessages
              inverted
              data={messages}
              keyExtractor={(item: any) => item._raw.id}
              renderItem={({item}: any) => <ComplaintMessage message={item} />}
            />
            <InputMessage complaint={complaint} />
          </ChatBody>
        </ChatMain>
      </ChatContainer>
    </Container>
  );
};

const enhance = withObservables([], ({route}: any) => ({
  complaint: database.collections
    .get<Complaint>('complaints')
    .findAndObserve(route.params.complaint_id),
  complaintMessages: database.collections
    .get<Message>('messages')
    .query(
      Q.where('complaint_id', route.params.complaint_id),
      Q.sortBy('created_at', 'desc'),
    )
    .observe(),
}));

export default enhance(ShowComplaint);
