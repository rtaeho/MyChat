import { get, post } from "./request"; // 공통 get, post 함수 사용

// 채팅방 목록 가져오기 (특정 유저 기준)
export const getChatRooms = async (userId) => {
  return await get(`/api/chatrooms/${userId}`);
};

// 채팅방 생성 (두 유저 간의 채팅방 생성)
export const createChatRoom = async (user1, user2) => {
  return await post(`/api/chatrooms/create`, { user1, user2 });
};

// 채팅방 메시지 가져오기 (채팅방 ID로 메시지 불러오기)
export const getMessages = async (chatRoomId) => {
  return await get(`/api/chat/${chatRoomId}/messages`);
};
