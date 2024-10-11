// GameStateContext.tsx
import React from 'react';
import { Direction, GameState } from '../types';

interface GameStateContextProps {
    gameState: GameState;
    rotation: number;
    setDirection: React.Dispatch<React.SetStateAction<Direction>>;
    setRotation: React.Dispatch<React.SetStateAction<number>>;
  }


export const GameStateContext = React.createContext<GameStateContextProps | undefined>(undefined);
