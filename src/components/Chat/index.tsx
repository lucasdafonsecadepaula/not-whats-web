import { SocketContext } from '@/context/Socket';

import { useContext, useState } from 'react';
import Avatar from '../Avatar';
import SendIcon from '../icons/SendIcon';
import Messages from '../Messages';

const Chat = () => {
  const { chats, room, sendMensage } = useContext(SocketContext);

  const [textInputValue, setTextInputValue] = useState('');

  if (!room) return null;

  const handleSendMessage = () => {
    if (!textInputValue) return;
    sendMensage({ text: textInputValue, to: { id: room.id, name: room.name } });
    setTextInputValue('');
  };

  return (
    <div className='flex flex-col h-full bg-secondaryDark dark:bg-primaryDark relative'>
      <div className='w-full h-14 bg-primaryLightest dark:bg-[#202C33] flex items-center py-3 px-4 z-10'>
        <Avatar alt='avatar' src={chats.get(room.id)?.profileImage} />
        <div className='w-full ml-4'>
          <h1 className='text-black/70 dark:text-[#E9EDEF] font-bold truncate'>{room.name}</h1>
        </div>
        {/* <span className='rounded-full cursor-pointer'>
          <SearchIcon />
        </span> */}
      </div>

      <Messages />

      <div className='h-20 bg-primaryLightest dark:bg-[#202C33] p-4 flex items-center z-10'>
        <input
          placeholder='Digite uma mensagem'
          type='text'
          className='peer w-full text-black/70 bg-white border-none dark:bg-[#2A3942] dark:text-[#E9EDEF]
          focus:outline-none focus:border-none focus:ring-0 rounded-lg'
          value={textInputValue}
          onChange={(e) => setTextInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className='opacity-60 cursor-pointer peer-focus:text-primary ml-6 mr-4'
        >
          <SendIcon />
        </button>
      </div>

      <div className='absolute top-0 bottom-0 left-0 right-0 bg-chat dark:opacity-10' />
    </div>
  );
};

export default Chat;
