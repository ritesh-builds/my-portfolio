import Button from "../common/Button";

function HeroSection({ profile }) {
  const socialButtons = [
    { label: "View Projects", to: "/projects", variant: "primary" },
    { label: "GitHub", href: profile?.githubUrl, variant: "secondary", external: true },
    { label: "LinkedIn", href: profile?.linkedinUrl, variant: "secondary", external: true },
    {
      label: profile?.resumeUrl ? "Download Resume" : "Resume Coming Soon",
      href: profile?.resumeUrl,
      variant: "ghost",
      external: true,
      disabled: !profile?.resumeUrl
    }
  ];

  return (
    <section className="hero-grid">
      <div className="hero-copy">
        <span className="eyebrow">Java Full-Stack Portfolio</span>
        <h1>{profile?.fullName}</h1>
        <p className="hero-tagline">{profile?.tagline}</p>
        <p className="section-copy">{profile?.intro}</p>

        <div className="cta-row">
          {socialButtons.map((button) => (
            <Button key={button.label} {...button}>
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      <aside className="hero-panel">
        <div className="metric-card">
          <span className="metric-label">Role</span>
          <strong>{profile?.headline}</strong>
        </div>
        <div className="metric-card">
          <span className="metric-label">Location</span>
          <strong>{profile?.location}</strong>
        </div>
        <div className="metric-card">
          <span className="metric-label">Focus</span>
          <strong>{profile?.learningFocus}</strong>
        </div>
      </aside>
    </section>
  );
}

export default HeroSection;
