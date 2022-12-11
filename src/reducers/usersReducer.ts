import Message from '@/models/Message';
import User, { UsersMap, UsersWithLastMessage } from '@/models/User';

type Action =
  | {
      type: 'SET-ALL-USERS';
      payload: UsersWithLastMessage[];
    }
  | {
      type: 'ADD-NEW-USER' | 'REMOVE-USER';
      payload: UsersWithLastMessage;
    }
  | {
      type: 'UPDATE-USER-CONFIG';
      payload: User;
    }
  | {
      type: 'SET-USER-PEER-ID';
      payload: { userId: string; peerId: string };
    }
  | {
      type: 'ATT-LAST-MESSAGE' | 'ATT-NOTIFICATION';
      payload: { lastMessage: Message; userId: string };
    }
  | {
      type: 'RESET-NOTIFICATION';
      payload: { userId: string };
    };

export default function usersReducer(state: UsersMap, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET-ALL-USERS': {
      return new Map(payload.map((user) => [user.id, user]));
    }
    case 'ADD-NEW-USER': {
      const newState = new Map(state);
      newState.set(payload.id, payload);
      return newState;
    }
    case 'REMOVE-USER': {
      const newState = new Map(state);
      newState.delete(payload.id);
      return newState;
    }
    case 'UPDATE-USER-CONFIG': {
      const newState = new Map(state);
      const user = newState.get(payload.id);
      newState.set(payload.id, { ...user, ...payload });
      return newState;
    }
    case 'SET-USER-PEER-ID': {
      const newState = new Map(state);
      const user = newState.get(payload.userId);
      if (!user) return newState;
      newState.set(payload.userId, { ...user, peerId: payload.peerId });
      return newState;
    }
    case 'ATT-LAST-MESSAGE': {
      const newState = new Map(state);
      const user = newState.get(payload.userId);
      if (!user) return newState;
      newState.set(payload.userId, { ...user, lastMessage: payload.lastMessage });
      return newState;
    }
    case 'ATT-NOTIFICATION': {
      const newState = new Map(state);
      const user = newState.get(payload.userId);
      if (!user) return newState;
      const notificationCount = user.notificationCount ? user.notificationCount + 1 : 1;
      newState.set(payload.userId, {
        ...user,
        lastMessage: payload.lastMessage,
        notificationCount,
      });
      return newState;
    }
    case 'RESET-NOTIFICATION': {
      const newState = new Map(state);
      const user = newState.get(payload.userId);
      if (!user) return newState;
      newState.set(payload.userId, {
        ...user,
        notificationCount: 0,
      });
      return newState;
    }
    default:
      return state;
  }
}
