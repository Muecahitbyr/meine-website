import { useTranslation } from "react-i18next";

export default function ProjectCard({ project }) {
  const { t } = useTranslation("common");

  const href = project.storeUrl || project.link;

  return (
    <article className="card projectCard">
      <div className="projectTop">
        <h3>{project.title}</h3>
        {href ? (
          <a className="link" href={href} target="_blank" rel="noopener noreferrer">
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