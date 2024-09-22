import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import AddFriendForm from "../components/AddFriendForm";
import FriendList from "../components/FriendList";
import { useUser } from "../context/UserContext";
import { addFriend, deleteFriend, getFriends } from "../api/friends"; // API 호출 함수 추가

const UserProfilePage = () => {
  const [friends, setFriends] = useState([]); // 친구 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
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

  // useEffect에서 userId가 변경되거나 컴포넌트가 처음 마운트될 때 fetchFriends 호출
  useEffect(() => {
    if (user.userId) {
      fetchFriends(); // 친구 목록 불러오기
    }
  }, [user.userId]);

  // 친구 추가 핸들러
  const handleAddFriend = async (friendId) => {
    try {
      await addFriend(user.userId, friendId);
      fetchFriends();
    } catch (error) {
      console.error("친구 추가에 실패했습니다:", error);
    }
  };

  // 친구 삭제 핸들러
  const handleDeleteFriend = async (friendId) => {
    try {
      await deleteFriend(user.userId, friendId);
      fetchFriends();
    } catch (error) {
      console.error("친구 삭제에 실패했습니다:", error);
    }
  };

  // 채팅방으로 연결하는 핸들러
  const handleChat = (friendId) => {
    console.log(`친구 ${friendId}와의 채팅방으로 이동합니다.`);
    // 여기서 채팅방으로 이동하는 로직을 추가할 수 있습니다 (e.g., navigate로 페이지 이동).
  };

  // 로딩 중일 때 로딩 메시지 표시
  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <Profile userId={user.userId} /> {/* 프로필 정보 */}
      <AddFriendForm userId={user.userId} onAddFriend={handleAddFriend} />{" "}
      {friends.length !== 0 ? (
        <FriendList
          friends={friends}
          onChat={handleChat} // onChat 핸들러 전달
          onDelete={handleDeleteFriend}
        />
      ) : (
        <p>친구가 없습니다!</p>
      )}
    </div>
  );
};

export default UserProfilePage;
