import Message from './Message';

export default interface User {
  id: string;
  name: string;
  profileImage: string | null;
}

export type UsersWithLastMessage = User & { lastMessage?: Message | null | undefined };

export type UsersMap = Map<
  string,
  UsersWithLastMessage & { peerId?: string; notificationCount?: number }
>;
