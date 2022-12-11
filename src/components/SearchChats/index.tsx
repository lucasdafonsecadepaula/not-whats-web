import { useState } from 'react';
import ArrowIcon from '../icons/ArrowIcon';
import HamburgerMenu from '../icons/HamburgerMenu';
import SearchIcon from '../icons/SearchIcon';

interface InputSearchContactsProps {
  hasNotReadMessagesFilter: boolean;
  handleSearchUserInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleNotReadMessagesFilter: () => void;
}

const SearchChats = ({
  hasNotReadMessagesFilter,
  handleSearchUserInputChange,
  toggleNotReadMessagesFilter,
}: InputSearchContactsProps) => {
  const [hasFocus, setHasFocus] = useState<null | boolean>(null);
  let arrowClass = 'opacity-0';
  let searchClass = '';
  if (hasFocus !== null) {
    arrowClass = hasFocus ? 'animate-ninety opacity-1' : 'animate-ninetyBack opacity-0';
    searchClass = hasFocus ? 'opacity-0' : 'opacity-1';
  }

  return (
    <div className='p-3 flex items-center border-b dark:border-b-primaryDark'>
      <span className={`bg-primaryLightest p-1 rounded-l-lg relative py-1 px-3 dark:bg-[#202C33]`}>
        <span className={`absolute ${arrowClass} transition-opacity text-primary`}>
          <ArrowIcon />
        </span>
        <span className={`${searchClass} transition-opacity py-1`}>
          <SearchIcon />
        </span>
      </span>
      <input
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onChange={handleSearchUserInputChange}
        className='w-full border-none p-1 rounded-r-lg bg-primaryLightest dark:bg-[#202C33]
        text-black/70 focus:outline-none focus:border-none focus:ring-0 dark:text-[#E9EDEF]'
        type='text'
        placeholder='Pesquisar contatos'
      />
      <button
        onClick={toggleNotReadMessagesFilter}
        className={`p-1 ml-2 opacity-60 dark:opacity-100 rounded-full ${
          hasNotReadMessagesFilter ? 'bg-primary text-white' : ''
        }}`}
      >
        <HamburgerMenu />
      </button>
    </div>
  );
};

export default SearchChats;
