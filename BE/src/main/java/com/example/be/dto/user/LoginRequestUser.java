package com.example.be.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestUser {
    private String phone;
    private String password;
}
