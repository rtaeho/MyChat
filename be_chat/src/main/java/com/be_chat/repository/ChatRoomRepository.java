package com.be_chat.repository;

import com.be_chat.model.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    List<ChatRoom> findByUser1OrUser2(String user1, String user2);
    Optional<ChatRoom> findByUser1AndUser2(String user1, String user2);
    Optional<ChatRoom> findByUser2AndUser1(String user2, String user1);
}