package com.example.be.controller.user;

import com.example.be.dto.user.LoginRequestUser;
import com.example.be.dto.user.RegisterRequestUser;
import com.example.be.dto.user.UserResponseNoPassDTO;
import com.example.be.entity.user.User;
import com.example.be.service.user.UserService;
import com.example.be.util.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Validated @RequestBody RegisterRequestUser registerRequestUser) {
        UserResponseNoPassDTO registeredUser = userService.createUser(registerRequestUser);
        return ResponseHandler.created(registeredUser, "User registered successfully");
    }

}
