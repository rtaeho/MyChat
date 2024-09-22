package com.be_chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddFriendRequestDto {
    private String userId;    // 내 ID
    private String friendId;  // 친구로 추가할 ID
}
