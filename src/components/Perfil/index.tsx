/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { SocketContext } from '@/context/Socket';
import { ThemeContext } from '@/context/Theme';
import { useContext, useState } from 'react';
import Switch from 'react-switch';
import Avatar from '../Avatar';
import ArrowIcon from '../icons/ArrowIcon';
import DoneIcon from '../icons/DoneIcon';
import SunIcon from '../icons/SunIcon';

interface CreateNewGroupProps {
  changeLeftSectionType: () => void;
}

const Perfil = ({ changeLeftSectionType }: CreateNewGroupProps) => {
  const {
    myData: { name, profileImage },
    changeMyConfig,
  } = useContext(SocketContext);
  const { isDarkModeOn, toggleDarkMode } = useContext(ThemeContext);
  const [nameInputValue, setNameInputValue] = useState(name);

  const handleApplyChangeConfig = () => {
    if (nameInputValue === name || !nameInputValue) return;
    changeMyConfig({ name: nameInputValue });
  };

  const hasChangedUserName = nameInputValue !== name;
  return (
    <div className='h-full w-full bg-primaryLightest dark:bg-primaryDark text-white dark:text-[#E9EDEF]'>
      <div className='h-28 bg-[#008069] dark:bg-[#202C33] flex items-end p-4 gap-4 '>
        <button onClick={() => changeLeftSectionType()}>
          <ArrowIcon />
        </button>
        <h3 className='text-lg font-bold'>Perfil</h3>
      </div>

      <div className='p-8 w-full grid place-items-center'>
        <div className='cursor-pointer h-[200px] w-[200px] relative overflow-hidden rounded-full'>
          <Avatar alt='foto de perfil' size={200} src={profileImage} />
          <div className='absolute top-0 bottom-0 left-0 right-0 bg-[#707F87]/80 grid place-content-center'>
            Editar foto de perfil
          </div>
        </div>
      </div>

      <div className='w-full p-8 bg-white dark:bg-primaryDark  shadow-sm relative'>
        <label htmlFor='name' className='block text-sm text-[#008069] mb-2'>
          Seu nome
        </label>
        <input
          id='name'
          className='text-black w-full border-b dark:bg-primaryDark dark:text-[#E9EDEF] 
          border-b-textGray/20 border-y-0 border-x-0 p-1 bg-primaryLightest focus:outline-none
           focus:border-b-primary focus:ring-0'
          type='text'
          placeholder='Seu nome'
          value={nameInputValue}
          onChange={(e) => setNameInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleApplyChangeConfig();
          }}
        />
        {hasChangedUserName ? (
          <span
            onClick={handleApplyChangeConfig}
            className='absolute top-[50%] right-10 cursor-pointer text-primary'
          >
            <DoneIcon />
          </span>
        ) : null}
      </div>

      <div
        className='w-full mt-8 bg-white dark:bg-[#202C33] dark:text-[#E9EDEF] 
      shadow-sm flex gap-4 p-2 items-center text-textGray'
      >
        <span className='opacity-60 ml-4'>
          <SunIcon />
        </span>
        <span className='block text-sm'>Tema</span>
        <span className='ml-auto mr-4 grid place-content-center'>
          <Switch
            handleDiameter={18}
            height={22.4}
            width={44.8}
            uncheckedIcon={false}
            checkedIcon={false}
            offColor='#41525D'
            onColor='#25D366'
            onChange={() => toggleDarkMode()}
            checked={!isDarkModeOn}
          />
        </span>
      </div>
    </div>
  );
};

export default Perfil;
