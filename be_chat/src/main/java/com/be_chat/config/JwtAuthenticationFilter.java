package com.be_chat.config;

import com.be_chat.util.JwtUtil;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final List<String> EXCLUDED_PATHS = List.of("/api/auth/login", "/api/user/**");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        // 인증이 필요 없는 경로는 JWT 검증을 하지 않음
        if (isExcludedPath(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 쿠키에서 accessToken과 refreshToken 가져오기
        Optional<Cookie> accessTokenCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> "accessToken".equals(cookie.getName()))
                .findFirst();
        Optional<Cookie> refreshTokenCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> "refreshToken".equals(cookie.getName()))
                .findFirst();

        if (accessTokenCookie.isPresent()) {
            String accessToken = accessTokenCookie.get().getValue();

            try {
                // accessToken 검증
                String userId = JwtUtil.validateToken(accessToken);
                // 인증 설정
                PreAuthenticatedAuthenticationToken authentication =
                        new PreAuthenticatedAuthenticationToken(userId, null, null);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                // accessToken이 만료된 경우 refreshToken으로 갱신 시도
                if (refreshTokenCookie.isPresent()) {
                    String refreshToken = refreshTokenCookie.get().getValue();

                    try {
                        // refreshToken 검증 및 accessToken 재발급
                        String userId = JwtUtil.validateToken(refreshToken);  // refreshToken 유효성 검증
                        String newAccessToken = JwtUtil.generateAccessToken(userId);
                        String newRefreshToken = JwtUtil.generateRefreshToken(userId);

                        // 새로 발급된 accessToken과 refreshToken을 쿠키에 저장
                        response.addHeader("Set-Cookie", JwtUtil.createJwtCookie("accessToken", newAccessToken, 15 * 60).toString());
                        response.addHeader("Set-Cookie", JwtUtil.createJwtCookie("refreshToken", newRefreshToken, 7 * 24 * 60 * 60).toString());

                        // 인증 설정
                        PreAuthenticatedAuthenticationToken authentication =
                                new PreAuthenticatedAuthenticationToken(userId, null, null);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    } catch (Exception ex) {
                        // refreshToken이 유효하지 않으면 인증 실패 처리
                        SecurityContextHolder.clearContext();
                    }
                } else {
                    // refreshToken이 없을 경우 인증 실패 처리
                    SecurityContextHolder.clearContext();
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private boolean isExcludedPath(String requestURI) {
        return EXCLUDED_PATHS.stream().anyMatch(requestURI::startsWith);
    }
}