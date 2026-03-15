function isExternalUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

function ProjectLink({ label, value }) {
  if (!value) {
    return <span className="project-link project-link-disabled">{label}: N/A</span>;
  }

  if (!isExternalUrl(value)) {
    return (
      <span className="project-link project-link-disabled">
        {label}: {value}
      </span>
    );
  }

  return (
    <a className="project-link" href={value} rel="noreferrer" target="_blank">
      {label}
    </a>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-head">
        <span className="eyebrow">Project</span>
        {project.featured && <span className="skill-pill">Featured</span>}
      </div>
      <h3>{project.title}</h3>
      <p className="section-copy">{project.description}</p>

      <div className="tech-list">
        {project.techStack.map((item) => (
          <span key={item} className="tech-chip">
            {item}
          </span>
        ))}
      </div>

      <div className="project-links">
        <ProjectLink label="GitHub" value={project.githubLink} />
        <ProjectLink label="Live Demo" value={project.liveLink} />
      </div>
    </article>
  );
}

export default ProjectCard;
