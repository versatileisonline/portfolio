import { Link as RouterLink } from "react-router-dom";
import { navRoutes } from "../content/portfolio";

export default function SectionRail({
  activeSection,
  scrollToSection,
}: {
  activeSection: string;
  scrollToSection: (id: string) => void;
}) {
  return (
    <nav className="section-rail" aria-label="On this page">
      {navRoutes.map((item, index) => {
        const id = item.to.split("#")[1];
        return (
          <RouterLink
            key={id}
            to={item.to}
            className={`rail-link ${activeSection === id ? "rail-active" : ""}`}
            aria-label={item.label}
            aria-current={activeSection === id ? "location" : undefined}
            onClick={() => scrollToSection(id)}
          >
            <span className="rail-marker" aria-hidden="true" />
            <span className="rail-label">
              <span className="rail-number">0{index + 1}</span>
              {item.label}
            </span>
          </RouterLink>
        );
      })}
    </nav>
  );
}
