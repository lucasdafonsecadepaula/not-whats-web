const NoChatSelected = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full bg-primaryLightest dark:bg-[#202C33] text-textGray dark:text-[#E9EDEF]'>
      <h1 className='text-4xl'>Not Whats</h1>
      <p className='text-sm max-w-lg mt-6 opacity-70 text-center'>
        Envie e receba mensagem em tempo real, todos os usuários que estão ativos ficam disponíveis
        para conversar e todas as conversão não são salvas em um banco de dados portanto depois de 5
        minutos após se desconectar todas suas mensagems são perdidas.
      </p>
    </div>
  );
};

export default NoChatSelected;
