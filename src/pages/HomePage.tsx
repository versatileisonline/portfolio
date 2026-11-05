import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import profilePic from "../assets/photos/profile-bryan.jpg";
import { contactLinks } from "../content/portfolio";
import SectionHeading from "../components/SectionHeading";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import AboutPage from "./AboutPage";

export default function HomePage() {
  return (
    <>
      <section id="home" className="hero-section">
        <img
          src={profilePic}
          alt="Bryan Torres at Virginia Tech"
          className="hero-photo"
          fetchPriority="high"
          width={792}
          height={612}
        />
        <div className="hero-introduction">
          <h1>
            Bryan Torres{" "}
            <span className="name-divider" aria-hidden="true">
              /
            </span>{" "}
            <span className="hero-role">Software Engineer</span>
          </h1>
          <p className="hero-subtitle">
            Virginia Tech MEng CS candidate graduating May 2027, building
            production software across Python, TypeScript, cloud infrastructure,
            and AI.
          </p>
          <ul
            className="personal-bullets"
            aria-label="Personal highlights, placeholders for the local demo"
          >
            <li>
              <span>Engineering focus — coming soon</span>
            </li>
            <li>
              <span>A little about me — coming soon</span>
            </li>
            <li>
              <span>What I’m building — coming soon</span>
            </li>
            <li>
              <span>Outside of engineering — coming soon</span>
            </li>
          </ul>
          <nav className="contact-row" aria-label="Contact and résumé">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={`${item.label}: ${item.value}`}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                {item.icon}
                <span>{item.label}</span>
                <ArrowOutwardRoundedIcon className="contact-arrow" />
              </a>
            ))}
          </nav>
        </div>
      </section>

      <ExperienceSection />

      <ProjectsSection />

      <SkillsSection />

      <section id="about" className="content-section">
        <SectionHeading title="About Me" />
        <AboutPage />
      </section>
    </>
  );
}
