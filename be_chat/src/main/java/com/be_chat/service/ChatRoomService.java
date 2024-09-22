package com.be_chat.service;

import com.be_chat.model.ChatRoom;
import com.be_chat.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatRoomService {
    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public List<ChatRoom> getChatRoomsByUserId(String userId) {
        return chatRoomRepository.findByUser1OrUser2(userId, userId);
    }

    public ChatRoom createChatRoom(String user1, String user2) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setUser1(user1);
        chatRoom.setUser2(user2);
        return chatRoomRepository.save(chatRoom);
    }
}