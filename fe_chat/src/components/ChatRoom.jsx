// src/components/ChatRoom.jsx
import React from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow-y: auto;
`;

const Message = styled.div`
  max-width: 70%;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 20px;
  ${({ isSent }) =>
    isSent
      ? `
      align-self: flex-end;
      background-color: #4299e1;
      color: white;
    `
      : `
      align-self: flex-start;
      background-color: #e2e8f0;
      color: #2d3748;
    `}
`;

const ChatRoom = ({ messages }) => (
  <ChatContainer>
    {messages.map((msg, index) => (
      <Message key={index} isSent={msg.isSent}>
        {msg.text}
      </Message>
    ))}
  </ChatContainer>
);

export default ChatRoom;
