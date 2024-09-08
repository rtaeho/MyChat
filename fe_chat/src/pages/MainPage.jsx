// src/pages/MainPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const DescriptionSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 3rem;
`;

const DescriptionBox = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 30%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DescriptionTitle = styled.h3`
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3182ce;
  }
`;

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Title>실시간 채팅 앱에 오신 것을 환영합니다!</Title>
      <DescriptionSection>
        <DescriptionBox>
          <DescriptionTitle>실시간 소통</DescriptionTitle>
          <Description>
            소켓 통신을 활용한 빠르고 직관적인 채팅 경험을 제공합니다. 친구들과
            간편하게 대화하세요.
          </Description>
        </DescriptionBox>
        <DescriptionBox>
          <DescriptionTitle>다양한 기능</DescriptionTitle>
          <Description>
            이모티콘과 이미지를 추가해 더욱 재미있는 소통을 즐겨보세요. 풍부한
            표현이 가능합니다.
          </Description>
        </DescriptionBox>
        <DescriptionBox>
          <DescriptionTitle>안전한 데이터 관리</DescriptionTitle>
          <Description>
            이미지는 안전하게 저장되며, 메시지는 데이터베이스를 통해 안전하게
            관리됩니다.
          </Description>
        </DescriptionBox>
      </DescriptionSection>
      <Button onClick={() => navigate("/start")}>시작하기</Button>
    </MainContainer>
  );
};

export default MainPage;
