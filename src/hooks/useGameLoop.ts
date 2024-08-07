import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types';
const useGameLoop = (
  initialState: GameState,
  updateFunction: (prevState: GameState) => GameState
) => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [isRunning, setIsRunning] = useState(false);
  const gameLoop = useCallback(() => {
    if (isRunning) {
      setGameState(updateFunction);
      requestAnimationFrame(gameLoop);
    }
  }, [isRunning, updateFunction]);
  useEffect(() => {
    if (isRunning) {
      requestAnimationFrame(gameLoop);
    }
    return () => setIsRunning(false);
  }, [isRunning, gameLoop]);
  const startGame = () => setIsRunning(true);
  const stopGame = () => setIsRunning(false);
  const resetGame = (newState: GameState) => {
    setGameState(newState);
    setIsRunning(false);
  };
  return [gameState, startGame, stopGame, resetGame] as const;
};
export default useGameLoop;
