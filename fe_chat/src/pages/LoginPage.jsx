// src/pages/LoginPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (username) => {
    navigate("/chat");
  };

  return (
    <>
      <LoginContainer>
        <h2>로그인</h2>
        <LoginForm onLogin={handleLogin} />
      </LoginContainer>
    </>
  );
};

export default LoginPage;
