function SkillCard({ skill }) {
  return (
    <article className="skill-card">
      <span className="skill-pill">{skill.category}</span>
      <h3>{skill.name}</h3>
    </article>
  );
}

export default SkillCard;
