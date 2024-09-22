const API_BASE_URL = "http://localhost:8080"; // 백엔드 API의 기본 URL

// 공통 GET 요청 함수
export const get = async (url) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "GET",
    credentials: "include", // 쿠키 포함
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(response);
};

// 공통 POST 요청 함수
export const post = async (url, body) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    credentials: "include", // 쿠키 포함
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

// 공통 DELETE 요청 함수
export const del = async (url, body) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "DELETE",
    credentials: "include", // 쿠키 포함
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

// 공통 응답 처리 함수
const handleResponse = async (response) => {
  if (response.status === 204) {
    // 204 No Content일 경우 본문이 없으므로 JSON 파싱을 생략
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const contentType = response.headers.get("content-type");

  // 응답이 JSON 형식인지 확인
  if (contentType && contentType.includes("application/json")) {
    return await response.json(); // JSON 형식이면 JSON 파싱
  } else {
    return await response.text(); // 그렇지 않으면 텍스트로 처리
  }
};
