import { SocketContext } from '@/context/Socket';
import { convertDataIntoHHmm } from '@/helpers/convertDataIntoHHmm';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useContext, useState } from 'react';
import Avatar from '../Avatar';
import SearchIcon from '../icons/SearchIcon';
import SendIcon from '../icons/SendIcon';

const Chat = () => {
  const { myData, users, room, sendMensage } = useContext(SocketContext);
  const [animationParent] = useAutoAnimate<any>();
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
        <Avatar alt='avatar' src={users.get(room.id)?.profileImage} />
        <div className='w-full ml-4'>
          <h1 className='text-black/70 dark:text-[#E9EDEF] font-bold'>{room.name}</h1>
        </div>
        <span className='rounded-full cursor-pointer'>
          <SearchIcon />
        </span>
      </div>

      <div ref={animationParent} className='overflow-y-auto mb-1 text-white text-sm h-full z-10'>
        {room.messages.map(({ text, from, createdAt, id }) => {
          const isMyMessage = from.id === myData.id;
          const wrapperClass = isMyMessage
            ? 'flex justify-end p-1 text-black dark:text-white'
            : 'flex p-1 text-black dark:text-white';
          const textClass = isMyMessage
            ? 'bg-primaryMedium dark:bg-[#005C4B] flex relative rounded-l-lg rounded-br-lg drop-shadow-md'
            : 'bg-white dark:bg-[#202C33] flex relative rounded-r-lg rounded-bl-lg drop-shadow-md';
          return (
            <div key={id} className={wrapperClass}>
              <div className={textClass}>
                <div className='px-3 py-2'>{text}</div>
                <div className='text-[10px] opacity-50 self-end pb-[1px] pr-2'>
                  {convertDataIntoHHmm(createdAt)}
                </div>
              </div>
            </div>
          );
        })}
        <div id='bottom-anchor' />
      </div>

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
