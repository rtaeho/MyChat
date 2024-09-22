// src/pages/ChatPage.js
import React, { useState } from "react";
import styled from "styled-components";
import ChatRoom from "../components/ChatRoom";
import MessageInput from "../components/MessageInput";
import { useParams } from "react-router-dom";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const { friendId } = useParams();

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isSent: true }]);
  };

  return (
    <ChatContainer>
      <h2>{friendId}님과의 채팅방</h2>
      <ChatRoom messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </ChatContainer>
  );
};

export default ChatPage;
