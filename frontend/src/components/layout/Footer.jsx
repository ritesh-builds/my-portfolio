import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileService";

function Footer() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let active = true;

    getProfile()
      .then(({ data }) => {
        if (active) {
          setProfile(data);
        }
      })
      .catch(() => {
        if (active) {
          setProfile(null);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <span className="eyebrow">Portfolio</span>
          <h3>{profile?.fullName || "Ritesh Kumar"}</h3>
          <p className="section-copy">
            Java full-stack portfolio built with React, Spring Boot, and MySQL.
          </p>
        </div>

        <div className="footer-links">
          {profile?.githubUrl && (
            <a href={profile.githubUrl} rel="noreferrer" target="_blank">
              GitHub
            </a>
          )}
          {profile?.linkedinUrl && (
            <a href={profile.linkedinUrl} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
          )}
          {profile?.instagramUrl && (
            <a href={profile.instagramUrl} rel="noreferrer" target="_blank">
              Instagram
            </a>
          )}
          {profile?.twitterUrl && (
            <a href={profile.twitterUrl} rel="noreferrer" target="_blank">
              X / Twitter
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
