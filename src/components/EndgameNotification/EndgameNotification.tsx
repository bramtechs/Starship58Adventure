import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const NotificationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  animation: ${fadeIn} 0.5s ease-in;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 80%;
  text-align: center;
  margin-bottom: 2rem;
`;

const RetryButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }
`;

interface EndgameNotificationProps {
  success: boolean;
  onRestart: () => void;
}

export const EndgameNotification: React.FC<EndgameNotificationProps> = ({
  success,
  onRestart,
}) => {
  const title = success ? 'Mission Accomplished' : 'Mission Failed';
  const description = success
    ? "Congratulations, Commander! You've successfully navigated to the planet. The galaxy awaits our exploration."
    : 'Mission Failed, Cadet! The hazards of space have proven too great this time.';
  const buttonLabel = success ? 'Explore Again' : 'Restart Mission';

  return (
    <NotificationWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <RetryButton onClick={onRestart}>{buttonLabel}</RetryButton>
    </NotificationWrapper>
  );
};
