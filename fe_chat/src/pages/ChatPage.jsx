import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatRoom from "../components/ChatRoom";
import MessageInput from "../components/MessageInput";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams(); // 채팅할 상대방 ID
  const { user } = useUser(); // 현재 로그인된 유저 정보
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // WebSocket 서버에 연결
    const ws = new WebSocket(`ws://localhost:8080/chat/${roomId}`);
    setSocket(ws);

    // 서버로부터 메시지를 수신할 때
    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);

      // 내가 보낸 메시지는 이미 로컬 상태에 추가했으므로, 중복 추가하지 않음
      if (messageData.senderId !== user.userId) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: messageData.text, senderId: messageData.senderId },
        ]);
      }
    };

    // 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      ws.close();
    };
  }, [roomId, user.userId]);

  const handleSendMessage = (text) => {
    // 메시지를 WebSocket을 통해 서버로 전송
    if (socket) {
      const message = { text, senderId: user.userId };
      socket.send(JSON.stringify(message));

      // 서버에서 다시 수신하지 않고, 로컬에서만 바로 메시지를 추가
      setMessages((prevMessages) => [
        ...prevMessages,
        { text, senderId: user.userId }, // 내가 보낸 메시지는 senderId로 구분
      ]);
    }
  };

  return (
    <ChatContainer>
      <h2>{roomId}의 채팅방</h2>
      <ChatRoom messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </ChatContainer>
  );
};

export default ChatPage;
