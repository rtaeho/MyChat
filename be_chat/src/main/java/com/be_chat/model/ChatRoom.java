package com.be_chat.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "chat_rooms")
public class ChatRoom {
    @Id
    private String id;
    private String user1; // 첫 번째 사용자 ID
    private String user2; // 두 번째 사용자 ID
}