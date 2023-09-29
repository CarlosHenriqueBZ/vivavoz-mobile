import React, { createContext, useContext, useCallback } from 'react';
import { sync } from '../services/sync';

type SyncContextData = {
  syncData: () => Promise<void>;
};

const SyncContext = createContext<SyncContextData>({} as SyncContextData);
const SyncProvider: React.FC = ({ children }) => {
  const syncData = useCallback(async () => {
    try{
      await sync();
    }catch(error){
      console.error(error);
    }
  }, []);
  return (
    <SyncContext.Provider value={{ syncData }}>
      {children}
    </SyncContext.Provider>
  );
};

function useSync(){
  const context = useContext(SyncContext);
  if(!context){
    throw new Error('useSyncContext must be used within a SyncProvider');
  }
  return context;
}

export { SyncProvider, useSync };
