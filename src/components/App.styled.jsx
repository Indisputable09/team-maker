import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: '100vh';
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonsBlock = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Button = styled.button`
  border: none;
  padding: 4px 8px;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  font-size: 30px;
`;

const pulsateButton = keyframes`0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }`;

export const MainButton = styled(Button)`
  font-size: 25px;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-top: 120px;
  &:disabled {
    animation: none;
  }
  animation: ${pulsateButton} 1500ms infinite ease-in 500ms;
`;
