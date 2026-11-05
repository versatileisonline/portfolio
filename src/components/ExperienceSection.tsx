import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SectionHeading from "./SectionHeading";
import { experienceCards } from "../content/portfolio";
import { experienceAnchor } from "../content/navigation";
import DisclosureMedia from "./DisclosureMedia";
import ExpandableDetails from "./ExpandableDetails";

export default function ExperienceSection() {
  return (
    <section id="experience" className="content-section">
      <SectionHeading title="Experience" />
      <div className="experience-list">
        {experienceCards.map((experience) => (
          <ExpandableDetails
            className="disclosure experience-disclosure"
            key={experience.organization}
            id={experienceAnchor(experience.organization)}
          >
            <summary>
              <div className="disclosure-heading">
                <h3>{experience.organization}</h3>
                <ExpandMoreRoundedIcon className="disclosure-chevron" />
              </div>
              <p className="role-label">{experience.role}</p>
              <p className="project-period">{experience.period}</p>
              <p className="disclosure-preview">
                {experience.paragraphs[0].split(". ")[0]}.
              </p>
              {experience.imageSrc ? (
                <DisclosureMedia
                  src={experience.imageSrc}
                  alt={experience.imageAlt ?? experience.organization}
                  width={experience.imageWidth}
                  height={experience.imageHeight}
                />
              ) : null}
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
            </summary>
            <div className="disclosure-body">
              {experience.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </ExpandableDetails>
        ))}
      </div>
    </section>
  );
}
