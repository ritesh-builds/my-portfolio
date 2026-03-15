package com.portfolio.dto.skill;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SkillResponse {

    private final Long id;
    private final String category;
    private final String name;
    private final Integer sortOrder;
}
