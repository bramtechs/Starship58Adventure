import React, { useContext, useState } from 'react';
import { GameStateContext } from '@/contexts/GameStateContext';

interface CommandCenterProps {
  onLaunch: () => void;
  isGameRunning: boolean;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onLaunch,
  isGameRunning,
}) => {
  const [inputRotation, setInputRotation] = useState<number>(0);

  const { gameState, setDirection, setRotation } =
    useContext(GameStateContext)!;

  // State for form inputs
  const [inputX, setInputX] = useState<number>(0);
  const [inputY, setInputY] = useState<number>(-1);

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Normalize the direction vector
    const magnitude = Math.sqrt(inputX * inputX + inputY * inputY);
    if (magnitude === 0) return;
    const normalizedDirection = {
      x: inputX / magnitude,
      y: inputY / magnitude,
    };
    setRotation(inputRotation);
    setDirection(normalizedDirection);
  };

  return (
    <div className='relative w-full h-full overflow-hidden flex flex-col'>
      <div className='relative z-[1] m-10 flex flex-col justify-center items-center flex-grow text-white'>
        <div className='bg-black rounded-[10px] p-5 border-4 border-gray-300 flex flex-col w-full flex-grow filter drop-shadow-[0_0_10px_rgba(0,0,0,1)]'>
          <h2 className='text-center text-2xl font-bold mb-4'>
            Command Center
          </h2>
          <div className='h-1 w-full bg-gray-300 mb-4'></div>
          {gameState && (
            <>
              <p className='mb-2'>
                Oxygen Level: {gameState.oxygen.toFixed(2)}
              </p>
              <p className='mb-4'>
                Rocket Position: ({gameState.rocket.x.toFixed(2)},{' '}
                {gameState.rocket.y.toFixed(2)})
              </p>
            </>
          )}
          {/* Students can build their form here */}
          {/* This form is just to demonstrate how it works, but we’ll need to remove it so that students can build it themselves.*/}{' '}
          <form onSubmit={handleSubmit} className='w-full max-w-md'>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2'>
                Direction X:
              </label>
              <input
                type='number'
                value={inputX}
                onChange={(e) => setInputX(parseFloat(e.target.value))}
                className='shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2'>
                Direction Y:
              </label>
              <input
                type='number'
                value={inputY}
                onChange={(e) => setInputY(parseFloat(e.target.value))}
                className='shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='mb-6'>
              <label className='block text-white text-sm font-bold mb-2'>
                Rotation (degrees):
              </label>
              <input
                type='number'
                value={inputRotation}
                onChange={(e) => setInputRotation(parseFloat(e.target.value))}
                className='shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                Set Direction
              </button>
            </div>
          </form>
          {/* Form ends here */}
        </div>
        <button
          onClick={onLaunch}
          disabled={isGameRunning}
          className='bg-red-500 text-white font-bold text-xl py-4 px-8 rounded-[10px] cursor-pointer m-8 filter drop-shadow-[0_0_10px_rgba(0,0,0,1)] transform transition duration-300 hover:bg-red-700 hover:scale-105 disabled:bg-gray-500 disabled:cursor-default'
        >
          LAUNCH
        </button>
      </div>
    </div>
  );
};
