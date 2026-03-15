import { useEffect, useState } from "react";
import ContactForm from "../components/contact/ContactForm";
import Loader from "../components/common/Loader";
import { getProfile } from "../services/profileService";

function ContactPage() {
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
          setError("Unable to load contact details.");
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
        <Loader label="Loading contact details..." />
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
    <section className="page-section contact-layout">
      <div className="contact-copy">
        <span className="eyebrow">Contact</span>
        <h1>Let&apos;s connect</h1>
        <p className="section-copy">
          Reach out for collaborations, internships, project feedback, or opportunities
          related to Java full-stack development.
        </p>

        <div className="contact-list">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {profile.githubUrl && (
            <a href={profile.githubUrl} rel="noreferrer" target="_blank">
              GitHub
            </a>
          )}
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
          )}
          {profile.instagramUrl && (
            <a href={profile.instagramUrl} rel="noreferrer" target="_blank">
              Instagram
            </a>
          )}
          {profile.twitterUrl && (
            <a href={profile.twitterUrl} rel="noreferrer" target="_blank">
              X / Twitter
            </a>
          )}
        </div>
      </div>

      <ContactForm />
    </section>
  );
}

export default ContactPage;
