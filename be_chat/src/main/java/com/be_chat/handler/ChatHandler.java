package com.be_chat.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ChatHandler extends TextWebSocketHandler {

    // 채팅방 별로 WebSocket 세션을 관리하는 Map
    private Map<String, List<WebSocketSession>> chatRooms = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = getRoomId(session); // 채팅방 ID를 URI에서 추출
        chatRooms.putIfAbsent(roomId, new ArrayList<>()); // 채팅방이 없으면 생성
        chatRooms.get(roomId).add(session); // 채팅방에 세션 추가
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String roomId = getRoomId(session); // URI에서 채팅방 ID 추출

        // 채팅방에 있는 모든 사용자에게 메시지 전송
        for (WebSocketSession webSocketSession : chatRooms.get(roomId)) {
            if (webSocketSession.isOpen()) {
                webSocketSession.sendMessage(new TextMessage(message.getPayload()));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        String roomId = getRoomId(session);
        chatRooms.get(roomId).remove(session); // 세션이 닫히면 채팅방에서 제거
        if (chatRooms.get(roomId).isEmpty()) {
            chatRooms.remove(roomId); // 채팅방에 남은 세션이 없으면 채팅방 삭제
        }
    }

    private String getRoomId(WebSocketSession session) {
        // URI에서 채팅방 ID 추출 (예: /chat/{roomId}에서 roomId 추출)
        return session.getUri().getPath().split("/chat/")[1];
    }
}
