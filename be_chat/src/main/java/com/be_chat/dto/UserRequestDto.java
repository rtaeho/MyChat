package com.be_chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserRequestDto {
    private String userId;
    private String password;
    private String email;
    private String name;
    private String nickName;
    private String verificationCode;
}