import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
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

  &:hover {
    background-color: #3182ce;
  }
`;

const AddFriendForm = ({ userId, onAddFriend }) => {
  const [friendId, setFriendId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 친구 추가 API 호출
      await onAddFriend(friendId); // 부모 컴포넌트에 친구 추가 알림
      setFriendId(""); // 입력 필드 초기화
    } catch (error) {
      console.error("친구 추가 실패:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="친구 ID 입력"
        value={friendId}
        onChange={(e) => setFriendId(e.target.value)}
      />
      <Button type="submit">친구 추가</Button>
    </Form>
  );
};

export default AddFriendForm;
