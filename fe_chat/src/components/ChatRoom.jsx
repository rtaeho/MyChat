import React from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";

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
  align-self: ${({ isSent }) => (isSent ? "flex-end" : "flex-start")};
  background-color: ${({ isSent }) => (isSent ? "#4299e1" : "#e2e8f0")};
  color: ${({ isSent }) => (isSent ? "white" : "#2d3748")};
`;

const ChatRoom = ({ messages }) => {
  const { user } = useUser();

  return (
    <ChatContainer>
      {messages.map((msg, index) => (
        <Message key={index} isSent={msg.senderId === user.userId}>
          {msg.text}
        </Message>
      ))}
    </ChatContainer>
  );
};

export default ChatRoom;
