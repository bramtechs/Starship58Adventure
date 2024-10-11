import React from 'react';

interface EndgameNotificationProps {
  success: boolean;
  onRestart: () => void;
}

export const EndgameNotification: React.FC<EndgameNotificationProps> = ({
  success,
  onRestart,
}) => {
  const title = success ? 'Mission Accomplished' : 'Mission Failed';
  const description = success
    ? "Congratulations, Commander! You've successfully navigated to the planet. The galaxy awaits our exploration."
    : 'Mission Failed, Cadet! The hazards of space have proven too great this time.';
  const buttonLabel = success ? 'Explore Again' : 'Restart Mission';

  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-70 text-white animate-fade-in'>
      <h1 className='text-3xl mb-4 text-center'>{title}</h1>
      <p className='text-lg max-w-4/5 text-center mb-8'>{description}</p>
      <button
        onClick={onRestart}
        className='bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-[10px] text-lg transition duration-300 transform hover:scale-105'
      >
        {buttonLabel}
      </button>
    </div>
  );
};
