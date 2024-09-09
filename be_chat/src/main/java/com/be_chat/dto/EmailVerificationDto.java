package com.be_chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmailVerificationDto {
    private String email;
    private String verificationCode;
}