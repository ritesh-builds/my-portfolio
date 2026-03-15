import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import ProjectFormModal from "../../components/projects/ProjectFormModal";
import {
  createAdminProject,
  deleteAdminProject,
  getAdminProjects,
  updateAdminProject
} from "../../services/adminProjectService";

function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const loadProjects = async () => {
    try {
      const { data } = await getAdminProjects();
      setProjects(data);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = () => {
    setSelectedProject(null);
    setModalOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm("Delete this project from the portfolio?");
    if (!confirmed) {
      return;
    }

    try {
      await deleteAdminProject(projectId);
      setProjects((current) => current.filter((project) => project.id !== projectId));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to delete project.");
    }
  };

  const handleSubmit = async (payload) => {
    setSaving(true);
    setError("");

    try {
      if (selectedProject) {
        await updateAdminProject(selectedProject.id, payload);
      } else {
        await createAdminProject(payload);
      }

      setModalOpen(false);
      setSelectedProject(null);
      await loadProjects();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader label="Loading admin projects..." />;
  }

  return (
    <section className="admin-panel">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Projects</span>
          <h1>Manage portfolio projects</h1>
        </div>
        <button className="button button-primary" onClick={handleCreate} type="button">
          Add Project
        </button>
      </div>

      {error && <div className="form-status form-status-error">{error}</div>}

      <div className="admin-card-list">
        {projects.map((project) => (
          <article key={project.id} className="admin-project-card">
            <div className="project-card-head">
              <h3>{project.title}</h3>
              <span className="skill-pill">Order {project.displayOrder}</span>
            </div>
            <p className="section-copy">{project.description}</p>
            <div className="tech-list">
              {project.techStack.map((item) => (
                <span key={item} className="tech-chip">
                  {item}
                </span>
              ))}
            </div>
            <div className="admin-card-actions">
              <button className="button button-secondary" onClick={() => handleEdit(project)} type="button">
                Edit
              </button>
              <button className="button button-ghost" onClick={() => handleDelete(project.id)} type="button">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        initialProject={selectedProject}
        onClose={() => {
          setModalOpen(false);
          setSelectedProject(null);
        }}
        onSubmit={handleSubmit}
        submitting={saving}
      />
    </section>
  );
}

export default AdminProjectsPage;
