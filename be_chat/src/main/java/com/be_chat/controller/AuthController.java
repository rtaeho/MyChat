package com.be_chat.controller;

import com.be_chat.dto.LoginRequestDto;
import com.be_chat.dto.UserResponseDto;
import com.be_chat.model.User;
import com.be_chat.repository.UserRepository;
import com.be_chat.service.UserService;
import com.be_chat.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // 로그인 - Access Token과 Refresh Token 발급
    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody LoginRequestDto loginRequestDto, HttpServletResponse response) {
        if (userService.authenticateUser(loginRequestDto)) {

            String userId = loginRequestDto.getUserId();
            // Access Token과 Refresh Token 생성
            String accessToken = JwtUtil.generateAccessToken(userId);
            String refreshToken = JwtUtil.generateRefreshToken(userId);

            // Access Token을 HttpOnly 쿠키로 저장
            ResponseCookie accessCookie = JwtUtil.createJwtCookie("accessToken", accessToken, 15 * 60); // 15분 유효
            response.addHeader("Set-Cookie", accessCookie.toString());

            // Refresh Token을 HttpOnly 쿠키로 저장
            ResponseCookie refreshCookie = JwtUtil.createJwtCookie("refreshToken", refreshToken, 7 * 24 * 60 * 60); // 7일 유효
            response.addHeader("Set-Cookie", refreshCookie.toString());

            // 유저 정보를 담은 UserResponseDto 반환 (닉네임 포함)
            Optional<User> userOptional = userRepository.findByUserId(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                UserResponseDto userResponseDto = new UserResponseDto(userId, user.getNickName()); // 닉네임 포함
                return ResponseEntity.ok(userResponseDto);
            } else {
                return ResponseEntity.status(404).body(null); // 유저를 찾을 수 없는 경우 404 상태 반환
            }
        } else {
            return ResponseEntity.status(401).body(null); // 401 상태 반환
        }
    }

    // 로그아웃 - 쿠키 삭제
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        // Access Token과 Refresh Token 쿠키 삭제
        ResponseCookie deleteAccessCookie = JwtUtil.deleteJwtCookie("accessToken");
        ResponseCookie deleteRefreshCookie = JwtUtil.deleteJwtCookie("refreshToken");

        response.addHeader("Set-Cookie", deleteAccessCookie.toString());
        response.addHeader("Set-Cookie", deleteRefreshCookie.toString());

        // 빈 응답으로 200 OK 반환
        return ResponseEntity.noContent().build();
    }
}