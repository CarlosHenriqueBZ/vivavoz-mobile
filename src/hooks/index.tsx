import React from 'react';

import { AuthProvider } from './auth'
// import { SocketProvider } from './socket';
import { NotificationsProvider } from './notifications';
import { ComplaintProvider } from './complaint';
import { SyncProvider } from './sync';

const AppProvider: React.FC = ({children})=>{
  return (
    <AuthProvider>
      <NotificationsProvider>
        <SyncProvider>
          <ComplaintProvider>
            {children}
          </ComplaintProvider>
        </SyncProvider>
      </NotificationsProvider>
    </AuthProvider>
  );
}

export default AppProvider;
