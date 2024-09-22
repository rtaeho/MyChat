import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // useNavigate를 가져옵니다.

const ChatRoomListContainer = styled.div`
  padding: 1rem;
`;

const ChatRoomItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #cbd5e0;
  margin-right: 1rem;
`;

const ChatRoomDetails = styled.div`
  flex-grow: 1;
`;

const ChatRoomInfo = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: #4a5568;
`;

const ChatRoomList = ({ chatRooms, userId }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  const handleChatRoomClick = (friendId) => {
    navigate(`/chat/${friendId}`); // 상대방의 ID를 URL로 사용하여 이동
  };

  return (
    <ChatRoomListContainer>
      <h2>채팅방 목록</h2>
      {chatRooms.map((room) => {
        // 현재 사용자의 ID와 다른 유저의 ID를 찾기 위한 로직
        const friendId = room.user1 === userId ? room.user2 : room.user1;
        return (
          <ChatRoomItem
            key={room.id}
            onClick={() => handleChatRoomClick(friendId)}
          >
            <ProfileImage />
            <ChatRoomDetails>
              <ChatRoomInfo>
                채팅방: {room.user1} - {room.user2}
              </ChatRoomInfo>
            </ChatRoomDetails>
          </ChatRoomItem>
        );
      })}
    </ChatRoomListContainer>
  );
};

export default ChatRoomList;
