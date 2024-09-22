package com.be_chat.controller;

import com.be_chat.dto.AddFriendRequestDto;
import com.be_chat.dto.FriendDto;
import com.be_chat.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendController {

    @Autowired
    private FriendService friendService;

    // 친구 목록 반환
    @GetMapping("/{userId}")
    public ResponseEntity<List<FriendDto>> getFriends(@PathVariable String userId) {
        List<FriendDto> friends = friendService.getFriends(userId);
        return ResponseEntity.ok(friends);
    }

    // 친구 추가
    @PostMapping("/add")
    public ResponseEntity<String> addFriend(@RequestBody AddFriendRequestDto addFriendRequestDto) {
        friendService.addFriend(addFriendRequestDto.getUserId(), addFriendRequestDto.getFriendId());
        return ResponseEntity.ok("친구 추가 완료");
    }

    // 친구 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFriend(@RequestBody AddFriendRequestDto AddFriendRequestDto) {
        System.out.println(AddFriendRequestDto);
        friendService.deleteFriend(AddFriendRequestDto.getUserId(), AddFriendRequestDto.getFriendId());
        return ResponseEntity.ok("친구 삭제 완료");
    }
}
