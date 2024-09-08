// src/components/Header.jsx
import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  background-color: #f0f4f8;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #4a5568;
`;

const UserInfo = styled.div`
  font-size: 1rem;
  color: #718096;
`;

const Header = ({ username }) => (
  <HeaderWrapper>
    <Logo>채팅 앱</Logo>
    {username && <UserInfo>환영합니다, {username}님!</UserInfo>}
  </HeaderWrapper>
);

export default Header;
