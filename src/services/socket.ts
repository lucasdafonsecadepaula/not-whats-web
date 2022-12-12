import { Chat, ChatWithOnlyUserType } from '@/models/Chat';
import Message from '@/models/Message';
import { io, Socket } from 'socket.io-client';

type SendMessage = {
  message: { to: { id: string; name: string }; from: { id: string; name: string }; text: string };
  chatId: string;
};

interface ServerToClientEvents {
  'init:session': ({ sessionId }: { sessionId: string }) => void;
  'chat:all-chats': ({ allChats }: { allChats: Chat[] }) => void;
  'chat:new-chat': ({ newChat }: { newChat: Chat }) => void;
  'chat:remove-chat': ({ chat }: { chat: Chat }) => void;
  'config:chat': ({ chat }: { chat: Chat }) => void;
  'config:new-peer': ({ chatPeer }: { chatPeer: { peerId: string; id: string } }) => void;
  'message:receive': ({ newMessage, chatId }: { newMessage: Message; chatId: string }) => void;
  'message:history-by-chat': ({ messages }: { messages: Message[] }) => void;
}

interface ClientToServerEvents {
  'message:send': ({ message }: SendMessage) => void;
  'message:receive-check': ({ message, chatId }: { message: Message; chatId: string }) => void;
  'message:history-by-chat': ({ chatId }: { chatId: string }) => void;
  'config:my': ({ newConfig }: { newConfig: { name?: string; profileImage?: string } }) => void;
  'config:set-my-peer': ({ peerId }: { peerId: string }) => void;
  'group:create': ({
    group,
  }: {
    group: { groupName: string; groupUsers: ChatWithOnlyUserType[] };
  }) => void;
}

const urlSocket = import.meta.env.VITE_API_SOCKET || 'http://localhost:8000';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(urlSocket, {
  autoConnect: false,
});
