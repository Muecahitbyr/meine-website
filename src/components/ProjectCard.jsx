// ...existing code...
import { useTranslation } from "react-i18next";

export default function ProjectCard({ project }) {
  const { t } = useTranslation("common");
  const href = project.storeUrl || project.link;

  const openInAppStore = (url) => {
    if (!url) return;
    try {
      const scheme = url.replace(/^https?:\/\//, "itms-apps://");
      window.location.href = scheme;
      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, 600);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article className="card projectCard">
      <div className="projectTop">
        <h3>{project.title}</h3>
        <span className="link">{t("projectCard.open")}</span>
      </div>

      <p className="muted">{project.description}</p>

      {project.noteKey ? <p className="muted small">{t(project.noteKey)}</p> : null}

      <div className="pillRow">
        {project.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>

      {href ? (
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            className="storeButton"
            onClick={() => openInAppStore(href)}
            aria-label="Im App Store öffnen"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(90deg,#0a84ff,#5ac8fa)",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
              <path d="M12 2l4 4-8 8-4-4 8-8z" fill="white" />
            </svg>
            Im App Store öffnen
          </button>
        </div>
      ) : null}
    </article>
  );
}
// ...existing code...