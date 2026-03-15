package com.portfolio.service;

import com.portfolio.config.JwtService;
import com.portfolio.dto.auth.LoginRequest;
import com.portfolio.dto.auth.LoginResponse;
import com.portfolio.model.AdminUser;
import com.portfolio.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuthService {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        AdminUser adminUser = adminUserRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password."));

        if (!passwordEncoder.matches(request.getPassword(), adminUser.getPasswordHash())) {
            throw new BadCredentialsException("Invalid username or password.");
        }

        return LoginResponse.builder()
                .token(jwtService.generateToken(adminUser.getUsername()))
                .tokenType("Bearer")
                .username(adminUser.getUsername())
                .expiresInSeconds(jwtService.getExpirationInSeconds())
                .build();
    }
}
