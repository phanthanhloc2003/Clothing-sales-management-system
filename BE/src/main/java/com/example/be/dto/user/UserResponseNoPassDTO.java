package com.example.be.dto.user;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseNoPassDTO {
    private Integer id;
    private String fullName;
    private String phone;
    private String role;
    private String status;
    private String avatar;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
