package com.portfolio.config;

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
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

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
        if (profileRepository.count() > 0) {
            return;
        }

        profileRepository.save(Profile.builder()
                .fullName("Ritesh Kumar")
                .headline("Java Full-Stack Dev")
                .tagline("Always be stronger than your excuses...")
                .intro("I am Ritesh Kumar, a BTech CSE student at UIET MDU Rohtak who is building a strong foundation in Java full-stack development with React, Spring Boot, and MySQL.")
                .about("I am currently studying at UIET MDU and focusing on practical full-stack development. I enjoy turning what I learn into real projects, improving my problem-solving skills, and building clean applications that connect frontend experiences with backend systems.")
                .interests("Music, thinking")
                .learningFocus("Java Spring Boot, React, MySQL, and full-stack project architecture.")
                .careerGoal("To grow into a strong full-stack developer and build production-ready web applications.")
                .location("Karnal")
                .email("riteshpeepal@gmail.com")
                .githubUrl("https://github.com/ritesh-builds")
                .linkedinUrl("https://www.linkedin.com/in/ritesh-kumar-470307316/")
                .instagramUrl("https://www.instagram.com/its.ritesh.hr/")
                .twitterUrl("https://x.com/Code_By_Ritesh")
                .resumeUrl(null)
                .build());
    }

    private void seedSkills() {
        if (skillRepository.count() > 0) {
            return;
        }

        skillRepository.saveAll(List.of(
                skill("Languages", "Python", 1),
                skill("Languages", "Java", 2),
                skill("Languages", "JavaScript", 3),
                skill("Languages", "C", 4),
                skill("Languages", "C++", 5),
                skill("Frontend", "React", 1),
                skill("Frontend", "Vite", 2),
                skill("Frontend", "HTML", 3),
                skill("Frontend", "CSS", 4),
                skill("Backend", "Spring Boot", 1),
                skill("Backend", "Node.js", 2),
                skill("Backend", "REST APIs", 3),
                skill("Database", "MySQL", 1),
                skill("Database", "MongoDB", 2),
                skill("Tools", "Git", 1)
        ));
    }

    private void seedProjects() {
        if (projectRepository.count() > 0) {
            return;
        }

        projectRepository.saveAll(List.of(
                project(
                        "Full Stack Portfolio Website (Current Project)",
                        "A full stack portfolio website built with React, Spring Boot, and MySQL. It includes an admin dashboard for managing projects and viewing contact messages, JWT authentication, and REST APIs.",
                        "Coming Soon",
                        "Coming Soon",
                        List.of("React", "Spring Boot", "MySQL", "JWT", "Axios"),
                        1,
                        true
                ),
                project(
                        "Upcoming Backend API Project",
                        "A backend project currently being developed using Spring Boot and MySQL that will demonstrate REST APIs, database integration, and clean layered architecture.",
                        "Coming Soon",
                        "N/A",
                        List.of("Java", "Spring Boot", "MySQL"),
                        2,
                        false
                ),
                project(
                        "Upcoming Full Stack Application",
                        "A full stack application planned for future development to demonstrate frontend and backend integration using React and Spring Boot.",
                        "Coming Soon",
                        "Coming Soon",
                        List.of("React", "Spring Boot", "MySQL"),
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
