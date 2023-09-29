import React, { useEffect } from 'react';
import InnerPages from '../../components/InnerPages';
import NotificationItem from  './NotificationItem';

import { useNotifications } from '../../hooks/notifications';

import {
  Container,
} from './styles';

const Notifications: React.FC = ()=>{
  const { handleNotificationsCount } = useNotifications();

  useEffect(()=>{
    handleNotificationsCount(0);
  }, []);

  return (
    <InnerPages name="Notificações" >
      <Container>

        <NotificationItem icon="eye" text="" date="" />
        <NotificationItem icon="eye" text="" date="" />
        <NotificationItem icon="eye" text="" date="" />
        <NotificationItem icon="eye" text="" date="" />
        <NotificationItem icon="eye" text="" date="" />

      </Container>
    </InnerPages>
  )
}

export default Notifications;
