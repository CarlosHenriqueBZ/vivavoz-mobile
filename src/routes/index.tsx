import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { useAuth } from '../hooks/auth'

const Routes: React.FC = () => {
  const {worker, loading} = useAuth();

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#006633'}}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return worker ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
