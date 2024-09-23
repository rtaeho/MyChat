package com.be_chat.controller;

import com.be_chat.model.Message;
import com.be_chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private MessageService messageService;

    // 채팅방 메시지 불러오기
    @GetMapping("/{chatRoomId}/messages")
    public List<Message> getMessages(@PathVariable String chatRoomId) {
        return messageService.getMessagesByChatRoom(chatRoomId);
    }

    // 새로운 메시지 저장
    @PostMapping("/{chatRoomId}/messages")
    public Message sendMessage(@PathVariable String chatRoomId, @RequestBody Message message) {
        return messageService.saveMessage(chatRoomId, message.getSenderId(), message.getText());
    }
}
