import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatRoom from "../components/ChatRoom";
import MessageInput from "../components/MessageInput";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getMessages } from "../api/chat"; // API 호출 가져오기

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams(); // 채팅할 상대방 ID
  const { user } = useUser(); // 현재 로그인된 유저 정보
  const [socket, setSocket] = useState(null); // WebSocket 저장

  useEffect(() => {
    // 기존 메시지 불러오기
    const fetchMessages = async () => {
      const response = await getMessages(roomId);
      setMessages(
        response.map((msg) => ({
          text: msg.text,
          isSent: msg.senderId === user.userId,
        }))
      );
    };

    fetchMessages();

    // WebSocket 서버 연결
    const ws = new window.WebSocket(`ws://localhost:8080/chat/${roomId}`);
    setSocket(ws);

    // 서버로부터 수신한 메시지 처리
    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: receivedMessage.text,
          isSent: receivedMessage.senderId === user.userId,
        },
      ]);
    };

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      ws.close();
    };
  }, [roomId, user.userId]);

  // 메시지 전송 처리
  const handleSendMessage = async (text) => {
    if (socket) {
      const messageData = { chatRoomId: roomId, senderId: user.userId, text };
      // 서버로 메시지 전송 (WebSocket 사용)
      socket.send(JSON.stringify(messageData));
      setMessages([...messages, { text, isSent: true }]); // 전송된 메시지를 로컬 상태에 추가
    }
  };

  return (
    <ChatContainer>
      <h2>채팅방: {roomId}</h2>
      <ChatRoom messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </ChatContainer>
  );
};

export default ChatPage;
