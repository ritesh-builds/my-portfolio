import { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import ProjectCard from "../components/projects/ProjectCard";
import { getProjects } from "../services/projectService";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getProjects()
      .then(({ data }) => {
        if (active) {
          setProjects(data);
        }
      })
      .catch(() => {
        if (active) {
          setError("Unable to load projects.");
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
        <Loader label="Loading projects..." />
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
          <span className="eyebrow">Projects</span>
          <h1>Selected work and upcoming builds</h1>
        </div>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsPage;
