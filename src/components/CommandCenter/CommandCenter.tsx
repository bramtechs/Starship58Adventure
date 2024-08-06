import React from 'react';
import styled from 'styled-components';

import commandCenterBackgroundImg from '../../assets/images/command-center-background.jpg';

const BackgroundImage = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${commandCenterBackgroundImg});
    background-size: cover;
    background-position: center;
    filter: blur(3px);  
`;

const Content = styled.div`
    position: relative;
    z-index: 1;
    padding: 20px;
`;

const CommandCenterWrapper = styled.div`
    position: relative;
    width: 100%;  
    height: 100%;
    overflow: hidden; 
`;

const FormArea = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const LaunchButton = styled.button`
  background-color: #ff4136;
  color: white;
  font-size: 24px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

interface CommandCenterProps {
  onLaunch: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ onLaunch }) => {
  return (
    <CommandCenterWrapper>
      <BackgroundImage />
      <Content>
        <FormArea>
        <h2>Command Center</h2>
          {/* Form will be implemented by students */}
          <p>Form goes here</p>
        </FormArea>
        <LaunchButton onClick={onLaunch}>LAUNCH</LaunchButton>
      </Content>
    </CommandCenterWrapper>
  );
};
