import { useEffect, useState } from "react";

const emptyProject = {
  title: "",
  description: "",
  githubLink: "",
  liveLink: "",
  techStackInput: "",
  displayOrder: "",
  featured: false
};

function ProjectFormModal({ isOpen, initialProject, onClose, onSubmit, submitting }) {
  const [formState, setFormState] = useState(emptyProject);

  useEffect(() => {
    if (initialProject) {
      setFormState({
        title: initialProject.title || "",
        description: initialProject.description || "",
        githubLink: initialProject.githubLink || "",
        liveLink: initialProject.liveLink || "",
        techStackInput: initialProject.techStack?.join(", ") || "",
        displayOrder: initialProject.displayOrder?.toString() || "",
        featured: initialProject.featured || false
      });
      return;
    }

    setFormState(emptyProject);
  }, [initialProject, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title: formState.title,
      description: formState.description,
      githubLink: formState.githubLink,
      liveLink: formState.liveLink,
      techStack: formState.techStackInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      displayOrder: formState.displayOrder ? Number(formState.displayOrder) : null,
      featured: formState.featured
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-panel">
        <div className="modal-head">
          <h3>{initialProject ? "Edit project" : "Add project"}</h3>
          <button className="modal-close" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <form className="project-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              name="title"
              type="text"
              value={formState.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              rows="5"
              value={formState.description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Tech Stack
            <input
              name="techStackInput"
              type="text"
              placeholder="React, Spring Boot, MySQL"
              value={formState.techStackInput}
              onChange={handleChange}
              required
            />
          </label>

          <div className="form-two-col">
            <label>
              GitHub Link
              <input
                name="githubLink"
                type="text"
                value={formState.githubLink}
                onChange={handleChange}
              />
            </label>
            <label>
              Live Link
              <input
                name="liveLink"
                type="text"
                value={formState.liveLink}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-two-col">
            <label>
              Display Order
              <input
                name="displayOrder"
                type="number"
                min="1"
                value={formState.displayOrder}
                onChange={handleChange}
              />
            </label>

            <label className="checkbox-label">
              <input
                name="featured"
                type="checkbox"
                checked={formState.featured}
                onChange={handleChange}
              />
              Mark as featured
            </label>
          </div>

          <div className="modal-actions">
            <button className="button button-ghost" onClick={onClose} type="button">
              Cancel
            </button>
            <button className="button button-primary" disabled={submitting} type="submit">
              {submitting ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectFormModal;
