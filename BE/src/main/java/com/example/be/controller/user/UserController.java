package com.example.be.controller.user;

import com.example.be.dto.user.RegisterRequestUser;
import com.example.be.dto.user.UserResponseNoPassDTO;
import com.example.be.entity.user.User;
import com.example.be.service.user.UserService;
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
    public ResponseEntity<UserResponseNoPassDTO> createUser(@Validated @RequestBody RegisterRequestUser registerRequestUser) {
        User registeredUser = userService.createUser(registerRequestUser);
        UserResponseNoPassDTO response = new UserResponseNoPassDTO();
        response.setId(registeredUser.getId());
        response.setFullName(registeredUser.getFullName());
        response.setPhone(registeredUser.getPhone());
        response.setRole(registeredUser.getRole() != null ? registeredUser.getRole().name() : null);
        response.setStatus(registeredUser.getStatus() != null ? registeredUser.getStatus().name() : null);
        response.setAvatar(registeredUser.getAvatar());
        response.setCreatedAt(registeredUser.getCreatedAt());
        response.setUpdatedAt(registeredUser.getUpdatedAt());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
