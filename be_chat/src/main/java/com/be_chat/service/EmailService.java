package com.be_chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);  // 받는 사람 이메일 주소
        message.setSubject(subject);  // 이메일 제목
        message.setText(body);  // 이메일 내용
        message.setFrom("your-email@gmail.com");  // 발신자 이메일

        mailSender.send(message);
    }
}