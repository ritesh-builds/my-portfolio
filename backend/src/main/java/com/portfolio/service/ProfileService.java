package com.portfolio.service;

import com.portfolio.dto.profile.ProfileResponse;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.model.Profile;
import com.portfolio.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileResponse getProfile() {
        Profile profile = profileRepository.findFirstByOrderByIdAsc()
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found."));

        return ProfileResponse.builder()
                .fullName(profile.getFullName())
                .headline(profile.getHeadline())
                .tagline(profile.getTagline())
                .intro(profile.getIntro())
                .about(profile.getAbout())
                .interests(profile.getInterests())
                .learningFocus(profile.getLearningFocus())
                .careerGoal(profile.getCareerGoal())
                .location(profile.getLocation())
                .email(profile.getEmail())
                .githubUrl(profile.getGithubUrl())
                .linkedinUrl(profile.getLinkedinUrl())
                .instagramUrl(profile.getInstagramUrl())
                .twitterUrl(profile.getTwitterUrl())
                .resumeUrl(profile.getResumeUrl())
                .build();
    }
}
