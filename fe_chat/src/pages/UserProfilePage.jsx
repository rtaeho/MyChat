import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import AddFriendForm from "../components/AddFriendForm";
import FriendList from "../components/FriendList";
import ChatRoomList from "../components/ChatRoomList"; // ChatRoomList 컴포넌트 추가
import { useUser } from "../context/UserContext";
import { addFriend, deleteFriend, getFriends } from "../api/friends"; // API 호출 함수 추가
import { getChatRooms, createChatRoom } from "../api/chat"; // 채팅방 관련 API 호출

const UserProfilePage = () => {
  const [friends, setFriends] = useState([]); // 친구 목록 상태
  const [chatRooms, setChatRooms] = useState([]); // 채팅방 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [selected, setSelected] = useState("friends"); // 선택된 상태 (friends or chatrooms)
  const { user } = useUser(); // 현재 로그인된 유저 정보

  // 친구 목록을 서버에서 받아옴
  const fetchFriends = async () => {
    try {
      setLoading(true); // 로딩 상태 시작
      const friendsData = await getFriends(user.userId);
      setFriends(friendsData); // 서버로부터 친구 목록 설정
      setLoading(false); // 로딩 상태 종료
    } catch (error) {
      console.error("친구 목록을 불러오는데 실패했습니다:", error);
      setLoading(false); // 에러 발생 시에도 로딩 상태 종료
    }
  };

  // 채팅방 목록을 서버에서 받아옴
  const fetchChatRooms = async () => {
    try {
      const chatRoomData = await getChatRooms(user.userId);
      setChatRooms(chatRoomData); // 서버로부터 채팅방 목록 설정
    } catch (error) {
      console.error("채팅방 목록을 불러오는데 실패했습니다:", error);
    }
  };

  // useEffect에서 userId가 변경되거나 컴포넌트가 처음 마운트될 때 친구 및 채팅방 목록 불러오기
  useEffect(() => {
    if (user.userId) {
      fetchFriends();
      fetchChatRooms();
    }
  }, [user.userId]);

  // 친구 추가 핸들러
  const handleAddFriend = async (friendId) => {
    try {
      await addFriend(user.userId, friendId);
      fetchFriends(); // 친구 목록 업데이트
    } catch (error) {
      console.error("친구 추가에 실패했습니다:", error);
    }
  };

  // 친구 삭제 핸들러
  const handleDeleteFriend = async (friendId) => {
    try {
      await deleteFriend(user.userId, friendId);
      fetchFriends(); // 친구 목록 업데이트
    } catch (error) {
      console.error("친구 삭제에 실패했습니다:", error);
    }
  };

  // 채팅방으로 연결하는 핸들러
  const handleChat = async (friendId) => {
    try {
      console.log(user.userId, friendId);
      await createChatRoom(user.userId, friendId); // API 호출로 채팅방 생성
      console.log(`친구 ${friendId}와의 채팅방이 생성되었습니다.`);
      // 채팅방 목록을 다시 불러오거나, 생성된 채팅방으로 이동할 수 있습니다.
    } catch (error) {
      console.error(`친구 ${friendId}와의 채팅방 생성에 실패했습니다.`, error);
    }
  };

  // 선택된 항목에 따라 FriendList 또는 ChatRoomList 렌더링
  const renderSelectedComponent = () => {
    if (selected === "friends") {
      return (
        <>
          <AddFriendForm userId={user.userId} onAddFriend={handleAddFriend} />
          <FriendList
            friends={friends}
            onChat={handleChat} // onChat 핸들러 전달
            onDelete={handleDeleteFriend}
          />
        </>
      );
    } else if (selected === "chatrooms") {
      return <ChatRoomList chatRooms={chatRooms} userId={user.userId} />;
    }
  };

  return (
    <div>
      <Profile
        friendCount={friends.length}
        chatRoomCount={chatRooms.length}
        onSelect={setSelected} // 선택된 항목을 부모에 전달
      />
      {loading ? <p>로딩 중...</p> : renderSelectedComponent()}
    </div>
  );
};

export default UserProfilePage;
