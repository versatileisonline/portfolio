import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { navigationRoutes } from "../content/navigation";

export default function SectionRail({
  activeSection,
  activeSubsection,
  scrollToSection,
}: {
  activeSection: string;
  activeSubsection: string | null;
  scrollToSection: (id: string) => void;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [dismissedMenu, setDismissedMenu] = useState<string | null>(null);

  function goTo(id: string) {
    setOpenMenu(null);
    const parent = navigationRoutes.find(
      (route) =>
        route.to.split("#")[1] === id ||
        route.children.some((child) => child.id === id),
    );
    setDismissedMenu(parent?.to.split("#")[1] ?? null);
    scrollToSection(id);
  }

  return (
    <nav
      className="section-rail"
      aria-label="On this page"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpenMenu(null);
      }}
    >
      {navigationRoutes.map((item, index) => {
        const id = item.to.split("#")[1];
        return (
          <div
            key={id}
            className={`rail-group ${activeSection === id ? "rail-active" : ""}`}
            data-open={openMenu === id}
            data-dismissed={dismissedMenu === id}
            onPointerEnter={() => setDismissedMenu(null)}
          >
            <RouterLink
              to={item.to}
              className="rail-link"
              aria-label={item.label}
              aria-current={activeSection === id ? "location" : undefined}
              onClick={() => goTo(id)}
              onFocus={() => setDismissedMenu(null)}
            >
              <span className="rail-marker" aria-hidden="true" />
              <span className="rail-mobile-label">{item.label}</span>
            </RouterLink>
            {item.children.length > 0 ? (
              <button
                type="button"
                className="rail-submenu-toggle"
                aria-label={`${openMenu === id ? "Hide" : "Show"} ${item.label} subsections`}
                aria-expanded={openMenu === id}
                aria-controls={`rail-panel-${id}`}
                onClick={() => {
                  setDismissedMenu(null);
                  setOpenMenu(openMenu === id ? null : id);
                }}
              >
                <ExpandMoreRoundedIcon />
              </button>
            ) : null}
            <div id={`rail-panel-${id}`} className="rail-panel">
              <RouterLink
                to={item.to}
                className="rail-panel-heading"
                aria-label={`Go to ${item.label} section`}
                onClick={() => goTo(id)}
              >
                <span className="rail-number">0{index + 1}</span>
                {item.label}
              </RouterLink>
              {item.children.length > 0 ? (
                <ol className="rail-subsections" type="i">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <RouterLink
                        to={`/#${child.id}`}
                        aria-current={
                          activeSubsection === child.id ? "location" : undefined
                        }
                        onClick={() => goTo(child.id)}
                      >
                        {child.label}
                      </RouterLink>
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
