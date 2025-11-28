package com.aptpath.task2.repository;

import com.aptpath.task2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // ✅ ONLY THIS NEEDED
}
