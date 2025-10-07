package com.example.be.util;

import com.example.be.dto.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;

public class ResponseHandler {

    public static <T> ResponseEntity<ApiResponse<T>> success(
            T data, String message, HttpStatus status
    ) {
        ApiResponse<T> response = ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .status(status.value())
                .timestamp(LocalDateTime.now())
                .data(data)
                .build();
        return ResponseEntity.status(status).body(response);
    }

    public static <T> ResponseEntity<ApiResponse<T>> success(T data, String message) {
        return success(data, message, HttpStatus.OK);
    }

    public static <T> ResponseEntity<ApiResponse<T>> created(T data, String message) {
        return success(data, message, HttpStatus.CREATED);
    }
}