package com.be_chat.repository;

import com.be_chat.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);
    // 아이디로 사용자 조회
    Optional<User> findByUserId(String userId);
    // 이메일로 사용자 조회
    Optional<User> findByEmail(String email);
}