package com.example.be.service.user;

import com.example.be.dto.user.RegisterRequestUser;
import com.example.be.dto.user.UserResponseNoPassDTO;
import com.example.be.entity.user.User;

public interface UserService {
    UserResponseNoPassDTO createUser(RegisterRequestUser registerRequestUser);
}
