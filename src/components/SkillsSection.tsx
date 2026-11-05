import SectionHeading from "./SectionHeading";
import { skillCards } from "../content/portfolio";
import { skillAnchor } from "../content/navigation";

export default function SkillsSection() {
  return (
    <section id="skills" className="content-section">
      <SectionHeading title="Technical Skills" />
      <dl className="skills-list">
        {skillCards.map((skill) => (
          <div
            className="skill-row"
            key={skill.title}
            id={skillAnchor(skill.title)}
          >
            <dt>{skill.title}</dt>
            <dd>
              <p>{skill.description}</p>
              {skill.highlights ? (
                <div className="technology-list">
                  {skill.highlights.map((item) => (
                    <span key={item.label}>
                      {item.icon}
                      {item.label}
                    </span>
                  ))}
                </div>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
