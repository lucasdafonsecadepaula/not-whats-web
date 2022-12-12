/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { SocketContext } from '@/context/Socket';
import { ThemeContext } from '@/context/Theme';
import * as Popover from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import Avatar from '../Avatar';
import ThreeDots from '../icons/ThreeDots';
import { leftSectionTypeProps } from '../layouts/Container';

interface HeaderProps {
  changeLeftSectionType: React.Dispatch<React.SetStateAction<leftSectionTypeProps>>;
}

const Header = ({ changeLeftSectionType }: HeaderProps) => {
  const {
    myData: { name, profileImage },
  } = useContext(SocketContext);
  const { isDarkModeOn } = useContext(ThemeContext);
  const darkMode = isDarkModeOn ? 'dark' : '';
  return (
    <div className='w-full h-14 bg-primaryLightest dark:bg-[#202C33] flex items-center py-3 px-4'>
      <div
        className='flex items-center cursor-pointer'
        onClick={() => changeLeftSectionType('settings')}
      >
        <Avatar alt='avatar' src={profileImage} />
        <h2 className='truncate ml-4 text-left dark:text-[#E9EDEF]'>{name}</h2>
      </div>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className='opacity-60 rounded-full p-2 data-[state=open]:bg-[#cacbcf] dark:bg-opacity-20 ml-auto'
            aria-label='Change configurations'
          >
            <ThreeDots />
          </button>
        </Popover.Trigger>
        <Popover.Portal className='rounded-md drop-shadow-lg z-20'>
          <Popover.Content sideOffset={5} align='end' alignOffset={0} className={darkMode}>
            <motion.div
              key='header'
              className='bg-white dark:bg-[#202C33] dark:text-[#E9EDEF] flex flex-col gap-2 py-2 rounded-md text-left min-w-[200px] max-w-[340px] text-black/70 drop-shadow-lg'
              initial={{ scale: 0.75, y: -25, x: 25 }}
              animate={{ scale: 1, y: 0, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className='p-2 pl-6 cursor-pointer dark:hover:bg-primaryDark/20 hover:bg-primaryLightest'
                onClick={() => changeLeftSectionType('newGroup')}
              >
                Novo Grupo
              </div>
              <div
                className='p-2 pl-6 cursor-pointer dark:hover:bg-primaryDark/20 hover:bg-primaryLightest'
                onClick={() => changeLeftSectionType('settings')}
              >
                Perfil
              </div>
            </motion.div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default Header;
