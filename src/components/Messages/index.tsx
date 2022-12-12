import { SocketContext } from '@/context/Socket';
import { convertDataIntoHHmm } from '@/helpers/convertDataIntoHHmm';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useContext } from 'react';
import Avatar from '../Avatar';

const Messages = () => {
  const { myData, chats, room } = useContext(SocketContext);
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div ref={animationParent} className='overflow-y-auto mb-1 text-white text-sm h-full z-10'>
      <>
        {chats.get(room!.id)?.type === 'user' ? (
          <>
            {room?.messages.map(({ text, from, createdAt, id }) => {
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
          </>
        ) : null}

        {chats.get(room!.id)?.type === 'group' ? (
          <>
            {room?.messages.map(({ text, from, createdAt, id }) => {
              const isMyMessage = from.id === myData.id;
              const wrapperClass = isMyMessage
                ? 'flex justify-end p-1 text-black dark:text-white'
                : 'flex p-1 text-black dark:text-white';
              const textClass = isMyMessage
                ? 'bg-primaryMedium dark:bg-[#005C4B] flex relative rounded-l-lg rounded-br-lg drop-shadow-md'
                : 'bg-white dark:bg-[#202C33] flex relative rounded-r-lg rounded-bl-lg drop-shadow-md';
              return (
                <div key={id} className={wrapperClass}>
                  {!isMyMessage && (
                    <div className='self-start justify-self-start ml-2 mr-1'>
                      <Avatar alt={from.name} size={28} src={chats.get(from.id)?.profileImage} />
                    </div>
                  )}
                  <div className={textClass}>
                    <div className='px-3 py-2'>
                      {!isMyMessage && (
                        <div className='text-sm mb-1 text-primary font-semibold'>{from.name}</div>
                      )}
                      <div>{text}</div>
                    </div>
                    <div className='text-[10px] opacity-50 self-end pb-[1px] pr-2'>
                      {convertDataIntoHHmm(createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
      </>
      <div id='bottom-anchor' />
    </div>
  );
};

export default Messages;
