package com.example.be.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    private static Map<String, Object> baseBody(HttpStatus status, Object data, String message, boolean success) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("success", success);
        body.put("message", message);
        body.put("data", data);
        return body;
    }

    public static ResponseEntity<Map<String, Object>> ok(Object data, String message) {
        HttpStatus status = HttpStatus.OK;
        return new ResponseEntity<>(baseBody(status, data, message, true), status);
    }

    public static ResponseEntity<Map<String, Object>> created(Object data, String message) {
        HttpStatus status = HttpStatus.CREATED;
        return new ResponseEntity<>(baseBody(status, data, message, true), status);
    }

    public static ResponseEntity<Map<String, Object>> error(HttpStatus status, String message, Object error) {
        Map<String, Object> body = baseBody(status, null, message, false);
        body.put("error", error);
        return new ResponseEntity<>(body, status);
    }
}


