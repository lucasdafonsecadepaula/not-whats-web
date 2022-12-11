import { SocketContext } from '@/context/Socket';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import ArrowIcon from '../icons/ArrowIcon';

interface CreateNewGroupProps {
  changeLeftSectionType: () => void;
}

const CreateNewGroup = ({ changeLeftSectionType }: CreateNewGroupProps) => {
  const { createGroup } = useContext(SocketContext);

  return (
    <div className='h-full w-full bg-white dark:bg-primaryDark text-white dark:text-[#E9EDEF]'>
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
            <h3 className='text-lg font-bold'>Criar novo grupo</h3>
          </motion.div>
        </div>
      </AnimatePresence>

      <div className='p-8 flex flex-col items-center'>
        <input
          className='text-black w-full border-b border-b-textGray/20 border-y-0 
          border-x-0 p-1 bg-primaryLightest dark:bg-primaryDark focus:outline-none focus:border-b-textGray/20 
          focus:ring-0 dark:text-[#E9EDEF]'
          type='text'
          placeholder='Digite o nome do grupo'
        />
        <button
          onClick={() => createGroup()}
          className='bg-primary dark:bg-[#005C4B] mt-4 px-4 py-2 rounded-md font-bold'
        >
          Criar
        </button>
      </div>
    </div>
  );
};

export default CreateNewGroup;
