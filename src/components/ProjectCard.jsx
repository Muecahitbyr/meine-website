import { useTranslation } from "react-i18next";

export default function ProjectCard({ project }) {
  const { t } = useTranslation("common");

  return (
    <article className="card projectCard">
      <div className="projectTop">
        <h3>{project.title}</h3>
        {project.link ? (
          <a className="link" href={project.link} target="_blank" rel="noreferrer">
            {t("projectCard.open")}
          </a>
        ) : null}
      </div>

      <p className="muted">{project.description}</p>

      <div className="pillRow">
        {project.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
