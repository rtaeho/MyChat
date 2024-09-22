import React, { useState } from "react";
import styled from "styled-components";

const FriendListContainer = styled.div`
  padding: 1rem;
`;

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #cbd5e0;
  margin-right: 1rem;
`;

const FriendDetails = styled.div`
  flex-grow: 1;
`;

const FriendName = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: #4a5568;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #f56565;
  color: white;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background-color: #e53e3e;
  }
`;

const FriendList = ({ friends, onChat, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend.id);
    setShowModal(true);
  };

  useState(() => {
    console.log("리스트에서 찍음", friends);
  }, []);

  const handleDelete = async () => {
    try {
      await onDelete(selectedFriend); // 부모 컴포넌트에 친구 삭제 알림
      setShowModal(false); // 모달 닫기
    } catch (error) {
      console.error("친구 삭제 실패:", error);
    }
  };

  return (
    <FriendListContainer>
      {friends.map((friend) => (
        <FriendItem key={friend.id}>
          <ProfileImage />
          <FriendDetails>
            <FriendName onClick={() => handleFriendClick(friend)}>
              {friend.nickName}
            </FriendName>
          </FriendDetails>
        </FriendItem>
      ))}
      {showModal && selectedFriend && (
        <div>
          {/* 모달 창 구현 */}
          <p>{selectedFriend}님과의 채팅</p>
          <Button onClick={() => onChat(selectedFriend)}>채팅</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </div>
      )}
    </FriendListContainer>
  );
};

export default FriendList;
