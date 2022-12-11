import Message from '@/models/Message';
import User, { UsersWithLastMessage } from '@/models/User';
import { io, Socket } from 'socket.io-client';

type SendMessage = { message: { to: { id: string; name: string }; text: string } };

interface ServerToClientEvents {
  'init:session': ({ sessionId }: { sessionId: string }) => void;
  'user:all-users': ({ allUsers }: { allUsers: UsersWithLastMessage[] }) => void;
  'user:new-user-connected': ({ newUser }: { newUser: UsersWithLastMessage }) => void;
  'user:user-disconnected': ({ user }: { user: User }) => void;
  'config:user': ({ user }: { user: User }) => void;
  'config:new-peer': ({ userPeer }: { userPeer: { peerId: string; id: string } }) => void;
  'message:receive': ({ newMessage }: { newMessage: Message }) => void;
  'message:history-by-user': ({ messages }: { messages: Message[] }) => void;
}

type Group = {
  id: string;
  userName: string;
  profileImage: string | null;
};

interface ClientToServerEvents {
  'message:send': ({ message }: SendMessage) => void;
  'message:receive-check': ({ message }: { message: Message }) => void;
  'message:history-by-user': ({ userId }: { userId: string }) => void;
  'config:my': ({ newConfig }: { newConfig: Partial<User> }) => void;
  'config:set-my-peer': ({ peerId }: { peerId: string }) => void;
  'group:create': ({ group }: { group: Group }) => void;
}

const urlSocket = import.meta.env.VITE_API_SOCKET || 'http://localhost:8000';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(urlSocket, {
  autoConnect: false,
});
