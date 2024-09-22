import React, { useEffect, useState } from "react";
import { getChatRooms, createChatRoom } from "../api/chat";
import { useUser } from "../context/UserContext"; // 유저 정보를 가져오기 위해 사용

const ChatRoomList = () => {
  const { user } = useUser(); // 현재 로그인된 유저 정보
  const [chatRooms, setChatRooms] = useState([]); // 채팅방 목록 상태
  const [friendId, setFriendId] = useState(""); // 새로운 채팅방을 만들기 위한 친구 ID

  // 채팅방 목록을 가져오는 함수
  const fetchChatRooms = async () => {
    try {
      const chatRoomData = await getChatRooms(user.userId);
      setChatRooms(chatRoomData);
    } catch (error) {
      console.error("채팅방 목록을 불러오는데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    if (user.userId) {
      fetchChatRooms();
    }
  }, [user.userId]);

  // 새로운 채팅방 생성
  const handleCreateChatRoom = async () => {
    try {
      await createChatRoom(user.userId, friendId);
      fetchChatRooms(); // 채팅방 목록을 다시 불러옴
    } catch (error) {
      console.error("채팅방 생성에 실패했습니다.", error);
    }
  };

  return (
    <div>
      <h2>채팅방 목록</h2>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id}>
            채팅방: {room.user1} - {room.user2}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
          placeholder="친구 ID 입력"
        />
        <button onClick={handleCreateChatRoom}>채팅방 생성</button>
      </div>
    </div>
  );
};

export default ChatRoomList;
