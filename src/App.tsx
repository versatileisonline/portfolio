import "./App.css";
import { AppBar, Button, Container, IconButton, Toolbar } from "@mui/material";
import { Link as RouterLink, Navigate, Route, Routes } from "react-router-dom";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import resume from "./assets/resume.pdf";
import Companion from "./components/Companion";
import SectionRail from "./components/SectionRail";
import HomePage from "./pages/HomePage";
import { BlogIndexPage, BlogPostPage } from "./pages/WritingPages";
import { useTheme } from "./hooks/useTheme";
import { useSectionNavigation } from "./hooks/useSectionNavigation";

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const {
    activeSection,
    activeSubsection,
    showScrollTop,
    location,
    scrollToSection,
  } = useSectionNavigation();

  const home = location.pathname === "/";

  return (
    <div className={`app-shell ${isDarkMode ? "theme-dark" : "theme-light"}`}>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main-content");
          main?.focus({ preventScroll: true });
          main?.scrollIntoView({ behavior: "instant" });
        }}
      >
        Skip to content
      </a>
      <AppBar
        id="site-header"
        position="sticky"
        elevation={0}
        className="topbar"
      >
        <Toolbar className="topbar-toolbar">
          <RouterLink
            to="/#home"
            className="brand-mark"
            title="Back to home"
            onClick={() => scrollToSection("home")}
          >
            <span className="brand-name">
              Bryan Torres
              <span className="brand-dot" aria-hidden="true">
                .
              </span>
            </span>
          </RouterLink>
          <RouterLink
            to="/#home"
            className="header-avatar-link"
            title="Back to home"
            aria-label="Wizard: back to home"
            onClick={() => scrollToSection("home")}
          >
            <img
              src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/lego-wizard-avatar.png`}
              alt=""
              aria-hidden="true"
              width={28}
              height={28}
              className="brand-avatar"
            />
          </RouterLink>
          <div className="topbar-actions">
            <a
              href={resume}
              target="_blank"
              rel="noreferrer"
              className="header-resume"
            >
              Résumé
              <ArrowOutwardRoundedIcon />
            </a>
            <IconButton
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              onClick={toggleTheme}
              className="theme-toggle"
            >
              {isDarkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {home ? (
        <SectionRail
          activeSection={activeSection}
          activeSubsection={activeSubsection}
          scrollToSection={scrollToSection}
        />
      ) : null}
      <main id="main-content" tabIndex={-1}>
        <Container maxWidth={false} className="page-content">
          {!home ? (
            <Button
              component={RouterLink}
              to="/"
              startIcon={<WestRoundedIcon />}
              className="back-link-button"
            >
              Back Home
            </Button>
          ) : null}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route
              path="/projects"
              element={
                <Navigate to={`/${location.hash || "#projects"}`} replace />
              }
            />
            <Route path="/writing" element={<BlogIndexPage />} />
            <Route path="/writing/:slug" element={<BlogPostPage />} />
          </Routes>
          <footer className="site-footer">
            <span>© {new Date().getFullYear()} Bryan Torres</span>
            <a href="mailto:bryantorres@vt.edu">
              Let’s get in touch
              <ArrowOutwardRoundedIcon />
            </a>
          </footer>
        </Container>
      </main>
      <Companion />
      {showScrollTop ? (
        <button
          className="scroll-top-button"
          aria-label="Scroll back to top"
          onClick={() => scrollToSection("home")}
        >
          <ArrowUpwardRoundedIcon />
        </button>
      ) : null}
    </div>
  );
}

export default App;
