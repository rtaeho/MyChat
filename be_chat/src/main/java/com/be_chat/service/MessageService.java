package com.be_chat.service;

import com.be_chat.model.Message;
import com.be_chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    // 채팅방의 모든 메시지 가져오기
    public List<Message> getMessagesByChatRoom(String chatRoomId) {
        return messageRepository.findByChatRoomIdOrderByTimestampAsc(chatRoomId);
    }

    // 메시지 저장
    public Message saveMessage(String chatRoomId, String senderId, String text) {
        Message message = new Message();
        message.setChatRoomId(chatRoomId);
        message.setSenderId(senderId);
        message.setText(text);
        message.setTimestamp(LocalDateTime.now());

        return messageRepository.save(message);
    }
}
