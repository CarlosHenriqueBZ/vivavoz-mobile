import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  NotificationContainer,
  NotificationIcon,
  NotificationContent,
  NotificationText,
  NotificationTimestamp
} from './styles';

interface IProps {
  icon: string;
  text: string;
  date: Date;
}

const NotificationItem: React.FC<IProps> = ({icon, text, date})=>{
  return (
    <NotificationContainer>
      <NotificationIcon>
        <Icon name={icon} size={24} color="#ff6600"/>
      </NotificationIcon>
      <NotificationContent>
        <NotificationText>A denúncia 398349343 foi respondida</NotificationText>
        <NotificationTimestamp>há 5 minutos</NotificationTimestamp>
      </NotificationContent>
    </NotificationContainer>
  );
}

export default NotificationItem;
