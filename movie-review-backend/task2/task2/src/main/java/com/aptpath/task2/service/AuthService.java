package com.aptpath.task2.service;

import com.aptpath.task2.dto.LoginRequest;
import com.aptpath.task2.dto.LoginResponse;
import com.aptpath.task2.dto.RegisterRequest;
import com.aptpath.task2.dto.RegisterResponse;
import com.aptpath.task2.entity.Role;
import com.aptpath.task2.entity.User;
import com.aptpath.task2.repository.UserRepository;
import com.aptpath.task2.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;


    // ✅ Only REVIEWERs can register
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Force the role to be REVIEWER
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.REVIEWER) // Force only REVIEWER role
                .build();

        userRepository.save(user);

        return new RegisterResponse("Reviewer registered successfully");
    }

    // ✅ Login and generate JWT
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        return new LoginResponse(token);
    }

}
