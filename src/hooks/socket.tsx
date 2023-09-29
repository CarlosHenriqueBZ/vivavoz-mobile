import React, { createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';
import socket from '../services/socket';

interface SocketContextData {
  socket: Socket;
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

const SocketProvider: React.FC = ({children})=>{
  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
}

function useSocket(): SocketContextData {
  const context = useContext(SocketContext);

  if(!context){
    throw new Error('useSocket must be used with an SocketProvider');
  }

  return context;
}

export {SocketProvider, useSocket};
