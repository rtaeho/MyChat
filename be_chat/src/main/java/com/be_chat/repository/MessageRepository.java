package com.be_chat.repository;

import com.be_chat.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByChatRoomIdOrderByTimestampAsc(String chatRoomId); // 채팅방 ID 기준으로 메시지 가져오기
}
