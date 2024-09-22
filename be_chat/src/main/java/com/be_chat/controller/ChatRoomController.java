package com.be_chat.controller;

import com.be_chat.model.ChatRoom;
import com.be_chat.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatrooms")
public class ChatRoomController {
    @Autowired
    private ChatRoomService chatRoomService;

    // 특정 유저의 채팅방 목록 반환
    @GetMapping("/{userId}")
    public ResponseEntity<List<ChatRoom>> getChatRooms(@PathVariable String userId) {
        List<ChatRoom> chatRooms = chatRoomService.getChatRoomsByUserId(userId);
        return ResponseEntity.ok(chatRooms);
    }

    // 새로운 1:1 채팅방 생성
    @PostMapping("/create")
    public ResponseEntity<ChatRoom> createChatRoom(@RequestParam String user1, @RequestParam String user2) {
        ChatRoom newChatRoom = chatRoomService.createChatRoom(user1, user2);
        return ResponseEntity.ok(newChatRoom);
    }
}