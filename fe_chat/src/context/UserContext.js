import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie"; // 쿠키를 사용하기 위해 js-cookie 라이브러리 사용

// UserContext 생성
const UserContext = createContext();

// UserContext Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: "",
    nickName: "",
    friendsCount: 0, // 친구 수
    chatRoomsCount: 0, // 채팅방 수
  });

  // 로그인 후 유저 정보를 저장하는 함수
  const loginUser = (
    userId,
    nickName,
    friendsCount = 0,
    chatRoomsCount = 0
  ) => {
    setUser({ userId, nickName, friendsCount, chatRoomsCount });
    // 유저 정보를 쿠키에 저장 (예: 1일 동안 유지)
    Cookies.set("userId", userId, { expires: 1 });
    Cookies.set("nickName", nickName, { expires: 1 });
    Cookies.set("friendsCount", friendsCount, { expires: 1 });
    Cookies.set("chatRoomsCount", chatRoomsCount, { expires: 1 });
  };

  // 로그아웃 시 유저 정보를 초기화하는 함수
  const logoutUser = () => {
    setUser({ userId: "", nickName: "", friendsCount: 0, chatRoomsCount: 0 });
    // 쿠키에서 유저 정보 삭제
    Cookies.remove("userId");
    Cookies.remove("nickName");
    Cookies.remove("friendsCount");
    Cookies.remove("chatRoomsCount");
  };

  // 페이지 로드 시 쿠키에서 유저 정보를 불러옴
  useEffect(() => {
    const savedUserId = Cookies.get("userId");
    const savedNickName = Cookies.get("nickName");
    const savedFriendsCount = Cookies.get("friendsCount");
    const savedChatRoomsCount = Cookies.get("chatRoomsCount");

    if (savedUserId && savedNickName) {
      setUser({
        userId: savedUserId,
        nickName: savedNickName,
        friendsCount: savedFriendsCount ? parseInt(savedFriendsCount, 10) : 0,
        chatRoomsCount: savedChatRoomsCount
          ? parseInt(savedChatRoomsCount, 10)
          : 0,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook을 만들어서 쉽게 사용 가능하도록 설정
export const useUser = () => useContext(UserContext);
