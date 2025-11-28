package com.aptpath.task2.controller;


import com.aptpath.task2.dto.LoginRequest;
import com.aptpath.task2.dto.LoginResponse;
import com.aptpath.task2.dto.RegisterRequest;
import com.aptpath.task2.dto.RegisterResponse;
import com.aptpath.task2.repository.UserRepository;
import com.aptpath.task2.service.AuthService;
import com.aptpath.task2.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.aptpath.task2.entity.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        RegisterResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);

    }
        @GetMapping("/me")
        public ResponseEntity<Map<String, String>> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
            String token = authHeader.substring(7); // Remove 'Bearer '
            String email = jwtUtil.extractUsername(token);

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            Map<String, String> response = new HashMap<>();
            response.put("email", user.getEmail());
            response.put("role", user.getRole().name()); // Assuming role is an enum

            return ResponseEntity.ok(response);
    }
}