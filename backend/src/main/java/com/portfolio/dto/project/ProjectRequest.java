package com.portfolio.dto.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectRequest {

    @NotBlank(message = "Project title is required.")
    @Size(max = 140, message = "Title must be 140 characters or fewer.")
    private String title;

    @NotBlank(message = "Project description is required.")
    @Size(max = 2000, message = "Description must be 2000 characters or fewer.")
    private String description;

    @Size(max = 255, message = "GitHub link must be 255 characters or fewer.")
    private String githubLink;

    @Size(max = 255, message = "Live link must be 255 characters or fewer.")
    private String liveLink;

    @NotEmpty(message = "Tech stack must include at least one item.")
    private List<String> techStack;

    private Integer displayOrder;

    private boolean featured;
}
