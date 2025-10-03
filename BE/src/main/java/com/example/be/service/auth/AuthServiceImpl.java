package com.example.be.service.auth;

import com.example.be.dto.auth.AuthResponse;
import com.example.be.dto.user.LoginRequestUser;
import com.example.be.dto.user.UserResponseNoPassDTO;
import com.example.be.entity.user.User;
import com.example.be.exception.InvalidCredentialsException;
import com.example.be.repository.user.UserRepository;
import com.example.be.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Triển khai logic đăng nhập và làm mới token:
 * - Xác thực phone/password bằng BCrypt
 * - Sinh access/refresh token với claims (role)
 * - Refresh: xác thực refresh token (type, hạn), phát hành token mới
 */
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse login(LoginRequestUser loginRequestUser) {
        User user = userRepository.findByPhone(loginRequestUser.getPhone())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid phone or password"));

        if (!passwordEncoder.matches(loginRequestUser.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid phone or password");
        }

        UserResponseNoPassDTO userDto = UserResponseNoPassDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .status(user.getStatus().name())
                .avatar(user.getAvatar())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name());
        String accessToken = jwtUtil.generateAccessToken(user.getPhone(), claims);
        String refreshToken = jwtUtil.generateRefreshToken(user.getPhone());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .user(userDto)
                .build();
    }

    @Override
    public AuthResponse refresh(String refreshToken) {
        String subject = jwtUtil.extractUsername(refreshToken);
        User user = userRepository.findByPhone(subject)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid refresh token"));

        // validate type claim if needed
        String type = String.valueOf(jwtUtil.extractAllClaims(refreshToken).get("type"));
        if (!"refresh".equals(type) || jwtUtil.isTokenExpired(refreshToken)) {
            throw new InvalidCredentialsException("Invalid refresh token");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name());
        String newAccess = jwtUtil.generateAccessToken(user.getPhone(), claims);
        String newRefresh = jwtUtil.generateRefreshToken(user.getPhone());

        UserResponseNoPassDTO userDto = UserResponseNoPassDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .status(user.getStatus().name())
                .avatar(user.getAvatar())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();

        return AuthResponse.builder()
                .accessToken(newAccess)
                .refreshToken(newRefresh)
                .tokenType("Bearer")
                .user(userDto)
                .build();
    }
}
