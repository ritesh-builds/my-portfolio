package com.portfolio.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LoginResponse {

    private final String token;
    private final String tokenType;
    private final String username;
    private final long expiresInSeconds;
}
