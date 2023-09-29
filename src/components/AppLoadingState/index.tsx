import React from 'react';
import {View, ActivityIndicator} from  'react-native';

const AppLoadingState: React.FC  = ()=>{
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
        <ActivityIndicator size="large" color="#ccc" />
    </View>
  )
}

export default AppLoadingState
