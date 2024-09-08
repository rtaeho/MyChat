import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  width: auto;
`;

const Message = styled.p`
  margin: 5px 0 10px;
  color: ${(props) => (props.isError ? "#e53e3e" : "#38a169")};
`;

const EmailLabel = styled.span`
  font-size: 1rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #4299e1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #3182ce;
  }

  ${(props) =>
    props.fullWidth &&
    `
    width: 100%;
  `}
`;

const SignUpForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isCustomDomain, setIsCustomDomain] = useState(false);

  const handleUsernameCheck = () => {
    const isAvailable = Math.random() < 0.5;
    setUsernameMessage(
      isAvailable ? "사용 가능한 아이디입니다!" : "이미 사용중인 아이디입니다!"
    );
  };

  const handleEmailDomainChange = (e) => {
    const domain = e.target.value;
    if (domain === "직접입력") {
      setIsCustomDomain(true);
      setEmailDomain("");
    } else {
      setIsCustomDomain(false);
      setEmailDomain(domain);
    }
  };

  const handleEmailVerification = () => {
    setShowVerification(true);
  };

  const handleVerificationCheck = () => {
    const isVerified = Math.random() < 0.5;
    setVerificationMessage(
      isVerified ? "인증이 완료되었습니다." : "인증 코드가 틀립니다!"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setErrorMessage("이름을 입력해주세요.");
    } else if (!username) {
      setErrorMessage("아이디를 입력해주세요.");
    } else if (
      !usernameMessage ||
      usernameMessage === "이미 사용중인 아이디입니다!"
    ) {
      setErrorMessage("아이디 중복확인을 완료해주세요.");
    } else if (!emailLocal || !emailDomain) {
      setErrorMessage("이메일을 입력해주세요.");
    } else if (
      !verificationMessage ||
      verificationMessage === "인증 코드가 틀립니다!"
    ) {
      setErrorMessage("이메일 인증을 해주세요.");
    } else if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button type="button" onClick={handleUsernameCheck}>
            중복 검사
          </Button>
        </InputGroup>
        {usernameMessage && (
          <Message isError={usernameMessage.includes("이미")}>
            {usernameMessage}
          </Message>
        )}
        <InputGroup>
          <Input
            type="text"
            placeholder="이메일"
            value={emailLocal}
            onChange={(e) => setEmailLocal(e.target.value)}
          />
          <EmailLabel>@</EmailLabel>
          <Input
            type="text"
            value={emailDomain}
            onChange={(e) => setEmailDomain(e.target.value)}
            placeholder="도메인"
            disabled={!isCustomDomain}
          />
          <Select value={emailDomain} onChange={handleEmailDomainChange}>
            <option value="">선택</option>
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="daum.net">daum.net</option>
            <option value="직접입력">직접입력</option>
          </Select>
        </InputGroup>
        <InputGroup>
          <Button type="button" onClick={handleEmailVerification} fullWidth>
            이메일 인증
          </Button>
        </InputGroup>
        {showVerification && (
          <InputGroup>
            <Input
              type="text"
              placeholder="인증 코드"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button type="button" onClick={handleVerificationCheck}>
              인증 확인
            </Button>
          </InputGroup>
        )}
        {verificationMessage && (
          <Message isError={verificationMessage.includes("틀립니다")}>
            {verificationMessage}
          </Message>
        )}
        <InputGroup>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Button type="submit" fullWidth>
            회원가입
          </Button>
        </InputGroup>
        {errorMessage && <Message isError>{errorMessage}</Message>}
      </Form>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>회원가입이 완료되었습니다!</h2>
            <Button
              onClick={() => {
                setShowModal(false);
                navigate("/start");
              }}
            >
              확인
            </Button>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default SignUpForm;
