import { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import { getProfile } from "../services/profileService";

function AboutPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          setError("Unable to load the about section.");
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
        <Loader label="Loading about section..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-section centered-panel">
        <p className="section-copy">{error}</p>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">About Me</span>
          <h1>{profile.fullName}</h1>
        </div>
      </div>

      <div className="content-grid">
        <article className="content-card content-card-wide">
          <h2>Background</h2>
          <p className="section-copy">{profile.about}</p>
        </article>
        <article className="content-card">
          <h3>Current Path</h3>
          <p className="section-copy">{profile.learningFocus}</p>
        </article>
        <article className="content-card">
          <h3>Interests</h3>
          <p className="section-copy">{profile.interests}</p>
        </article>
        <article className="content-card">
          <h3>Goal</h3>
          <p className="section-copy">{profile.careerGoal}</p>
        </article>
        <article className="content-card">
          <h3>Contact</h3>
          <p className="section-copy">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <p className="section-copy">{profile.location}</p>
        </article>
      </div>
    </section>
  );
}

export default AboutPage;
