package com.portfolio.dto.project;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ProjectResponse {

    private final Long id;
    private final String title;
    private final String description;
    private final String githubLink;
    private final String liveLink;
    private final List<String> techStack;
    private final Integer displayOrder;
    private final boolean featured;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;
}
