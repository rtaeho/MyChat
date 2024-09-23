package com.be_chat.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "messages")
public class Message {
    @Id
    private String id;
    private String chatRoomId; // 채팅방 ID
    private String senderId; // 메시지 전송자 ID
    private String text; // 메시지 내용
    private LocalDateTime timestamp; // 메시지 전송 시간
}
