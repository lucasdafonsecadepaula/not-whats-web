/* eslint-disable @typescript-eslint/no-empty-function */
import useSocket from '@/hooks/useSocket';
import { createContext } from 'react';

type ContextProps = ReturnType<typeof useSocket>;

export const SocketContext = createContext({
  myData: { id: '', name: '', profileImage: '' },
  chats: new Map(),
  room: null,
  changeMyConfig: () => {},
  openChat: () => {},
  sendMensage: () => {},
  createGroup: () => {},
} as ContextProps);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { myData, chats, room, changeMyConfig, openChat, sendMensage, createGroup } = useSocket();

  return (
    <SocketContext.Provider
      value={{ myData, chats, room, changeMyConfig, openChat, sendMensage, createGroup }}
    >
      {children}
    </SocketContext.Provider>
  );
}
