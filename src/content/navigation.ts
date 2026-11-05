import {
  navRoutes,
  experienceCards,
  projectCards,
  skillCards,
} from "./portfolio";

function anchor(prefix: string, label: string) {
  return `${prefix}-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

export const experienceAnchor = (organization: string) =>
  anchor("experience", organization);
export const skillAnchor = (title: string) => anchor("skill", title);
export const projectAnchor = (title: string) =>
  title === "TDS: Dataset Diversity"
    ? "tds-dataset-diversity"
    : anchor("project", title);

const children = {
  experience: experienceCards.map(({ organization }) => ({
    label: organization,
    id: experienceAnchor(organization),
  })),
  projects: projectCards.map(({ title }) => ({
    label: title,
    id: projectAnchor(title),
  })),
  skills: skillCards.map(({ title }) => ({
    label: title,
    id: skillAnchor(title),
  })),
  about: [
    { label: "What Drives Me", id: "about-drives" },
    { label: "Photos", id: "about-photos" },
    { label: "Interests Outside of Engineering", id: "about-interests" },
  ],
};

export const navigationRoutes = navRoutes.map((route) => ({
  ...route,
  children: children[route.to.split("#")[1] as keyof typeof children] ?? [],
}));
