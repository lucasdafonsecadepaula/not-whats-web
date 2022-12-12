import { Chat } from '@/models/Chat';
import ChatCard from '../ChatCard';

interface ChatListProps {
  hasNotReadMessagesFilter: boolean;
  usersList: Chat[];
}

const ChatList = ({ usersList, hasNotReadMessagesFilter }: ChatListProps) => {
  return (
    <div className='w-full h-full bg-white dark:bg-primaryDark overflow-y-scroll'>
      {hasNotReadMessagesFilter && usersList.length === 0 ? (
        <>
          <div className='flex items-center justify-center h-16'>
            <p className='text-textGray dark:text-textGrayDark text-sm font-medium'>
              Nenhuma conversa com mensagens não lidas
            </p>
          </div>
        </>
      ) : null}

      {usersList.map(({ id, name, profileImage, lastMessage, notificationCount }) => (
        <div key={id}>
          <ChatCard
            id={id}
            name={name}
            profileImage={profileImage}
            lastMessage={lastMessage}
            notificationCount={notificationCount}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatList;
