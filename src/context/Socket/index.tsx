/* eslint-disable @typescript-eslint/no-empty-function */
import useSocket from '@/hooks/useSocket';
import { Room } from '@/models/Room';
import User, { UsersMap } from '@/models/User';
import { createContext } from 'react';

export const SocketContext = createContext({
  myData: { id: '', name: '', profileImage: '' } as User,
  users: new Map() as UsersMap,
  room: null as Room,
  changeMyConfig: (_newConfig: Omit<Partial<User>, 'id'>) => {},
  openChat: ({ id: _id, name: _name }: { id: string; name: string }) => {},
  sendMensage: ({ text: _text, to: _to }: { text: string; to: { id: string; name: string } }) => {},
  createGroup: () => {},
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { myData, users, room, changeMyConfig, openChat, sendMensage, createGroup } = useSocket();

  return (
    <SocketContext.Provider
      value={{ myData, users, room, changeMyConfig, openChat, sendMensage, createGroup }}
    >
      {children}
    </SocketContext.Provider>
  );
}
