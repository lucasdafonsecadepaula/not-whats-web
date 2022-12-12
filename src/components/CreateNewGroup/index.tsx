/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { SocketContext } from '@/context/Socket';
import { ChatWithOnlyUserType, ChatWithOnlyUserTypeMap } from '@/models/Chat';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useMemo, useState } from 'react';
import Avatar from '../Avatar';
import ArrowIcon from '../icons/ArrowIcon';
import CloseIcon from '../icons/CloseIcon';
import DoneIcon from '../icons/DoneIcon';

interface CreateNewGroupProps {
  changeLeftSectionType: () => void;
}
type StepProps = 'choose-people' | 'choose-name';

const CreateNewGroup = ({ changeLeftSectionType }: CreateNewGroupProps) => {
  const [nameFilter, setUserNameFilter] = useState('');
  const [step, setStep] = useState<StepProps>('choose-people');
  const { chats, createGroup } = useContext(SocketContext);
  const [seletedUsers, setSelectedUsers] = useState<ChatWithOnlyUserTypeMap>(new Map());
  const [groupName, setGroupName] = useState('');

  const usersByFirstLetter = useMemo(() => {
    const allChats = [...chats.values()];
    const allUsers = allChats.filter((chats) => chats.type === 'user') as ChatWithOnlyUserType[];
    const map = new Map<string, ChatWithOnlyUserType[]>();
    allUsers.forEach((user) => {
      if (!seletedUsers.has(user.id)) {
        const firstLetterName = user?.name[0]?.toLocaleUpperCase();
        if (!map.get(firstLetterName)) {
          map.set(firstLetterName, [user]);
        } else {
          map.set(firstLetterName, [...map.get(firstLetterName)!, user]);
        }
      }
    });
    return [...map.entries()];
  }, [chats, seletedUsers]);

  const usersByFirstLetterFiltered = useMemo(
    () =>
      usersByFirstLetter
        .filter(([firstLetter]) => {
          if (nameFilter.length === 0) return true;
          if (nameFilter[0].toLocaleLowerCase() !== firstLetter.toLocaleLowerCase()) return false;
          return true;
        })
        .map(([firstLetter, chats]) => {
          const filteredChats = chats.filter((chat) => {
            const name = chat.name.toLocaleLowerCase();
            const filter = nameFilter.toLocaleLowerCase();
            return name.includes(filter);
          });
          return [firstLetter, filteredChats] as [string, ChatWithOnlyUserType[]];
        }),
    [nameFilter, usersByFirstLetter],
  );

  const selectedUsersArray = useMemo(
    () => [...seletedUsers.values()],
    [seletedUsers],
  ) as ChatWithOnlyUserType[];

  const handleSelectUser = (user: ChatWithOnlyUserType) => {
    const newSelectedUsers = new Map(seletedUsers);
    newSelectedUsers.set(user.id, user);
    setSelectedUsers(newSelectedUsers);
  };

  const handleDeselecttUser = (user: ChatWithOnlyUserType) => {
    const newSelectedUsers = new Map(seletedUsers);
    newSelectedUsers.delete(user.id);
    setSelectedUsers(newSelectedUsers);
  };

  if (step === 'choose-people') {
    return (
      <div className='h-full w-full flex flex-col bg-white dark:bg-primaryDark text-white dark:text-[#E9EDEF]'>
        <AnimatePresence>
          <div className='h-28 bg-[#008069] dark:bg-[#202C33]'>
            <motion.div
              key='create-group-title'
              transition={{ ease: 'easeInOut', duration: 0.5 }}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className='h-28 flex items-end p-4 gap-4 '
            >
              <button onClick={() => changeLeftSectionType()}>
                <ArrowIcon />
              </button>
              <h3 className='text-lg'>Adicionar participantes ao grupo</h3>
            </motion.div>
          </div>
        </AnimatePresence>

        <div className='flex-wrap flex-none flex w-full p-4 gap-1'>
          {selectedUsersArray.map(({ id, name, profileImage, type }) => (
            <div
              onClick={() => handleDeselecttUser({ id, name, profileImage, type })}
              key={id}
              className='flex cursor-pointer items-center justify-center text-xs bg-black/10 rounded-md'
            >
              <Avatar alt={name} src={profileImage} className='w-6 h-6 rounded-full' />
              <div className='px-2 max-w-[100px] truncate'>{name}</div>
              <CloseIcon />
            </div>
          ))}
        </div>

        <div className='p-8 flex flex-col items-center '>
          <input
            value={nameFilter}
            onChange={(e) => setUserNameFilter(e.target.value)}
            className='text-black w-full border-b border-b-textGray/20 border-y-0 
          border-x-0 p-1 bg-primaryLightest dark:bg-primaryDark focus:outline-none focus:border-b-textGray/20 
          focus:ring-0 dark:text-[#E9EDEF]'
            type='text'
            placeholder='Digite o nome do contato'
          />
        </div>

        <div className='overflow-auto'>
          {usersByFirstLetterFiltered.map(([firstLetter, users], index) => (
            <div key={`${firstLetter}-${index}`}>
              <h3 className='text-md text-primary p-4'>{firstLetter}</h3>
              {users.map(({ id, profileImage, name, type }) => (
                <>
                  {!seletedUsers.has(id) ? (
                    <div
                      onClick={() => handleSelectUser({ id, profileImage, name, type })}
                      key={id}
                      className='w-full flex cursor-pointer dark:text-[#E9EDEF] text-black hover:bg-[#202C33]'
                    >
                      <Avatar
                        alt='avatar'
                        src={profileImage}
                        className='w-12 h-12 rounded-full self-center ml-3'
                      />
                      <div className='flex flex-col ml-4 w-full border-b dark:border-b-textGray/60 p-4 pl-0'>
                        <h3>{name}</h3>
                      </div>
                    </div>
                  ) : null}
                </>
              ))}
            </div>
          ))}
        </div>

        {selectedUsersArray.length > 0 ? (
          <button
            onClick={() => setStep('choose-name')}
            className='bg-primary dark:bg-[#005C4B] mt-auto w-[40px] h-[40px] 
          rounded-full relative m-8 self-center justify-self-end flex items-center justify-center'
          >
            <div className='rotate-180 absolute'>
              <ArrowIcon />
            </div>
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className='h-full w-full flex flex-col bg-white dark:bg-primaryDark text-white dark:text-[#E9EDEF]'>
      <AnimatePresence>
        <div className='h-28 bg-[#008069] dark:bg-[#202C33]'>
          <motion.div
            key='create-group-title'
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className='h-28 flex items-end p-4 gap-4 '
          >
            <button onClick={() => setStep('choose-people')}>
              <ArrowIcon />
            </button>
            <h3 className='text-lg font-bold'>Novo grupo</h3>
          </motion.div>
        </div>
      </AnimatePresence>

      <div className='p-8 flex flex-col items-center'>
        <input
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
          className='text-black w-full border-b border-b-textGray/20 border-y-0 
          border-x-0 p-1 bg-primaryLightest dark:bg-primaryDark focus:outline-none focus:border-b-textGray/20 
          focus:ring-0 dark:text-[#E9EDEF]'
          type='text'
          placeholder='Nome do grupo'
        />
      </div>

      {groupName.length > 0 ? (
        <button
          onClick={() => {
            createGroup({ groupName, groupUsers: selectedUsersArray });
            changeLeftSectionType();
          }}
          className='bg-primary dark:bg-[#005C4B] w-[40px] h-[40px] 
          rounded-full relative m-8 self-center flex items-center justify-center'
        >
          <div className='absolute'>
            <DoneIcon />
          </div>
        </button>
      ) : null}
    </div>
  );
};

export default CreateNewGroup;
