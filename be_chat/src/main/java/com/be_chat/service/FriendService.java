package com.be_chat.service;

import com.be_chat.dto.FriendDto;
import com.be_chat.model.User;
import com.be_chat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

@Service
public class FriendService {

    @Autowired
    private UserRepository userRepository;

    // 친구 추가 로직
    public void addFriend(String userId, String friendId) {
        Optional<User> userOpt = userRepository.findByUserId(userId);
        Optional<User> friendOpt = userRepository.findByUserId(friendId);

        if (userOpt.isPresent() && friendOpt.isPresent()) {
            User user = userOpt.get();

            if (!user.getFriends().contains(friendId)) {
                user.getFriends().add(friendId);
                userRepository.save(user);
            }
            else{
                throw new RuntimeException("이미 등록된 친구입니다.");
            }
        } else {
            throw new RuntimeException("유저 또는 친구를 찾을 수 없습니다.");
        }
    }

    // 친구 삭제 로직
    public void deleteFriend(String userId, String friendId) {
        Optional<User> userOpt = userRepository.findByUserId(userId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // 친구 목록이 null일 경우 빈 리스트로 초기화
            if (user.getFriends() != null && user.getFriends().contains(friendId)) {
                user.getFriends().remove(friendId);
                userRepository.save(user);
            } else {
                throw new RuntimeException("친구 목록이 비어 있거나 해당 친구를 찾을 수 없습니다.");
            }
        } else {
            throw new RuntimeException("유저를 찾을 수 없습니다.");
        }
    }

    // 친구 목록 반환 로직
    public List<FriendDto> getFriends(String userId) {
        Optional<User> userOpt = userRepository.findByUserId(userId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            List<String> friendIds = user.getFriends();

            // 친구 목록이 비어 있으면 빈 리스트를 반환
            if (friendIds == null || friendIds.isEmpty()) {
                return new ArrayList<>();
            }

            // 친구 ID를 통해 각각의 친구 정보를 찾아서 반환
            List<FriendDto> friends = new ArrayList<>();
            for (String friendId : friendIds) {
                Optional<User> friendOpt = userRepository.findByUserId(friendId);
                if (friendOpt.isPresent()) {
                    User friend = friendOpt.get();
                    friends.add(new FriendDto(friend.getUserId(), friend.getNickName()));
                }
            }
            return friends;
        } else {
            throw new RuntimeException("유저를 찾을 수 없습니다.");
        }
    }
}
