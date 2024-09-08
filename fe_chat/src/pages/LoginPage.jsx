// src/pages/LoginPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
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
    // 실제 구현에서는 여기에 로그인 로직을 추가합니다.
    console.log(`${username}으로 로그인`);
    navigate("/chat");
  };

  return (
    <>
      <Header />
      <LoginContainer>
        <h2>로그인</h2>
        <LoginForm onLogin={handleLogin} />
      </LoginContainer>
    </>
  );
};

export default LoginPage;
