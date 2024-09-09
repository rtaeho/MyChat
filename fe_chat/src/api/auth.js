import { post } from "./request";

// 로그인 요청
export const login = async (userData) => {
  return await post(`/api/auth/login`, userData);
};

// 로그아웃 요청
export const logout = async () => {
  return await post(`/api/auth/logout`);
};
