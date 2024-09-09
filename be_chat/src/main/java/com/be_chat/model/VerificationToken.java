package com.be_chat.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "verification_tokens")
public class VerificationToken {

    @Id
    private String id;  // MongoDB에서 자동 생성되는 고유 ID

    private String email;  // 이메일 주소와 인증 코드를 연결
    private String token;  // 인증 코드
    private LocalDateTime expiryDate;  // 인증 코드 만료 시간
}