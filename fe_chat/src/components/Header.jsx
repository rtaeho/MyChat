import React from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext"; // UserContext에서 user를 가져오기 위해 import
import { logout } from "../api/auth"; // 로그아웃 API 호출 함수
import { useNavigate } from "react-router-dom";

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
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #718096;
`;

const LogoutButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c53030;
  }
`;

const Header = () => {
  const { user, logoutUser } = useUser(); // 전역 상태에서 user 정보를 가져옴
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // 로그아웃 API 호출
      logoutUser(); // UserContext에서 유저 정보 초기화
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <HeaderWrapper>
      <Logo>채팅 앱</Logo>
      {user.nickName && (
        <UserInfo>
          <span>환영합니다, {user.nickName}님!</span>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </UserInfo>
      )}
    </HeaderWrapper>
  );
};

export default Header;
