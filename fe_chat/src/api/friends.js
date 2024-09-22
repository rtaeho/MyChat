import { post, del, get } from "./request"; // get 함수도 추가

// 친구 추가 요청
export const addFriend = async (userId, friendId) => {
  return await post(`/api/friends/add`, { userId, friendId });
};

// 친구 삭제 요청
export const deleteFriend = async (userId, friendId) => {
  return await del(`/api/friends/delete`, { userId, friendId });
};

// 친구 목록 가져오기 요청
export const getFriends = async (userId) => {
  return await get(`/api/friends/${userId}`);
};
