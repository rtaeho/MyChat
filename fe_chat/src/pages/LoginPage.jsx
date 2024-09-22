// src/pages/LoginPage.js
import React from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const LoginPage = () => {
  return (
    <>
      <LoginContainer>
        <h2>로그인</h2>
        <LoginForm />
      </LoginContainer>
    </>
  );
};

export default LoginPage;
