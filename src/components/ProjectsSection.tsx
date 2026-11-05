import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SectionHeading from "./SectionHeading";
import { projectCards } from "../content/portfolio";

export default function ProjectsSection() {
  return (
    <section id="projects" className="content-section">
      <SectionHeading title="Projects" />
      <div className="project-list">
        {projectCards.map((project) => (
          <details
            className="disclosure project-disclosure"
            key={project.title}
            id={
              project.title === "TDS: Dataset Diversity"
                ? "tds-dataset-diversity"
                : undefined
            }
          >
            <summary>
              <div className="disclosure-heading">
                <h3>{project.title}</h3>
                <ExpandMoreRoundedIcon className="disclosure-chevron" />
              </div>
              <p className="project-period">{project.eyebrow}</p>
              <p className="disclosure-preview">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </summary>
            <div className="disclosure-body">
              {project.imageSrc ? (
                <img
                  src={project.imageSrc}
                  alt={project.imageLabel ?? project.title}
                  loading="lazy"
                  className={`project-inline-image ${project.imageClassName ?? ""}`}
                />
              ) : null}
              {project.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  {project.linkLabel ?? "View project"}
                  <ArrowOutwardRoundedIcon />
                </a>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
