import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../api/auth";
import { useUser } from "../context/UserContext"; // UserContext에서 함수 가져오기
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem;
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

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const LoginForm = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { loginUser } = useUser(); // UserContext에서 loginUser 함수 호출
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 에러 메시지 처리
    if (!userId && !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    } else if (!userId) {
      setError("아이디를 입력해주세요.");
      return;
    } else if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    // 로그인 API 호출
    try {
      const userData = { userId, password }; // 로그인에 필요한 데이터
      const response = await login(userData);
      console.log(response);
      // 로그인 성공 시 상태 업데이트
      if (response) {
        const { userId, nickName, friendsCount, chatRoomsCount } = response;
        loginUser(userId, nickName, friendsCount, chatRoomsCount);
        navigate("/profile");
      } else {
        setError("아이디와 비밀번호가 일치하지 않습니다!");
      }
    } catch (error) {
      // 로그인 실패 시 에러 메시지 출력
      setError("로그인에 실패했습니다.");
    }
  };

  // 입력 시 에러 메시지 초기화
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    if (e.target.value) setError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) setError(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={handleUserIdChange}
        autoComplete="username"
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={handlePasswordChange}
        autoComplete="current-password"
      />
      <Button type="submit">로그인</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
};

export default LoginForm;
