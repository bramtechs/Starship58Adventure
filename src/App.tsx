import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import {
  Canvas,
  CommandCenter,
  Rocket,
  Planet,
  Obstacle,
  EndgameNotification,
} from './components/';
import useGameLoop from './hooks/useGameLoop';
import { checkCollision, randomBetween } from './utils/helpers';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ROCKET_SPEED,
  OBSTACLE_SPEED,
  OXYGEN_DEPLETION_RATE,
  INITIAL_OXYGEN,
} from './utils/constants';
import { GameState, Direction } from './types';

import planetXImg from './assets/images/planet.png';
import earthImg from './assets/images/earth.png';
import commandCenterBackgroundImg from './assets/images/command-center-background.jpg';

const VerticalLine = styled.div`
  width: 5px;
  height: 100vh;
  background: white;
  z-index: 1;
`;

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const ScreenHalf = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
`;

const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${commandCenterBackgroundImg});
  background-size: cover;
  background-position: center;
`;

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [direction, setDirection] = useState<Direction>({ x: 0, y: -1 });
  const [missionSuccess, setMissionSuccess] = useState<boolean>(false);

  const createInitialState = (): GameState => ({
    rocket: { x: 23, y: CANVAS_HEIGHT - 160 },
    earth: { x: 0, y: CANVAS_HEIGHT - 100 },
    planetX: { x: CANVAS_WIDTH - 105, y: 5 },
    obstacles: Array(5)
      .fill(null)
      .map(() => ({
        x: randomBetween(100, CANVAS_WIDTH - 100),
        y: randomBetween(100, CANVAS_HEIGHT - 100),
        rotation: 0,
        dx: randomBetween(-OBSTACLE_SPEED, OBSTACLE_SPEED),
        dy: randomBetween(-OBSTACLE_SPEED / 2, OBSTACLE_SPEED / 2),
      })),
    oxygen: INITIAL_OXYGEN,
    gameOver: false,
  });

  const updateGameState = useCallback(
    (prevState: GameState): GameState => {
      if (prevState.gameOver) return prevState;
      const newState: GameState = { ...prevState };

      // Update rocket position
      newState.rocket.x += direction.x * ROCKET_SPEED;
      newState.rocket.y += direction.y * ROCKET_SPEED;

      // Update obstacles
      newState.obstacles = newState.obstacles.map((obstacle) => ({
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

      const collidesWithObstacle = newState.obstacles.some((obstacle) =>
        checkCollision(
          { ...newState.rocket, width: 50, height: 100 },
          { ...obstacle, width: 50, height: 50 }
        )
      );

      const reachesPlanet = checkCollision(
        { ...newState.rocket, width: 50, height: 100 },
        { ...newState.planetX, width: 100, height: 100 }
      );

      // Update oxygen
      newState.oxygen -= OXYGEN_DEPLETION_RATE;

      // Check game over conditions
      if (rocketOutOfBounds || collidesWithObstacle || newState.oxygen <= 0) {
        newState.gameOver = true;
        setMissionSuccess(false);
        console.log('Game Over!');
      } else if (reachesPlanet) {
        newState.gameOver = true;
        setMissionSuccess(true);
        console.log('Mission Accomplished!');
      }

      // Log relevant events
      console.log(
        `Rocket position: (${newState.rocket.x.toFixed(
          2
        )}, ${newState.rocket.y.toFixed(2)})`
      );
      console.log(`Oxygen left: ${newState.oxygen.toFixed(2)}`);

      return newState;
    },
    [direction]
  );

  const [gameState, startGame, stopGame, resetGame] = useGameLoop(
    createInitialState(),
    updateGameState
  );

  const handleLaunch = () => {
    startGame();
    setIsRunning(true);
  };

  const handleRestart = () => {
    const newInitialState = createInitialState();
    resetGame(newInitialState);
    setMissionSuccess(false);
    setIsRunning(false);
  };

  return (
    <AppWrapper>
            <BackgroundImage />
      <ScreenHalf>
        <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
          <Planet
            x={gameState.earth.x}
            y={gameState.earth.y}
            planetImg={earthImg}
          />
          <Rocket x={gameState.rocket.x} y={gameState.rocket.y} />
          <Planet
            x={gameState.planetX.x}
            y={gameState.planetX.y}
            planetImg={planetXImg}
          />
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
        {gameState.gameOver && (
          <EndgameNotification
            success={missionSuccess}
            onRestart={handleRestart}
          />
        )}
      </ScreenHalf>
      <VerticalLine />
      <ScreenHalf>
        <CommandCenter onLaunch={handleLaunch} isGameRunning={isRunning} />
      </ScreenHalf>
    </AppWrapper>
  );
};
export default App;
