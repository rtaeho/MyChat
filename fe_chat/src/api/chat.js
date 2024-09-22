import { get, post } from "./request";

// 채팅방 목록 가져오기
export const getChatRooms = async (userId) => {
  return await get(`/api/chatrooms/${userId}`);
};

// 채팅방 생성
export const createChatRoom = async (user1, user2) => {
  return await post(`/api/chatrooms/create`, { user1, user2 });
};
