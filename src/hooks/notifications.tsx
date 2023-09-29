import React, { createContext, useContext, useState, useCallback } from 'react';

interface NotificationsProviderData {
  buttonActive: boolean;
  notificationsCount: number;
  handleNotificationsCount: (value: number) => void;
  handleNotificationsButton: (value: boolean) => void;
}

const NotificationsContext = createContext<NotificationsProviderData>({} as NotificationsProviderData);

const NotificationsProvider: React.FC = ({children})=>{

  const [buttonActive, setButtonActive] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const handleNotificationsCount = useCallback((value: number)=>{
    return setNotificationsCount(value);
  }, []);

  const handleNotificationsButton = useCallback((value: boolean)=>{
    return setButtonActive(value);
  }, [])

  return (
    <NotificationsContext.Provider value={{buttonActive, notificationsCount, handleNotificationsCount, handleNotificationsButton}}>
      {children}
    </NotificationsContext.Provider>
  );
};

function useNotifications(): NotificationsProviderData {
  const context = useContext(NotificationsContext);

  if(!context){
    throw new Error('useNotifications must be used with an NotificationsProvider');
  }

  return context;
}

export { NotificationsProvider, useNotifications };
