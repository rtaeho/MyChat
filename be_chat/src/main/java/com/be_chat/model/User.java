// src/main/java/com/be_chat/model/User.java
package com.be_chat.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String Id;

    private String userId;
    private String password;
    private String email;
    private String nickName;
    private String name;
    private List<String> friends = new ArrayList<>();
}