import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useNotifications } from '../../hooks/notifications';

import {Container, Icon, Badge, BadgeText} from './styles';

const NotificationsIndicator: React.FC = () => {
  const { buttonActive, notificationsCount } = useNotifications();

  const history = useNavigation();

  return (
    <Container active={buttonActive} onPress={() => history.navigate('Notifications')}>
      <Icon name="bell" size={24} />
      {notificationsCount > 0 && (
      <Badge>
        <BadgeText>{notificationsCount}</BadgeText>
      </Badge>
      )}
    </Container>
  );
};

export default NotificationsIndicator;
