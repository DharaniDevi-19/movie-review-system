package com.aptpath.task2.dto;

import com.aptpath.task2.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}
