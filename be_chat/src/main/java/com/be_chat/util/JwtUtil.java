package com.be_chat.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.ResponseCookie;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtil {

    // 비밀키 (Access Token과 Refresh Token 공통 사용)
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Access Token 유효 시간 (15분)
    private static final long ACCESS_TOKEN_EXPIRATION_TIME = 15 * 60 * 1000;

    // Refresh Token 유효 시간 (7일)
    private static final long REFRESH_TOKEN_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;

    // Access Token 생성
    public static String generateAccessToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)  // JWT의 subject 필드에 사용자 ID 저장
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))  // 만료 시간 설정
                .signWith(SECRET_KEY)  // 서명 알고리즘 및 비밀키 사용
                .compact();  // JWT 생성
    }

    // Refresh Token 생성
    public static String generateRefreshToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)  // JWT의 subject 필드에 사용자 ID 저장
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))  // 만료 시간 설정
                .signWith(SECRET_KEY)  // 서명 알고리즘 및 비밀키 사용
                .compact();  // JWT 생성
    }

    // JWT 검증 (토큰이 유효한지 검증하고 사용자 ID 반환)
    public static String validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)  // 서명 검증을 위한 비밀키 설정
                .build()
                .parseClaimsJws(token)  // 토큰 파싱 및 검증
                .getBody()
                .getSubject();  // 토큰의 subject (사용자 ID) 반환
    }

    // JWT를 HttpOnly 쿠키로 생성
    public static ResponseCookie createJwtCookie(String name, String token, long maxAge) {
        return ResponseCookie.from(name, token)
                .httpOnly(true)  // HttpOnly 속성 설정 (JavaScript에서 쿠키 접근 불가)
                .secure(true)  // HTTPS 환경에서만 전송 (secure 속성)
                .path("/")  // 모든 경로에서 쿠키 사용 가능
                .maxAge(maxAge)  // 쿠키의 유효 기간 설정 (초 단위)
                .sameSite("Strict")  // CSRF 공격 방지 (SameSite 설정)
                .build();  // 쿠키 생성
    }

    // JWT 쿠키 삭제 (유효 기간 0으로 설정)
    public static ResponseCookie deleteJwtCookie(String name) {
        return ResponseCookie.from(name, "")
                .httpOnly(true)  // HttpOnly 속성
                .secure(true)  // secure 속성
                .path("/")  // 모든 경로에서 삭제
                .maxAge(0)  // 유효 기간 0으로 설정
                .sameSite("Strict")  // SameSite 설정
                .build();  // 쿠키 삭제
    }
}