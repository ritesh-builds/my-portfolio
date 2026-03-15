package com.portfolio.service;

import com.portfolio.dto.skill.SkillResponse;
import com.portfolio.repository.SkillRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public List<SkillResponse> getSkills() {
        return skillRepository.findAllByOrderByCategoryAscSortOrderAscNameAsc()
                .stream()
                .map(skill -> SkillResponse.builder()
                        .id(skill.getId())
                        .category(skill.getCategory())
                        .name(skill.getName())
                        .sortOrder(skill.getSortOrder())
                        .build())
                .toList();
    }
}
