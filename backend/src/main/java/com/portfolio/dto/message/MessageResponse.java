package com.portfolio.dto.message;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MessageResponse {

    private final Long id;
    private final String name;
    private final String email;
    private final String message;
    private final LocalDateTime createdAt;
}
