import LoadingScreen from '@/components/LoadingScreen';
import { ThemeContext } from '@/context/Theme';
import { useContext, useEffect, useState } from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { isDarkModeOn } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={isDarkModeOn ? 'dark' : ''}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <main
          className={`after:fixed after:content-[''] after:top-0
           after:h-32 after:bg-primary after:w-full after:z-[-1]
           before:bg-secondary before:fixed before:top-0 before:bottom-0
           before:left-0 before:right-0 before:z-[-1] before:content-['']
           dark:after:bg-primaryDark dark:before:bg-primaryDark h-screen 
           w-screen grid dark:text-white scroll-smooth overflow-x-hidden`}
        >
          <div className='w-full max-h-screen h-full max-w-[1600px] m-auto min-[1600px]:py-4'>
            {children}
          </div>
        </main>
      )}
    </div>
  );
};

export default Wrapper;
