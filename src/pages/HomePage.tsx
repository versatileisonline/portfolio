import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import DitherPortrait from "../components/DitherPortrait";
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
        <DitherPortrait />
        <div className="hero-introduction">
          <h1>
            <span className="hero-name">Bryan Torres</span>{" "}
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
          <ul className="personal-bullets" aria-label="Personal highlights">
            <li>
              <span>
                Engineering focus — Linux systems, debugging, tmux, backend APIs,
                and DevOps with CI/CD.
              </span>
            </li>
            <li>
              <span>
                A little about me — Singing, reading, staying active, and striving
                to improve 1% each day.
              </span>
            </li>
            <li>
              <span>
                What I’m building — A Roblox game and Codeward, a local password
                manager for personal use, friends, and family.
              </span>
            </li>
            <li>
              <span>
                Outside of engineering — Exploring new ideas, building creative
                projects, and spending time with friends and family.
              </span>
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
