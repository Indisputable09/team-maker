import styled from 'styled-components';

export const Container = styled.div`
  height: '100vh';
  padding: 16px;
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
