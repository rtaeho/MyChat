import { post, get } from "./request";

// 아이디 중복 검사
export const checkUserIdDuplicate = async (userId) => {
  return await get(`/api/users/check-id/${userId}`);
};

// 이메일 중복 검사
export const checkEmailDuplicate = async (email) => {
  return await get(`/api/users/check-email/${email}`);
};

// 이메일 인증 코드 전송
export const sendVerificationEmail = async (email) => {
  return await post(`/api/users/send-verification-email?email=${email}`);
};

// 이메일 인증 코드 확인
export const verifyEmailCode = async (email, verificationCode) => {
  return await post(`/api/users/verify-email`, { email, verificationCode });
};

// 회원가입 요청
export const registerUser = async (userData) => {
  return await post(`/api/users/signup`, userData);
};
