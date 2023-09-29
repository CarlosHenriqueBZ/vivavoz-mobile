import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';
import {Container, Header, LeftHeader, RightHeader, Title, SafeArea} from './styles';
import { useRoute } from '@react-navigation/native';
// import NotificationsIndicator from '../NotificationsIndicator';


interface IInnerProps{
  name: string;
}

const InnerPages: React.FC<IInnerProps> = ({children, name}) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeArea edges={['top']}>
    <Container>
      <Header>
        <LeftHeader routeName={route.name}>
          {route.name !== 'Dashboard' && <HeaderBackButton labelVisible={false} tintColor="#ffffff" onPress={()=>navigation.goBack()}/>}
          <Title>{name}</Title>
        </LeftHeader>
        <RightHeader>
          {/* <NotificationsIndicator /> */}
        </RightHeader>
      </Header>
      {children}
    </Container>
    </SafeArea>
  );
};

export default InnerPages;
