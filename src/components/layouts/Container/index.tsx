import Chat from '@/components/Chat';
import ChatList from '@/components/ChatList';
import CreateNewGroup from '@/components/CreateNewGroup';
import Header from '@/components/Header';
import NoChatSelected from '@/components/NoChatSelected';
import Perfil from '@/components/Perfil';
import SearchChats from '@/components/SearchChats';
import { SocketContext } from '@/context/Socket';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useMemo, useState } from 'react';

export type leftSectionTypeProps = null | 'newGroup' | 'settings';

const Container = () => {
  const { chats, room } = useContext(SocketContext);
  const [leftSectionType, changeLeftSectionType] = useState<leftSectionTypeProps>(null);
  const [nameFilter, setUserNameFilter] = useState('');
  const [hasNotReadMessagesFilter, setHasNotReadMessagesFilter] = useState(false);

  const chatsToShow = useMemo(() => {
    const chatsList = [...chats.values()];
    if (nameFilter === '' && !hasNotReadMessagesFilter) return chatsList;
    if (nameFilter === '' && hasNotReadMessagesFilter)
      return chatsList.filter(
        (chat) => chat && chat.notificationCount && chat.notificationCount > 0,
      );
    if (nameFilter !== '' && !hasNotReadMessagesFilter)
      return chatsList.filter((chat) => chat.name.toLowerCase().includes(nameFilter.toLowerCase()));
    if (nameFilter !== '' && hasNotReadMessagesFilter)
      return chatsList
        .filter((chat) => chat.name.toLowerCase().includes(nameFilter.toLowerCase()))
        .filter((chat) => chat && chat.notificationCount && chat.notificationCount > 0);
    return chatsList;
  }, [chats, nameFilter, hasNotReadMessagesFilter]);

  const hasChatOpen = !!room;
  return (
    <div className='w-full h-full flex shadow-lg'>
      <section className='h-full bg-white dark:bg-primaryDark flex flex-col min-w-[340px] max-w-[480px] w-[44%] border-r dark:border-r-textGray/60 relative overflow-hidden'>
        <AnimatePresence>
          {leftSectionType === 'newGroup' && (
            <motion.div
              className='w-full h-full overflow-hidden absolute top-0 bottom-0 left-0 right-0 z-30'
              key='newGroup'
              transition={{ ease: 'easeInOut', duration: 0.2 }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
            >
              <CreateNewGroup changeLeftSectionType={() => changeLeftSectionType(null)} />
            </motion.div>
          )}
          {leftSectionType === 'settings' && (
            <motion.div
              className='w-full h-full overflow-hidden absolute top-0 bottom-0 left-0 right-0 z-30'
              key='settings'
              transition={{ ease: 'easeInOut', duration: 0.2 }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
            >
              <Perfil changeLeftSectionType={() => changeLeftSectionType(null)} />
            </motion.div>
          )}
        </AnimatePresence>
        <Header changeLeftSectionType={changeLeftSectionType} />
        <SearchChats
          hasNotReadMessagesFilter={hasNotReadMessagesFilter}
          toggleNotReadMessagesFilter={() => setHasNotReadMessagesFilter((prev) => !prev)}
          handleSearchUserInputChange={(e) => setUserNameFilter(e.target.value)}
        />
        <ChatList usersList={chatsToShow} hasNotReadMessagesFilter={hasNotReadMessagesFilter} />
      </section>
      <section className='w-full h-full'>{hasChatOpen ? <Chat /> : <NoChatSelected />}</section>
    </div>
  );
};

export default Container;
