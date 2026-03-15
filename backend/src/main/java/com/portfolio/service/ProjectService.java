package com.portfolio.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.dto.project.ProjectRequest;
import com.portfolio.dto.project.ProjectResponse;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.model.Project;
import com.portfolio.repository.ProjectRepository;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ObjectMapper objectMapper;

    public List<ProjectResponse> getPublicProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<ProjectResponse> getAdminProjects() {
        return getPublicProjects();
    }

    @Transactional
    public ProjectResponse createProject(ProjectRequest request) {
        Project project = Project.builder()
                .title(request.getTitle().trim())
                .description(request.getDescription().trim())
                .githubLink(normalizeOptionalString(request.getGithubLink()))
                .liveLink(normalizeOptionalString(request.getLiveLink()))
                .techStackJson(serializeTechStack(request.getTechStack()))
                .displayOrder(resolveDisplayOrder(request.getDisplayOrder()))
                .featured(request.isFeatured())
                .build();

        return mapToResponse(projectRepository.save(project));
    }

    @Transactional
    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found."));

        project.setTitle(request.getTitle().trim());
        project.setDescription(request.getDescription().trim());
        project.setGithubLink(normalizeOptionalString(request.getGithubLink()));
        project.setLiveLink(normalizeOptionalString(request.getLiveLink()));
        project.setTechStackJson(serializeTechStack(request.getTechStack()));
        project.setDisplayOrder(resolveDisplayOrder(request.getDisplayOrder()));
        project.setFeatured(request.isFeatured());

        return mapToResponse(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found."));
        projectRepository.delete(project);
    }

    private Integer resolveDisplayOrder(Integer requestedDisplayOrder) {
        if (requestedDisplayOrder != null) {
            return requestedDisplayOrder;
        }
        return projectRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc().size() + 1;
    }

    private ProjectResponse mapToResponse(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .githubLink(project.getGithubLink())
                .liveLink(project.getLiveLink())
                .techStack(deserializeTechStack(project.getTechStackJson()))
                .displayOrder(project.getDisplayOrder())
                .featured(project.isFeatured())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }

    private String serializeTechStack(List<String> techStack) {
        List<String> normalizedTechStack = techStack.stream()
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .toList();

        try {
            return objectMapper.writeValueAsString(normalizedTechStack);
        } catch (JsonProcessingException exception) {
            throw new IllegalArgumentException("Unable to serialize tech stack.", exception);
        }
    }

    private List<String> deserializeTechStack(String techStackJson) {
        try {
            return objectMapper.readValue(techStackJson, new TypeReference<>() {
            });
        } catch (JsonProcessingException exception) {
            return Collections.emptyList();
        }
    }

    private String normalizeOptionalString(String value) {
        if (value == null) {
            return null;
        }
        String normalized = value.trim();
        return normalized.isEmpty() ? null : normalized;
    }
}
