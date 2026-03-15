import { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import SkillCard from "../components/skills/SkillCard";
import { getSkills } from "../services/skillService";

function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getSkills()
      .then(({ data }) => {
        if (active) {
          setSkills(data);
        }
      })
      .catch(() => {
        if (active) {
          setError("Unable to load skills.");
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

  const groupedSkills = skills.reduce((groups, skill) => {
    groups[skill.category] = groups[skill.category] || [];
    groups[skill.category].push(skill);
    return groups;
  }, {});

  if (loading) {
    return (
      <section className="page-section centered-panel">
        <Loader label="Loading skills..." />
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
          <span className="eyebrow">Skills</span>
          <h1>Core technologies</h1>
        </div>
      </div>

      <div className="skill-category-list">
        {Object.entries(groupedSkills).map(([category, items]) => (
          <section key={category} className="skill-category">
            <div className="section-heading-row">
              <h2>{category}</h2>
            </div>
            <div className="skill-grid">
              {items.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default SkillsPage;
