package com.be_chat.service;

import com.be_chat.model.ChatRoom;
import com.be_chat.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatRoomService {
    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public List<ChatRoom> getChatRoomsByUserId(String userId) {
        return chatRoomRepository.findByUser1OrUser2(userId, userId);
    }

    public ChatRoom createChatRoom(String user1, String user2) {
        // 기존 채팅방이 있는지 확인 (user1 -> user2 or user2 -> user1)
        Optional<ChatRoom> existingChatRoom = chatRoomRepository.findByUser1AndUser2(user1, user2)
                .or(() -> chatRoomRepository.findByUser2AndUser1(user1, user2));

        // 이미 채팅방이 있으면 해당 채팅방을 반환
        if (existingChatRoom.isPresent()) {
            return existingChatRoom.get();
        }

        // 새로운 채팅방을 생성
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setUser1(user1);
        chatRoom.setUser2(user2);
        return chatRoomRepository.save(chatRoom);
    }
}
