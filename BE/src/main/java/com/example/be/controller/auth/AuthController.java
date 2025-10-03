package com.example.be.controller.auth;

import com.example.be.dto.auth.AuthResponse;
import com.example.be.dto.user.LoginRequestUser;
import com.example.be.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller cho xác thực:
 * - POST /auth/login: đăng nhập, trả access/refresh token + thông tin user
 * - POST /auth/refresh: nhận refresh token, trả token mới
 */
@RestController()
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Validated @RequestBody LoginRequestUser request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody String refreshToken) {
        AuthResponse response = authService.refresh(refreshToken);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
