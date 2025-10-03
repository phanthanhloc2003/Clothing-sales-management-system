package com.example.be.service.auth;

import com.example.be.dto.auth.AuthResponse;
import com.example.be.dto.user.LoginRequestUser;

/**
 * Định nghĩa use-cases xác thực:
 * - login: xác thực thông tin và phát hành access/refresh token
 * - refresh: tạo access/refresh mới từ refresh token hợp lệ
 */
public interface AuthService {
    AuthResponse login(LoginRequestUser loginRequestUser);
    AuthResponse refresh(String refreshToken);
    /**
     * Lấy thông tin user hiện tại từ SecurityContext (JWT đã xác thực)
     */
    com.example.be.dto.user.UserResponseNoPassDTO me();
}
