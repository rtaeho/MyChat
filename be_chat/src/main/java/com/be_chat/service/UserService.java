package com.be_chat.service;

import com.be_chat.dto.LoginRequestDto;
import com.be_chat.dto.UserRequestDto;
import com.be_chat.dto.EmailVerificationDto;
import com.be_chat.model.User;
import com.be_chat.model.VerificationToken;
import com.be_chat.repository.UserRepository;
import com.be_chat.repository.VerificationTokenRepository;
import com.be_chat.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // 아이디 중복 검사
    public boolean checkUserIdDuplicate(String userId) {
        return userRepository.existsByUserId(userId);
    }

    // 이메일 중복 검사
    public boolean checkEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }

    // 이메일 인증 코드 유효성 검사
    public boolean verifyEmailCode(EmailVerificationDto emailVerificationDto) {
        Optional<VerificationToken> verificationTokenOpt = tokenRepository.findByEmailAndToken(
                emailVerificationDto.getEmail(), emailVerificationDto.getVerificationCode());

        if (verificationTokenOpt.isEmpty()) {
            return false;  // 유효하지 않은 인증 코드
        }

        VerificationToken verificationToken = verificationTokenOpt.get();
        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return false;  // 인증 코드가 만료됨
        }

        return true;  // 인증 코드가 유효함
    }

    // 회원가입 로직
    public boolean registerUser(UserRequestDto userRequestDto, HttpServletResponse response) {
        // 아이디 또는 이메일 중복 확인
        if (checkUserIdDuplicate(userRequestDto.getUserId()) || checkEmailDuplicate(userRequestDto.getEmail())) {
            return false;  // 아이디 또는 이메일 중복
        }

        // 이메일 인증이 완료된 경우에만 회원가입 가능
        if (!verifyEmailCode(new EmailVerificationDto(userRequestDto.getEmail(), userRequestDto.getVerificationCode()))) {
            return false;  // 이메일 인증이 완료되지 않음
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(userRequestDto.getPassword());

        // 사용자 생성 및 저장
        User user = new User();
        user.setUserId(userRequestDto.getUserId());
        user.setPassword(encodedPassword);
        user.setEmail(userRequestDto.getEmail());
        user.setNickName(userRequestDto.getNickName());
        user.setName(userRequestDto.getName());

        userRepository.save(user);

        // Access Token 및 Refresh Token 생성
        String accessToken = JwtUtil.generateAccessToken(user.getUserId());
        String refreshToken = JwtUtil.generateRefreshToken(user.getUserId());

        // Access Token을 HttpOnly 쿠키로 저장
        response.addHeader("Set-Cookie", JwtUtil.createJwtCookie("accessToken", accessToken, 15 * 60).toString());

        // Refresh Token을 HttpOnly 쿠키로 저장
        response.addHeader("Set-Cookie", JwtUtil.createJwtCookie("refreshToken", refreshToken, 7 * 24 * 60 * 60).toString());

        return true;  // 회원가입 성공
    }

    // 이메일 인증 코드 발송 로직
    public boolean sendEmailVerification(String email) {
        // 이메일 중복 확인
        if (checkEmailDuplicate(email)) {
            return false;  // 이미 존재하는 이메일
        }

        // 인증 코드 생성
        String verificationCode = UUID.randomUUID().toString().substring(0, 6); // 6자리 랜덤 코드 생성
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setEmail(email);
        verificationToken.setToken(verificationCode);
        verificationToken.setExpiryDate(LocalDateTime.now().plusMinutes(10));  // 10분간 유효

        tokenRepository.save(verificationToken);

        // 이메일 발송
        String message = "회원가입을 완료하려면 다음 인증 코드를 입력하세요: " + verificationCode;
        emailService.sendVerificationEmail(email, "이메일 인증", message);

        return true;  // 인증 메일 발송 성공
    }

    // 사용자 인증 (로그인)
    public boolean authenticateUser(LoginRequestDto loginRequestDto) {
        Optional<User> userOpt = userRepository.findByUserId(loginRequestDto.getUserId());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // 비밀번호 일치 여부 확인
            return passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword());
        }
        return false;
    }

    // 사용자 정보 조회
    public Optional<User> getUserByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }
}