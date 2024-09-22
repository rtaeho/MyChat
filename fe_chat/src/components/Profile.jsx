import React from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #cbd5e0;
  margin-right: 1rem;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #4a5568;
`;

const Info = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  color: #718096;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Profile = ({ friendCount, chatRoomCount, onSelect }) => {
  const nickname = "내 닉네임"; // 유저 닉네임

  return (
    <ProfileContainer>
      <ProfileImage />
      <ProfileDetails>
        <Nickname>{nickname}</Nickname>
        <Info onClick={() => onSelect("friends")}>친구 {friendCount}명</Info>
        <Info onClick={() => onSelect("chatrooms")}>
          채팅방 {chatRoomCount}개
        </Info>
      </ProfileDetails>
    </ProfileContainer>
  );
};

export default Profile;
