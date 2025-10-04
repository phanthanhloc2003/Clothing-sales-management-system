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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

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

    @Override
    public UserResponseNoPassDTO me() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new InvalidCredentialsException("Unauthorized");
        }
        String phone = authentication.getName();
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new InvalidCredentialsException("Unauthorized"));

        return UserResponseNoPassDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .status(user.getStatus().name())
                .avatar(user.getAvatar())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
