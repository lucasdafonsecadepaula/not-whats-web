import { Chat, ChatMap } from '@/models/Chat';
import Message from '@/models/Message';

type Action =
  | {
      type: 'SET-ALL-CHATS';
      payload: Chat[];
    }
  | {
      type: 'ADD-NEW-CHAT' | 'REMOVE-CHAT';
      payload: Chat;
    }
  | {
      type: 'UPDATE-CHAT-CONFIG';
      payload: Chat;
    }
  | {
      type: 'SET-CHAT-PEER-ID';
      payload: { chatId: string; peerId: string };
    }
  | {
      type: 'RECEIVE-MESSAGE';
      payload: { chatId: string; message: Message; isThisRoomOpen: boolean };
    }
  | {
      type: 'RESET-NOTIFICATION';
      payload: { userId: string };
    };

export default function chatsReducer(state: ChatMap, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET-ALL-CHATS': {
      return new Map(payload.map((chat) => [chat.id, chat]));
    }
    case 'ADD-NEW-CHAT': {
      const newState = new Map(state);
      newState.set(payload.id, payload);
      return newState;
    }
    case 'REMOVE-CHAT': {
      const newState = new Map(state);
      newState.delete(payload.id);
      return newState;
    }
    case 'UPDATE-CHAT-CONFIG': {
      const newState = new Map(state);
      const chat = newState.get(payload.id);
      newState.set(payload.id, { ...chat, ...payload });
      return newState;
    }
    case 'SET-CHAT-PEER-ID': {
      const newState = new Map(state);
      const chat = newState.get(payload.chatId);
      if (!chat) return newState;
      newState.set(payload.chatId, { ...chat, peerId: payload.peerId });
      return newState;
    }
    case 'RECEIVE-MESSAGE': {
      const newState = new Map(state);
      const chat = newState.get(payload.chatId);
      if (!chat) return newState;
      const notificationCount = chat.notificationCount ? chat.notificationCount + 1 : 1;
      newState.set(payload.chatId, {
        ...chat,
        lastMessage: payload.message,
        ...(payload.isThisRoomOpen ? {} : { notificationCount }),
      });
      return newState;
    }
    case 'RESET-NOTIFICATION': {
      const newState = new Map(state);
      const chat = newState.get(payload.userId);
      if (!chat) return newState;
      newState.set(payload.userId, {
        ...chat,
        notificationCount: 0,
      });
      return newState;
    }
    default:
      return state;
  }
}
