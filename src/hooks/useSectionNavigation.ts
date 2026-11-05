import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { navRoutes } from "../content/portfolio";

export function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const pendingSection = useRef<string | null>(null);

  const scrollToSection = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    if (id === "home") {
      pendingSection.current = null;
      setActiveSection("home");
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      return;
    }
    pendingSection.current = id;
    setActiveSection(id);
    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      setShowScrollTop(window.scrollY > 400);
      const offset =
        (document.getElementById("site-header")?.getBoundingClientRect()
          .height ?? 72) + 32;
      document.documentElement.style.setProperty(
        "--section-scroll-offset",
        `${offset}px`,
      );
      if (pendingSection.current) {
        const target = document.getElementById(pendingSection.current);
        if (
          target &&
          Math.abs(target.getBoundingClientRect().top - offset) > 3 &&
          window.scrollY + window.innerHeight <
            document.documentElement.scrollHeight - 3
        )
          return;
        pendingSection.current = null;
      }
      let section = "home";
      for (const route of navRoutes) {
        const id = route.to.split("#")[1];
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= offset + 3)
          section = id;
      }
      setActiveSection(section);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function release() {
      pendingSection.current = null;
      schedule();
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("scrollend", release);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    window.addEventListener("keydown", release);
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    if (document.querySelector("main"))
      observer.observe(document.querySelector("main")!);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("scrollend", release);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
      window.removeEventListener("resize", schedule);
    };
  }, [location.pathname]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash) scrollToSection(location.hash.slice(1));
      else {
        pendingSection.current = null;
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, scrollToSection]);

  return { activeSection, showScrollTop, location, scrollToSection };
}
