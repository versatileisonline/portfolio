import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Link as RouterLink } from "react-router-dom";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SectionHeading from "./SectionHeading";
import { projectCards } from "../content/portfolio";
import { projectAnchor } from "../content/navigation";
import DisclosureMedia from "./DisclosureMedia";
import ExpandableDetails from "./ExpandableDetails";

export default function ProjectsSection() {
  return (
    <section id="projects" className="content-section">
      <SectionHeading title="Projects" />
      <div className="project-list">
        {projectCards.map((project) => (
          <ExpandableDetails
            className="disclosure project-disclosure"
            key={project.title}
            id={projectAnchor(project.title)}
          >
            <summary>
              <div className="disclosure-heading">
                <h3>{project.title}</h3>
                <ExpandMoreRoundedIcon className="disclosure-chevron" />
              </div>
              <p className="project-period">{project.eyebrow}</p>
              <p className="disclosure-preview">{project.description}</p>
              {project.imageSrc ? (
                <DisclosureMedia
                  src={project.imageSrc}
                  alt={project.imageLabel ?? project.title}
                  width={project.imageWidth}
                  height={project.imageHeight}
                />
              ) : null}
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                  onClick={(event) => event.stopPropagation()}
                >
                  {project.linkLabel ?? "View project"}
                  <ArrowOutwardRoundedIcon />
                </a>
              ) : project.to ? (
                <RouterLink
                  to={project.to}
                  className="project-link"
                  onClick={(event) => event.stopPropagation()}
                >
                  {project.linkLabel ?? "View project"}
                  <ArrowOutwardRoundedIcon />
                </RouterLink>
              ) : null}
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </summary>
            <div className="disclosure-body">
              {project.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>
          </ExpandableDetails>
        ))}
      </div>
    </section>
  );
}
