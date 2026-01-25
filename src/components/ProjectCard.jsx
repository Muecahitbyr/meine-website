export default function ProjectCard({ project }) {
  return (
    <article className="card projectCard">
      <div className="projectTop">
        <h3>{project.title}</h3>
        {project.link ? (
          <a
            className="link"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            Öffnen →
          </a>
        ) : null}
      </div>

      <p className="muted">{project.description}</p>

      <div className="pillRow">
        {project.tags.map((t) => (
          <span key={t} className="pill">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
