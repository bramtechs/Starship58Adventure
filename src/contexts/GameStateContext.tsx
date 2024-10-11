// GameStateContext.tsx
import React from 'react';
import { GameState } from '../types';


export const GameStateContext = React.createContext<GameState | undefined>(undefined);
