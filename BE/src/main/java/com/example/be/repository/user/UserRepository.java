package com.example.be.repository.user;

import com.example.be.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User , Integer> {
    Optional<User> findByPhone(String phone);
}
