package com.portfolio.dto.contact;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ContactResponse {

    private final String status;
    private final String message;
    private final LocalDateTime submittedAt;
}
