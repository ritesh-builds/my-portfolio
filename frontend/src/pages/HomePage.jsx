import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import HeroSection from "../components/hero/HeroSection";
import Loader from "../components/common/Loader";
import ProjectCard from "../components/projects/ProjectCard";
import { getProfile } from "../services/profileService";
import { getProjects } from "../services/projectService";

function HomePage() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    Promise.all([getProfile(), getProjects()])
      .then(([profileResponse, projectResponse]) => {
        if (!active) {
          return;
        }

        setProfile(profileResponse.data);
        setProjects(projectResponse.data);
      })
      .catch(() => {
        if (active) {
          setError("Unable to load the portfolio right now.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="page-section centered-panel">
        <Loader label="Loading portfolio..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-section centered-panel">
        <h1>Portfolio unavailable</h1>
        <p className="section-copy">{error}</p>
      </section>
    );
  }

  const featuredProjects = projects.filter((project) => project.featured).slice(0, 2);

  return (
    <>
      <section className="page-section hero-section">
        <HeroSection profile={profile} />
      </section>

      <section className="page-section highlight-section">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">About</span>
            <h2>Building the stack end to end</h2>
          </div>
          <NavLink className="text-link" to="/about">
            Read more
          </NavLink>
        </div>
        <div className="feature-grid">
          <article className="info-panel">
            <h3>Learning Focus</h3>
            <p className="section-copy">{profile.learningFocus}</p>
          </article>
          <article className="info-panel">
            <h3>Interests</h3>
            <p className="section-copy">{profile.interests}</p>
          </article>
          <article className="info-panel">
            <h3>Career Goal</h3>
            <p className="section-copy">{profile.careerGoal}</p>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">Featured Work</span>
            <h2>Current portfolio highlights</h2>
          </div>
          <NavLink className="text-link" to="/projects">
            View all projects
          </NavLink>
        </div>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
