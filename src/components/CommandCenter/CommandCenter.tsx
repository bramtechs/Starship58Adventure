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
    transform: scale(1.05);
`;

const Content = styled.div`
    position: relative;
    z-index: 1;
    margin: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    flex-grow: 1;
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
  background: white;
  border-radius: 10px;
  padding: 20px;
  border: 4px solid lightgray; 

  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
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

  &:hover {
    background-color: darkred;
    transform: scale(1.05);
  }
`;

const VerticalLine = styled.div`
    height: 4px; 
    width: 100%; 
    background-color: lightgray;
`;

const Title = styled.h2`
    text-align: center;
`

interface CommandCenterProps {
  onLaunch: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ onLaunch }) => {
  return (
    <CommandCenterWrapper>
      <BackgroundImage />
      <Content>
        <FormArea>
        <Title>Command Center</Title>
        <VerticalLine/>
          {/* Form will be implemented by students */}
          <p>Form goes here</p>
        </FormArea>
        <LaunchButton onClick={onLaunch}>LAUNCH</LaunchButton>
      </Content>
    </CommandCenterWrapper>
  );
};
