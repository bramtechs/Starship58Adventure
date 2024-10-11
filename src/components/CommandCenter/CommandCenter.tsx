import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GameStateContext } from '../../contexts/GameStateContext';

const Content = styled.div`
  position: relative;
  z-index: 1;
  margin: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: white;
`;

const CommandCenterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const FormArea = styled.div`
  background: black;
  border-radius: 10px;
  padding: 20px;
  border: 4px solid lightgray;

  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  filter: drop-shadow(0px 0px 10px #000000);
`;

const LaunchButton = styled.button`
  background-color: red;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin: 30px;
  filter: drop-shadow(0px 0px 10px #000000);

  &:hover {
    background-color: darkred;
    transform: scale(1.05);
  }
  &:disabled {
    background-color: gray;
    cursor: default;
    transform: none; // Remove transform effect when disabled
  }
`;

const VerticalLine = styled.div`
  height: 4px;
  width: 100%;
  background-color: lightgray;
`;

const Title = styled.h2`
  text-align: center;
`;

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
    <CommandCenterWrapper>
      <Content>
        <FormArea>
          <Title>Command Center</Title>
          <VerticalLine />

          {gameState && (
            <>
              <p>Oxygen Level: {gameState.oxygen.toFixed(2)}</p>
              <p>
                Rocket Position: ({gameState.rocket.x.toFixed(2)},{' '}
                {gameState.rocket.y.toFixed(2)})
              </p>
            </>
          )}

          {/* Students can build their form here */}
          {/* This form is just to demonstrate how it works, but we’ll need to remove it so that students can build it themselves.*/}
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Direction X:
                <input
                  type='number'
                  value={inputX}
                  onChange={(e) => setInputX(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div>
              <label>
                Direction Y:
                <input
                  type='number'
                  value={inputY}
                  onChange={(e) => setInputY(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div>
              <label>
                Rotation (degrees):
                <input
                  type='number'
                  value={inputRotation}
                  onChange={(e) => setInputRotation(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <button type='submit'>Set Direction</button>
          </form>

        </FormArea>
        <LaunchButton onClick={onLaunch} disabled={isGameRunning}>
          LAUNCH
        </LaunchButton>
      </Content>
    </CommandCenterWrapper>
  );
};
