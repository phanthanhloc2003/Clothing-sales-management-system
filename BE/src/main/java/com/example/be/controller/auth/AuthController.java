package com.example.be.controller.auth;

import com.example.be.dto.auth.AuthResponse;
import com.example.be.dto.user.LoginRequestUser;
import com.example.be.dto.user.UserResponseNoPassDTO;
import com.example.be.service.auth.AuthService;
import com.example.be.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.be.dto.auth.RefreshTokenRequest;

@RestController()
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody LoginRequestUser request) {
        AuthResponse response = authService.login(request);
        return ResponseHandler.ok(response, "Login successfully");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@Validated @RequestBody RefreshTokenRequest request) {
        AuthResponse response = authService.refresh(request.getRefreshToken());
        return ResponseHandler.ok(response, "Refresh token successfully");
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        UserResponseNoPassDTO data = authService.me();
        return ResponseHandler.ok(data, "Get current user successfully");
    }
}
