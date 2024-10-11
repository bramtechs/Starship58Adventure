import React from 'react';
import styled from 'styled-components';

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
  return (
    <CommandCenterWrapper>
      <Content>
        <FormArea>
          <Title>Command Center</Title>
          <VerticalLine />
          {/* Form will be implemented by students */}
          <p>Form goes here</p>
        </FormArea>
        <LaunchButton onClick={onLaunch} disabled={isGameRunning}>
          LAUNCH
        </LaunchButton>
      </Content>
    </CommandCenterWrapper>
  );
};
