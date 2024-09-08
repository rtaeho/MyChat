// src/pages/SignUpPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUp = (userData) => {
    // 실제 구현에서는 여기에 회원가입 로직을 추가합니다.
    console.log("회원가입 데이터:", userData);
    navigate("/login");
  };

  return (
    <>
      <Header />
      <SignUpContainer>
        <h2>회원가입</h2>
        <SignUpForm onSignUp={handleSignUp} />
      </SignUpContainer>
    </>
  );
};

export default SignUpPage;
