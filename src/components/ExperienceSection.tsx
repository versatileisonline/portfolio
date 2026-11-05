import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SectionHeading from "./SectionHeading";
import { experienceCards } from "../content/portfolio";

export default function ExperienceSection() {
  return (
    <section id="experience" className="content-section">
      <SectionHeading title="Experience" />
      <div className="experience-list">
        {experienceCards.map((experience) => (
          <details
            className="disclosure experience-disclosure"
            key={experience.organization}
          >
            <summary>
              <div className="disclosure-heading">
                <div>
                  <h3>{experience.organization}</h3>
                  <p className="role-label">{experience.role}</p>
                </div>
                <div className="disclosure-meta">
                  <span>{experience.period}</span>
                  <ExpandMoreRoundedIcon className="disclosure-chevron" />
                </div>
              </div>
              <p className="disclosure-preview">
                {experience.paragraphs[0].split(". ")[0]}.
              </p>
            </summary>
            <div className="disclosure-body">
              {experience.imageSrc ? (
                <img
                  src={experience.imageSrc}
                  alt={experience.imageAlt ?? experience.organization}
                  className="experience-image"
                  loading="lazy"
                />
              ) : null}
              {experience.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {experience.learnedStack ? (
                <div className="learned-stack">
                  <h4>Learned most from</h4>
                  <div className="technology-list">
                    {experience.learnedStack.map((item) => (
                      <span key={item.label}>
                        {item.icon}
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
