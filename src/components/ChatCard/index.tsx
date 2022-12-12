/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { SocketContext } from '@/context/Socket';
import Message from '@/models/Message';
import { useContext } from 'react';
import Avatar from '../Avatar';

interface ChatCardProps {
  id: string;
  name: string;
  profileImage: string | null;
  lastMessage: Message | null | undefined;
  notificationCount: number | undefined;
}

const ChatCard = ({ id, name, profileImage, lastMessage, notificationCount }: ChatCardProps) => {
  const { openChat, room } = useContext(SocketContext);

  const isCurrentRoom = room?.id === id;
  return (
    <div
      onClick={() => openChat({ id, name, profileImage })}
      className={`flex cursor-pointer border-b dark:border-b-textGray/60 dark:text-[#E9EDEF] text-black dark:hover:bg-[#202C33] hover:bg-primaryLightest ${
        isCurrentRoom ? 'dark:bg-[#202C33] bg-primaryLightest' : ''
      }`}
    >
      <div className='self-center border-b-0'>
        <Avatar alt={name} src={profileImage} className='w-12 h-12 rounded-full ml-3 border-b-0' />
      </div>
      <div className='flex flex-col ml-4  pl-0 p-4'>
        <h3 className='truncate'>{name}</h3>
        <p className='text-sm opacity-70 truncate'>
          {lastMessage?.text || 'Envie a sua primeira mensagem'}
        </p>
      </div>
      <div className='text-xs ml-auto mt-4 mr-4 flex flex-col'>
        <div className='opacity-70 truncate'>
          {lastMessage?.createdAt &&
            new Date(lastMessage?.createdAt).toLocaleTimeString().slice(0, 5)}
        </div>

        {notificationCount && notificationCount > 0 ? (
          <div className='flex mt-2 ml-1 w-5 h-5 text-center rounded-full bg-primaryHard dark:bg-primary text-white font-bold items-center justify-center'>
            {notificationCount}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatCard;
