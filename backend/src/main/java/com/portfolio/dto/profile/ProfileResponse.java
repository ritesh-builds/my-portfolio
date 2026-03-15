package com.portfolio.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ProfileResponse {

    private final String fullName;
    private final String headline;
    private final String tagline;
    private final String intro;
    private final String about;
    private final String interests;
    private final String learningFocus;
    private final String careerGoal;
    private final String location;
    private final String email;
    private final String githubUrl;
    private final String linkedinUrl;
    private final String instagramUrl;
    private final String twitterUrl;
    private final String resumeUrl;
}
