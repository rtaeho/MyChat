// src/pages/StartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3182ce;
  }
`;

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <StartContainer>
      <ButtonContainer>
        <Button fullWidth onClick={() => navigate("/login")}>
          로그인
        </Button>
        <Button fullWidth onClick={() => navigate("/signup")}>
          회원가입
        </Button>
      </ButtonContainer>
    </StartContainer>
  );
};

export default StartPage;
