import React, { createContext, useState, useContext } from "react";

// UserContext 생성
const UserContext = createContext();

// UserContext Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: "", nickName: "" });

  // 로그인 후 유저 정보를 저장하는 함수
  const loginUser = (userId, nickName) => {
    setUser({ userId, nickName });
  };

  // 로그아웃 시 유저 정보를 초기화하는 함수
  const logoutUser = () => {
    setUser({ userId: "", nickName: "" });
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook을 만들어서 쉽게 사용 가능하도록 설정
export const useUser = () => useContext(UserContext);
