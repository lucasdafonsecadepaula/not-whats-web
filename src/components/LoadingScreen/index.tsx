import NotWhatsIcon from '../../assets/svg/not-whats-icon.svg';
import { motion } from 'framer-motion';

const wrapperVariants = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  },
};

const LoadingScreen = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-4 dark:bg-primaryDark dark:text-white'>
      <div className='relative animate-pulse'>
        <img src={NotWhatsIcon} alt='Logo' className='w-10 opacity-50 animate-pulse' />
      </div>
      <motion.div
        variants={wrapperVariants}
        initial='initial'
        animate='animate'
        transition={{ duration: 1 }}
      >
        <div className='w-60 h-[2px] bg-primary'></div>
      </motion.div>
      <h1 className='text-xl font-bold'>Not Whats</h1>
    </div>
  );
};

export default LoadingScreen;
