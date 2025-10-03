package com.example.be.service.user;

import com.example.be.dto.user.RegisterRequestUser;
import com.example.be.entity.user.User;
import com.example.be.exception.UserAlreadyExistsException;
import com.example.be.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements  UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public User createUser(RegisterRequestUser registerRequestUser) {
         if(userRepository.findByPhone(registerRequestUser.getPhone()).isPresent()){
             throw new UserAlreadyExistsException("User with phone " + registerRequestUser.getPhone() + " already exists");
         }
         User user = User.builder()
                 .fullName(registerRequestUser.getFullName())
                 .password(passwordEncoder.encode(registerRequestUser.getPassword()))
                 .phone(registerRequestUser.getPhone())
                 .role(User.Role.USER)
                 .status(User.Status.ACTIVE)
                 .build();
        return userRepository.save(user);
    }
}
