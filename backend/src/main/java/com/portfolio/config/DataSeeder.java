package com.portfolio.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.model.AdminUser;
import com.portfolio.model.Profile;
import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import com.portfolio.repository.AdminUserRepository;
import com.portfolio.repository.ProfileRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.SkillRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    @Value("${app.admin.username:admin}")
    private String adminUsername;

    @Value("${app.admin.password:Admin@123}")
    private String adminPassword;

    @Value("${app.seed.overwrite:false}")
    private boolean overwriteSeedData;

    @Override
    @Transactional
    public void run(String... args) {
        seedAdminUser();
        seedProfile();
        seedSkills();
        seedProjects();
    }

    private void seedAdminUser() {
        if (adminUserRepository.count() > 0) {
            return;
        }

        adminUserRepository.save(AdminUser.builder()
                .username(adminUsername)
                .passwordHash(passwordEncoder.encode(adminPassword))
                .build());
    }

    private void seedProfile() {
        if (!overwriteSeedData && profileRepository.count() > 0) {
            return;
        }

        Profile profile = overwriteSeedData
                ? profileRepository.findFirstByOrderByIdAsc().orElse(Profile.builder().build())
                : Profile.builder().build();

        profile.setFullName("Ritesh Kumar");
        profile.setHeadline("Java Full-Stack Dev");
        profile.setTagline("Always be stronger than your excuses...");
        profile.setIntro("I am Ritesh Kumar, a BTech CSE student at UIET MDU Rohtak who is building a strong foundation in Java full-stack development with React, Spring Boot, and MySQL.");
        profile.setAbout("I am currently studying at UIET MDU and focusing on practical full-stack development. I enjoy turning what I learn into real projects, improving my problem-solving skills, and building clean applications that connect frontend experiences with backend systems.");
        profile.setInterests("Music, thinking");
        profile.setLearningFocus("Backend engineering, Java Spring Boot, and full-stack project architecture.");
        profile.setCareerGoal("To grow into a strong full-stack developer and build production-ready web applications.");
        profile.setLocation("Karnal, Haryana, India");
        profile.setEmail("riteshpeepal@gmail.com");
        profile.setGithubUrl("https://github.com/ritesh-builds");
        profile.setLinkedinUrl("https://www.linkedin.com/in/ritesh-kumar-470307316/");
        profile.setInstagramUrl("https://www.instagram.com/its.ritesh.hr/");
        profile.setTwitterUrl("https://x.com/Code_By_Ritesh");
        profile.setResumeUrl("/resume.png");

        profileRepository.save(profile);
    }

    private void seedSkills() {
        if (!overwriteSeedData && skillRepository.count() > 0) {
            return;
        }

        if (overwriteSeedData) {
            skillRepository.deleteAll();
        }

        skillRepository.saveAll(List.of(
                skill("Languages", "Java", 1),
                skill("Languages", "Python", 2),
                skill("Languages", "JavaScript", 3),
                skill("Languages", "SQL", 4),

                skill("Backend", "Spring Boot", 1),
                skill("Backend", "Spring Security", 2),
                skill("Backend", "REST APIs", 3),
                skill("Backend", "JWT", 4),
                skill("Backend", "OAuth2", 5),

                skill("Databases/Tools", "MongoDB", 1),
                skill("Databases/Tools", "Redis", 2),
                skill("Databases/Tools", "Git", 3),
                skill("Databases/Tools", "GitHub", 4),
                skill("Databases/Tools", "Postman", 5),
                skill("Databases/Tools", "SonarQube", 6),

                skill("Core CS", "Data Structures & Algorithms", 1),
                skill("Core CS", "OOPs", 2),
                skill("Core CS", "DBMS", 3),
                skill("Core CS", "Operating Systems", 4),
                skill("Core CS", "Computer Networks", 5)
        ));
    }

    private void seedProjects() {
        if (!overwriteSeedData && projectRepository.count() > 0) {
            return;
        }

        if (overwriteSeedData) {
            projectRepository.deleteAll();
        }

        projectRepository.saveAll(List.of(
                project(
                        "Journal Application Backend",
                        "Built a backend journal management system using Java and Spring Boot with 10+ REST APIs for authentication and CRUD. Implemented JWT auth, Spring Security, and Google OAuth2 login. Integrated MongoDB for persistence and Redis caching for faster responses, added scheduled email features, and used SonarQube + Postman for quality and testing.",
                        "https://github.com/ritesh-builds/journalApp",
<<<<<<< HEAD
                        "Coming Soon...",
=======
                        "Comming Soon...",
>>>>>>> 81902bccc558ff8acb93275d1e7aeae7509f7b4e
                        List.of("Java", "Spring Boot", "Spring Security", "JWT", "OAuth2", "MongoDB", "Redis", "Scheduler"),
                        1,
                        true
                ),
                project(
                        "Next Project (Coming Soon)",
                        "Coming soon — currently building the next backend-focused project.",
                        "Coming Soon...",
                        "Coming Soon...",
                        List.of("Java", "SpringBoot"),
                        2,
                        false
                ),
                project(
                        "Next Full-Stack Build (Coming Soon)",
                        "Coming soon — a full-stack application with React + Spring Boot.",
                        "Coming Soon",
                        "Coming Soon",
                        List.of("React", "Spring Boot"),
                        3,
                        false
                )
        ));
    }

    private Skill skill(String category, String name, int sortOrder) {
        return Skill.builder()
                .category(category)
                .name(name)
                .sortOrder(sortOrder)
                .build();
    }

    private Project project(
            String title,
            String description,
            String githubLink,
            String liveLink,
            List<String> techStack,
            int displayOrder,
            boolean featured
    ) {
        return Project.builder()
                .title(title)
                .description(description)
                .githubLink(githubLink)
                .liveLink(liveLink)
                .techStackJson(serializeTechStack(techStack))
                .displayOrder(displayOrder)
                .featured(featured)
                .build();
    }

    private String serializeTechStack(List<String> techStack) {
        try {
            return objectMapper.writeValueAsString(techStack);
        } catch (JsonProcessingException exception) {
            throw new IllegalStateException("Unable to seed project tech stack.", exception);
        }
    }
}
