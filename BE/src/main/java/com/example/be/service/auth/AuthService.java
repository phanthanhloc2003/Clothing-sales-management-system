package com.example.be.service.auth;

import com.example.be.dto.auth.AuthResponse;
import com.example.be.dto.user.LoginRequestUser;
import com.example.be.dto.user.UserResponseNoPassDTO;

public interface AuthService {
    AuthResponse login(LoginRequestUser loginRequestUser);
    AuthResponse refresh(String refreshToken);
    UserResponseNoPassDTO me();
}
