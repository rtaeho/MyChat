import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  checkUserIdDuplicate,
  sendVerificationEmail,
  verifyEmailCode,
  registerUser,
} from "../api/user";

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
  margin: -5px 0 10px;
  color: ${(props) => (props.$isError ? "#e53e3e" : "#38a169")};
`;

const ErrorMessage = styled.p`
  margin: -5px 0 10px;
  color: #e53e3e;
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
    props.$fullWidth &&
    `
    width: 100%;
  `}
`;

const SignUpForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  // 아이디 중복 체크
  const handleUsernameCheck = async () => {
    if (!username) {
      setErrorMessage((prev) => ({
        ...prev,
        username: "아이디를 입력해주세요.",
      }));
      return;
    }

    try {
      const response = await checkUserIdDuplicate(username); // API 호출
      setUsernameMessage(
        response ? "사용 가능한 아이디입니다!" : "이미 사용중인 아이디입니다!"
      );
      setIsUsernameChecked(response); // 아이디 중복검사 완료 상태로 설정
      if (response) setErrorMessage((prev) => ({ ...prev, username: "" }));
    } catch (error) {
      setErrorMessage((prev) => ({
        ...prev,
        username: "중복 검사에 실패했습니다.",
      }));
    }
  };

  // 이메일 인증 코드 전송
  const handleEmailVerification = async () => {
    if (!emailLocal && !emailDomain) {
      setErrorMessage((prev) => ({ ...prev, email: "이메일을 입력해주세요." }));
      return;
    }

    try {
      const email = `${emailLocal}@${emailDomain}`;
      const response = await sendVerificationEmail(email); // API 호출
      if (response) {
        setShowVerification(true);
        setErrorMessage((prev) => ({ ...prev, email: "" }));
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          email: "이미 등록된 이메일입니다!",
        }));
        setShowVerification(false);
      }
    } catch (error) {
      setErrorMessage((prev) => ({
        ...prev,
        email: "이메일 인증 코드 전송에 실패했습니다.",
      }));
    }
  };
  const handleEmailDomainChange = (e) => {
    const domain = e.target.value;
    setEmailDomain(domain);

    if (domain && emailLocal) {
      setErrorMessage((prev) => ({ ...prev, email: "" })); // 이메일과 도메인 입력 시 메시지 제거
    }

    if (domain === "직접입력") {
      setIsCustomDomain(true);
      setEmailDomain("");
    } else {
      setIsCustomDomain(false);
      setEmailDomain(domain);
    }
  };

  const handleEmailLocalChange = (e) => {
    setEmailLocal(e.target.value);

    if (e.target.value && emailDomain) {
      setErrorMessage((prev) => ({ ...prev, email: "" })); // 이메일 입력 시 메시지 제거
    }
  };
  // 이메일 인증 코드 확인
  const handleVerificationCheck = async () => {
    if (!verificationCode) {
      setVerificationMessage("인증 코드를 입력해주세요!");
      return;
    }

    try {
      const email = `${emailLocal}@${emailDomain}`;
      const response = await verifyEmailCode(email, verificationCode); // API 호출
      setVerificationMessage(
        response ? "인증이 완료되었습니다." : "인증 코드가 틀립니다!"
      );
      setIsEmailVerified(response); // 이메일 인증 성공 여부 설정
      if (response) {
        setErrorMessage((prev) => ({ ...prev, emailVerification: "" }));
      }
    } catch (error) {
      setVerificationMessage("인증 코드 확인에 실패했습니다.");
    }
  };

  // 비밀번호 확인
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordMessage("비밀번호가 일치하지 않습니다!");
      setIsPasswordConfirmed(false);
    } else if (confirmPassword && e.target.value === confirmPassword) {
      setPasswordMessage("비밀번호가 일치합니다!");
      setIsPasswordConfirmed(true);
      setErrorMessage((prev) => ({ ...prev, password: "" }));
    } else {
      setPasswordMessage("");
    }
    if (e.target.value) {
      setErrorMessage((prev) => ({ ...prev, password: "" }));
    }
  };

  // 비밀번호 확인란
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordMessage("비밀번호가 일치하지 않습니다!");
      setIsPasswordConfirmed(false);
    } else if (password && e.target.value === password) {
      setPasswordMessage("비밀번호가 일치합니다!");
      setIsPasswordConfirmed(true);
      setErrorMessage((prev) => ({ ...prev, password: "" }));
    } else {
      setPasswordMessage("");
    }
  };

  // 회원가입 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!username) {
      errors.username = "아이디를 입력해주세요.";
    } else if (!isUsernameChecked || usernameMessage.includes("이미")) {
      errors.username = "아이디 중복 확인을 완료해주세요.";
    }

    if (!password) {
      errors.password = "비밀번호를 입력해주세요.";
    } else if (!isPasswordConfirmed) {
      errors.password = "비밀번호 확인을 완료해주세요.";
    }

    if (!emailLocal || !emailDomain) {
      errors.email = "이메일을 입력해주세요.";
    } else if (!isEmailVerified) {
      errors.emailVerification = "이메일 인증을 완료해주세요.";
    }

    if (!name) {
      errors.name = "이름을 입력해주세요.";
    }

    if (!nickname) {
      errors.nickname = "닉네임을 입력해주세요.";
    }

    setErrorMessage(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const email = `${emailLocal}@${emailDomain}`;
        const userData = {
          userId: username,
          password,
          email,
          nickName: nickname,
          name,
          verificationCode,
        };

        const response = await registerUser(userData); // 회원가입 API 호출
        if (response) {
          setShowModal(true); // 회원가입 성공 시 모달 표시
        }
      } catch (error) {
        setErrorMessage((prev) => ({
          ...prev,
          form: "회원가입 중 문제가 발생했습니다. 다시 시도해주세요.",
        }));
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (e.target.value) {
                setErrorMessage((prev) => ({ ...prev, username: "" }));
              }
            }}
            autoComplete="username"
          />
          <Button type="button" onClick={handleUsernameCheck}>
            중복 검사
          </Button>
        </InputGroup>
        {usernameMessage ? (
          <Message $isError={usernameMessage.includes("이미")}>
            {usernameMessage}
          </Message>
        ) : (
          errorMessage.username && (
            <ErrorMessage>{errorMessage.username}</ErrorMessage>
          )
        )}

        <InputGroup>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
        </InputGroup>
        <InputGroup>
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            autoComplete="new-password"
            disabled={!password} // 비밀번호가 입력되지 않으면 비밀번호 확인란 비활성화
          />
        </InputGroup>
        {passwordMessage ? (
          <Message $isError={passwordMessage.includes("일치하지")}>
            {passwordMessage}
          </Message>
        ) : (
          errorMessage.password && (
            <ErrorMessage>{errorMessage.password}</ErrorMessage>
          )
        )}

        <InputGroup>
          <Input
            type="text"
            placeholder="이메일"
            value={emailLocal}
            onChange={handleEmailLocalChange}
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
        {errorMessage.email && (
          <ErrorMessage>{errorMessage.email}</ErrorMessage>
        )}

        <InputGroup>
          <Button type="button" onClick={handleEmailVerification} $fullWidth>
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
        {verificationMessage ? (
          <Message $isError={verificationMessage.includes("틀립니다")}>
            {verificationMessage}
          </Message>
        ) : (
          errorMessage.emailVerification && (
            <ErrorMessage>{errorMessage.emailVerification}</ErrorMessage>
          )
        )}

        <InputGroup>
          <Input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value) {
                setErrorMessage((prev) => ({ ...prev, name: "" }));
              }
            }}
          />
        </InputGroup>
        {errorMessage.name && <ErrorMessage>{errorMessage.name}</ErrorMessage>}

        <InputGroup>
          <Input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              if (e.target.value) {
                setErrorMessage((prev) => ({ ...prev, nickname: "" }));
              }
            }}
          />
        </InputGroup>
        {errorMessage.nickname && (
          <ErrorMessage>{errorMessage.nickname}</ErrorMessage>
        )}

        <InputGroup>
          <Button type="submit" $fullWidth>
            회원가입
          </Button>
        </InputGroup>
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
