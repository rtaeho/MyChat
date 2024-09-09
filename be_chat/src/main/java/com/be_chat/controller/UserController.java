package com.be_chat.controller;

import com.be_chat.dto.UserRequestDto;
import com.be_chat.dto.EmailVerificationDto;
import com.be_chat.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 아이디 중복 검사
    @GetMapping("/check-id/{userId}")
    public ResponseEntity<Boolean> checkUserIdDuplicate(@PathVariable String userId) {
        boolean isDuplicate = userService.checkUserIdDuplicate(userId);
        return ResponseEntity.ok(!isDuplicate);  // 중복이면 false, 중복이 아니면 true
    }

    // 이메일 중복 검사
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> checkEmailDuplicate(@PathVariable String email) {
        boolean isDuplicate = userService.checkEmailDuplicate(email);
        return ResponseEntity.ok(!isDuplicate);  // 중복이면 false, 중복이 아니면 true
    }

    // 이메일 인증 코드 발송
    @PostMapping("/send-verification-email")
    public ResponseEntity<Boolean> sendVerificationEmail(@RequestParam String email) {
        boolean result = userService.sendEmailVerification(email);
        return ResponseEntity.ok(result);  // 발송 성공 여부
    }

    // 이메일 인증 코드 검증
    @PostMapping("/verify-email")
    public ResponseEntity<Boolean> verifyEmailCode(@RequestBody EmailVerificationDto emailVerificationDto) {
        boolean isValid = userService.verifyEmailCode(emailVerificationDto);
        return ResponseEntity.ok(isValid);  // 인증 코드 유효성 검사 결과
    }

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<Boolean> registerUser(@RequestBody UserRequestDto userRequestDto, HttpServletResponse response) {
        boolean isRegistered = userService.registerUser(userRequestDto, response);
        return ResponseEntity.ok(isRegistered);  // 회원가입 성공 여부
    }
}