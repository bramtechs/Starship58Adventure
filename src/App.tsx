import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import {Canvas, CommandCenter, Rocket, Planet, Obstacle} from './components/';
import useGameLoop from './hooks/useGameLoop';
import { checkCollision, randomBetween } from './utils/helpers';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ROCKET_SPEED,
  OBSTACLE_SPEED,
  OXYGEN_DEPLETION_RATE,
  INITIAL_OXYGEN
} from './utils/constants';
import { GameState, Direction } from './types';

const VerticalLine = styled.div`
    width: 5px; 
    height: 100vh; 
    background: white;
`;


const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const ScreenHalf = styled.div`
  flex: 1;
  height: 100%;
`;

const App: React.FC = () => {
  const [direction, setDirection] = useState<Direction>({ x: 0, y: -1 });
  
  const initialState: GameState = {
    rocket: { x: 0, y: CANVAS_HEIGHT - 100 },
    planet: { x: CANVAS_WIDTH - 100, y: 0 },
    obstacles: Array(5).fill(null).map(() => ({
      x: randomBetween(100, CANVAS_WIDTH - 100),
      y: randomBetween(100, CANVAS_HEIGHT - 100),
      rotation: 0,
      dx: randomBetween(-OBSTACLE_SPEED, OBSTACLE_SPEED),
      dy: randomBetween(-OBSTACLE_SPEED / 2, OBSTACLE_SPEED / 2),
    })),
    oxygen: INITIAL_OXYGEN,
    gameOver: false,
  };

  const updateGameState = useCallback((prevState: GameState): GameState => {
    if (prevState.gameOver) return prevState;

    const newState: GameState = { ...prevState };

    // Update rocket position
    newState.rocket.x += direction.x * ROCKET_SPEED;
    newState.rocket.y += direction.y * ROCKET_SPEED;

    // Update obstacles
    newState.obstacles = newState.obstacles.map(obstacle => ({
      ...obstacle,
      x: obstacle.x + obstacle.dx,
      y: obstacle.y + obstacle.dy,
      rotation: (obstacle.rotation + 1) % 360,
    }));

    // Check collisions and boundaries
    const rocketOutOfBounds = 
      newState.rocket.x < 0 || 
      newState.rocket.x > CANVAS_WIDTH || 
      newState.rocket.y < 0 || 
      newState.rocket.y > CANVAS_HEIGHT;

    const collidesWithObstacle = newState.obstacles.some(
      obstacle => checkCollision(
        { ...newState.rocket, width: 50, height: 100 },
        { ...obstacle, width: 50, height: 50 }
      )
    );

    const reachesPlanet = checkCollision(
      { ...newState.rocket, width: 50, height: 100 },
      { ...newState.planet, width: 100, height: 100 }
    );

    // Update oxygen
    newState.oxygen -= OXYGEN_DEPLETION_RATE;

    // Check game over conditions
    if (rocketOutOfBounds || collidesWithObstacle || newState.oxygen <= 0) {
      newState.gameOver = true;
      console.log('Game Over!');
    } else if (reachesPlanet) {
      newState.gameOver = true;
      console.log('Mission Accomplished!');
    }

    // Log relevant events
    console.log(`Rocket position: (${newState.rocket.x.toFixed(2)}, ${newState.rocket.y.toFixed(2)})`);
    console.log(`Oxygen left: ${newState.oxygen.toFixed(2)}`);

    return newState;
  }, [direction]);

  const [gameState, startGame, stopGame] = useGameLoop(initialState, updateGameState);

  const handleLaunch = () => {
    startGame();
  };

  return (
    <AppWrapper>
      <ScreenHalf>
        <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
          <Rocket x={gameState.rocket.x} y={gameState.rocket.y} />
          <Planet x={gameState.planet.x} y={gameState.planet.y} />
          {gameState.obstacles.map((obstacle, index) => (
            <Obstacle
              key={index}
              x={obstacle.x}
              y={obstacle.y}
              rotation={obstacle.rotation}
              dx={obstacle.dx}
              dy={obstacle.dy}
            />
          ))}
        </Canvas>
      </ScreenHalf>
      <VerticalLine/>
      <ScreenHalf>
        <CommandCenter onLaunch={handleLaunch} />
      </ScreenHalf>
    </AppWrapper>
  );
};

export default App;