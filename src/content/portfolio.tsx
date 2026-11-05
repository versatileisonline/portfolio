import type { ReactNode } from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import SourceRoundedIcon from "@mui/icons-material/SourceRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import aboutPhotoOne from "../assets/photos/compressed_images/IMG_3927.jpg";
import aboutPhotoTwo from "../assets/photos/compressed_images/IMG_8620.jpeg";
import aboutPhotoThree from "../assets/photos/compressed_images/IMG_8628.jpg";
import aboutPhotoFour from "../assets/photos/compressed_images/IMG_3652.jpeg";
import aboutPhotoFive from "../assets/photos/compressed_images/IMG_3696.jpg";
import aboutPhotoSix from "../assets/photos/compressed_images/IMG_2092.jpg";
import aboutPhotoSeven from "../assets/photos/compressed_images/IMG_4213.jpeg";
import aboutPhotoEight from "../assets/photos/compressed_images/IMG_6994.JPEG.jpeg";

import melanomaVisual from "../assets/photos/ml_healthcare.png";
import marcoVisual from "../assets/photos/compressed_images/IMG_1671.jpg";
import canvasVisual from "../assets/photos/canvas_plus.png";
import syndicateVisual from "../assets/photos/project_syndicate.png";
import darkWolfPhoto from "../assets/photos/compressed_images/IMG_4204.jpeg";

import resume from "../assets/resume.pdf";
import melanoma from "../assets/melanoma_detection.pdf";
import writingPost from "./writing/index.md?raw";

export type NavRoute = {
  label: string;
  to: string;
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
};

export type ProjectCard = {
  eyebrow: string;
  title: string;
  to?: string;
  href?: string;
  linkLabel?: string;
  description: string;
  tags: string[];
  details: string[];
  imageLabel?: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  featuredOnHome?: boolean;
  imageClassName?: string;
};

export type SkillCard = {
  title: string;
  description: string;
  highlights?: { label: string; icon: ReactNode }[];
};

export type ExperienceCard = {
  period: string;
  role: string;
  organization: string;
  paragraphs: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  learnedStack?: { label: string; icon: ReactNode }[];
};

export type BlogPost = {
  slug: string;
  status: string;
  title: string;
  excerpt: string;
  source: string;
};

export const navRoutes: NavRoute[] = [
  { label: "Home", to: "/#home" },
  { label: "Experience", to: "/#experience" },
  { label: "Projects", to: "/#projects" },
  { label: "Skills", to: "/#skills" },
  { label: "About Me", to: "/#about" },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "bryantorres@vt.edu",
    href: "mailto:bryantorres@vt.edu",
    icon: <EmailRoundedIcon />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/bryantorres-cs",
    href: "https://www.linkedin.com/in/bryantorres-cs",
    icon: <LinkedInIcon />,
  },
  {
    label: "GitHub",
    value: "github.com/versatileisonline",
    href: "https://github.com/versatileisonline",
    icon: <GitHubIcon />,
  },
  {
    label: "Resume",
    value: "View resume PDF",
    href: resume,
    icon: <DescriptionRoundedIcon />,
  },
];

export const projectCards: ProjectCard[] = [
  {
    eyebrow: "In Development: Oct. 2026 – Present",
    title: "Codeward",
    href: "https://github.com/versatileisonline/codeward",
    linkLabel: "View GitHub repository",
    description:
      "Building an offline desktop password manager, starting with a Rust cryptographic core for bounded vault parsing, encryption primitives, and paper recovery-code handling.",
    tags: [
      "Rust",
      "RustCrypto",
      "Argon2id",
      "HKDF-SHA256",
      "XChaCha20-Poly1305",
    ],
    details: [
      "Codeward is a local-first password manager targeting macOS, Windows, and Linux, with a Rust core and a planned Tauri-hosted React/TypeScript interface. The design centers on an encrypted local vault, offline use without an account or telemetry, and a handwritten recovery secret for access to an intact vault after forgetting the master password.",
      "Implemented so far: a bounded Rust parser and encoder for the versioned vault format, with a 16 MiB envelope limit and rejection of malformed input and unsupported settings. The core includes Argon2id master-password derivation, HKDF-SHA256 recovery-key derivation, XChaCha20-Poly1305 encryption primitives, and paper-code generation and transcription checks. Rust ownership consumes encryption nonce objects on use, while owned secret buffers are cleared on drop.",
      "Validation so far: 41 unit and integration tests cover the parser, encoder, cryptographic primitives, and paper-code component, alongside a compile-fail doctest for nonce ownership. Known-answer vectors and independently generated Python and C fixtures check the implementation. Current execution evidence is from macOS; integrated vault workflows and Windows/Linux runtime support remain unverified.",
      "Next implementations: strict credential-schema validation, vault creation and unlock, and committed saves with fault-injection tests. Later milestones connect the offline recovery workflow and desktop interface, including credential management, password generation, search, save indicators, and session locking. The recovery secret restores access to an intact vault; it cannot recreate a missing or corrupted vault file.",
      "Future options: browser integration and autofill, automated backups and file restoration, and optional sync or online recovery. These are separately scoped possibilities beyond the initial offline prototype, rather than implemented features or promised releases.",
    ],
  },
  {
    eyebrow: "In Development: Jun. 2026 – Present",
    title: "Kingdom Tycoon",
    href: "https://github.com/versatileisonline/kingdom-tycoon",
    linkLabel: "View GitHub repository",
    description:
      "Developing a medieval Roblox tycoon with a modular Luau architecture and session-locked player persistence, designed around kingdom building and rebirth progression.",
    tags: ["Roblox", "Luau", "DataStoreService", "ProfileStore", "Rojo"],
    details: [
      "Kingdom Tycoon is a medieval game centered on building a kingdom through droppers, farms, walls, and a rebirth system with permanent progression multipliers. The core tycoon is in development, with open-world exploration, optional PvP, and armies planned for later stages.",
      "I architected a modular Luau backend with separate server services, client controllers, shared types, and explicit initialization lifecycles. I implemented persistent profiles for currency, progression, and building purchases using DataStoreService and ProfileStore, including session locking, autosaving, and disconnect/shutdown saves, and verified persistence across play sessions.",
      "Snapshot-based state updates use schema validation and revision checks to reject invalid or stale mutations. Versioned schemas and tests cover data isolation and invalid-update rejection. A Rojo, VS Code, and Git workflow keeps the code versioned outside Roblox Studio, while separate development and live data stores protect player progress during testing.",
    ],
  },
  {
    eyebrow: "In Progress · Three-Person Team",
    title: "KV Cache Lab",
    href: "https://github.com/versatileisonline/kv-cache-lab",
    linkLabel: "View GitHub repository",
    description:
      "Collaborating on a three-person team to benchmark LLM KV-cache strategies, studying tradeoffs between GPU memory usage, generation speed, and answer quality.",
    tags: ["Python", "LLM Inference", "Hugging Face", "CUDA", "Benchmarking"],
    details: [
      "Our research asks how much KV-cache memory can be saved while preserving answer quality, and what that saving costs in generation time. We are starting with a FullKV passkey-retrieval pilot before comparing cache optimization methods.",
      "The pilot uses fixed-seed prompts, exact input token lengths, pinned model and tokenizer revisions, and an uncompressed Hugging Face baseline on a single NVIDIA GPU. It records predictions, retrieval accuracy, cache storage, phase-specific GPU memory peaks, and timing diagnostics.",
      "The experiment workflow preserves configuration and environment metadata alongside each run, supports offline rescoring, and includes correctness checks. The current pilot validates the experiment pipeline; performance comparisons are ongoing work.",
    ],
  },
  {
    eyebrow: "Summer 2026 Internship Project",
    title: "TDS: Dataset Diversity",
    to: "/#experience-expedition-technology",
    linkLabel: "View internship experience",
    description:
      "Built a FastAPI-backed diversity score that helps ML engineers assess the robustness of curated GEOINT training datasets for computer-vision models.",
    tags: [
      "FastAPI",
      "Computer Vision",
      "GEOINT",
      "Dataset Diversity",
      "Shannon Entropy",
    ],
    details: [
      "At Expedition Technology, I worked in Training Data Storefront (TDS), where machine learning engineers curate annotated NITF/GEOINT observations for computer-vision models. I built an API endpoint that turns dataset diversity into a clear, normalized Shannon entropy score from 0.0 to 1.0, helping users recognize when a curated dataset is well-balanced or narrowly distributed.",
      "The score brings together four research-driven axes: geographic, illumination, time, and image quality. Geography is weighted most heavily because it introduces the strongest domain shift, with coverage measured across biome, continent, settlement type, and country distribution. The time axis considers month evenness, gaps across the dataset interval, time of day, and season.",
      "The endpoint returns the overall score alongside nested component distributions so the TDS interface can pair a simple summary with explanatory visualizations. The goal is to make diversity easier to act on before model training, supporting more robust training data and better generalization beyond the conditions a model has already seen.",
    ],
    imageLabel: "TDS dataset diversity visualization",
    featuredOnHome: true,
  },
  {
    eyebrow: "Summer 2025 Internship Project",
    title: "Project Syndicate",
    to: "/#experience-dark-wolf-solutions",
    linkLabel: "View internship experience",
    description:
      "A CI/CD pipeline data aggregation dashboard built during my internship to help teams understand pipeline health, security, and compliance in one place.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker", "GKE"],
    details: [
      "During my summer internship at Dark Wolf Solutions, I worked with two other interns on Project Syndicate, a CI/CD pipeline data aggregation platform built to give teams a clearer, centralized view of pipeline health, security, and compliance.",
      "My work focused on helping build the dashboard experience, where we designed and developed interfaces that made complex pipeline, application, and organization-level data easier to understand and navigate.",
      "Through this project, I gained hands-on experience with full-stack and DevOps workflows, including React, Material UI, FastAPI, PostgreSQL, Docker, GitLab CI, Google Kubernetes Engine, and Dex-based authentication.",
      "Beyond the technical work, Syndicate helped me grow professionally by reinforcing how important communication, collaboration, and iterative problem-solving are in a real engineering environment, especially while working closely with other interns, engineers, and leadership to ship something practical and meaningful.",
    ],
    imageLabel: "Project Syndicate dashboard",
    imageSrc: syndicateVisual,
    imageWidth: 1740,
    imageHeight: 888,
    featuredOnHome: true,
  },
  {
    eyebrow: "In Progress: Jan. 2026 – Present",
    title: "Canvas+",
    href: "https://github.com/versatileisonline/CanvasPlus",
    linkLabel: "View project",
    description:
      "A Chromium-based browser extension that reimagines the Canvas dashboard with a more centralized course homepage.",
    tags: ["Browser Extension", "UX Iteration", "Student Productivity"],
    details: [
      "Canvas+ comes from wanting a student-facing tool that genuinely feels more useful day to day. The goal was to create a cleaner, more centralized course experience on top of an LMS that often feels fragmented. We surveyed Virginia Tech students from various colleges, providing further insight on how we should design our product.",
      "This project leans more into product thinking and interface design. I have been using it to explore how frontend polish, usability, and small workflow improvements can have a real impact on how students stay organized.",
    ],
    imageLabel: "Canvas+ product visual",
    imageSrc: canvasVisual,
    imageWidth: 3596,
    imageHeight: 2010,
    featuredOnHome: true,
  },
  {
    eyebrow: "Academia Work: Oct. 2024 to Jan. 2026",
    title: "M.A.R.C.O - Multi-Agent Reactive Code Optimizer",
    href: "https://arxiv.org/pdf/2505.03906",
    linkLabel: "Read paper",
    description:
      "Built as part of my undergraduate research, MARCO is an agentic AI framework designed for automated, reliable kernel generation and optimization.",
    tags: [
      "High-performance Computing (HPC)",
      "Agentic AI Framework",
      "Benchmarking",
    ],
    details: [
      "MARCO grew out of undergraduate research focused on making LLM-assisted kernel generation more reliable. The project explored how specialized guidance and structured agents could help automate high-performance GPU kernel optimization while still preserving strong performance.",
      "What made this especially meaningful to me was the mix of systems thinking, benchmarking, and research communication. It pushed me to think beyond simply writing code and toward building a framework that made technical claims testable and defensible.",
    ],
    imageLabel: "MARCO research visual",
    imageSrc: marcoVisual,
    imageWidth: 1400,
    imageHeight: 1050,
    featuredOnHome: true,
    imageClassName: "project-detail-image-marco",
  },
  {
    eyebrow: "In Progress: Jan. 2026 -",
    title: "ML For Healthcare: Melanoma Classification",
    href: melanoma,
    linkLabel: "Read paper",
    description:
      "Built a machine learning pipeline for melanoma image classification, focusing on early skin cancer detection from images.",
    tags: [
      "Melanoma Detection",
      "Medical Imaging",
      "Python / Jupyter Notebook",
    ],
    details: [
      "This project focuses on applying machine learning to a healthcare setting where early detection matters. I built the pipeline around melanoma image classification with an emphasis on model experimentation, data handling, and evaluation.",
      "A big part of the work was thinking carefully about how to structure the workflow in a way that was reproducible and readable. I wanted the project to feel like something that could be expanded beyond a one-off notebook into a stronger research or product direction.",
    ],
    imageLabel: "Melanoma project visual",
    imageSrc: melanomaVisual,
    imageWidth: 1806,
    imageHeight: 636,
    featuredOnHome: false,
  },
];

export const skillCards: SkillCard[] = [
  {
    title: "Languages",
    description: "Rust, Python, TypeScript, JavaScript, C, Java, C#, SQL, Luau",
    // highlights: [
    //   { label: 'Git', icon: <SourceRoundedIcon /> },
    //   { label: 'Linux', icon: <TerminalRoundedIcon /> },
    // ],
  },
  {
    title: "Frameworks & Tools",
    description:
      "Linux, Kubernetes, GKE, Docker, Helm, Argo CD, Git, GitHub/GitLab, Next.js, React, MUI, FastAPI",
    highlights: [
      { label: "Docker", icon: <LayersRoundedIcon /> },
      { label: "GitLab", icon: <AccountTreeRoundedIcon /> },
      { label: "Linux", icon: <TerminalRoundedIcon /> },
      { label: "GKE", icon: <CloudQueueRoundedIcon /> },
    ],
  },
  {
    title: "AI & Testing",
    description: "OpenAI/Anthropic APIs, Hugging Face, PyTest, Jest, CUDA",
    // highlights: [
    //   { label: 'React', icon: <WebRoundedIcon /> },
    //   { label: 'FastAPI', icon: <ApiRoundedIcon /> },
    // ],
  },
];

export const experienceCards: ExperienceCard[] = [
  {
    period: "Summer 2026",
    role: "Software Engineering Intern",
    organization: "Expedition Technology",
    paragraphs: [
      "At Expedition Technology, I worked on a platform where ML engineers curate annotated GEOINT observations for computer-vision training datasets. My work focused on making the diversity of those datasets easier to understand before training begins.",
      "I created a FastAPI endpoint that calculates a normalized Shannon entropy diversity score from 0.0 to 1.0 and returns the nested distributions behind it. The score combines geographic, illumination, time, and image-quality signals, with geographic variation prioritized because it creates the strongest domain shift for model generalization.",
      "On the frontend, the endpoint supported clear, chart-driven explanations of a dataset’s composition so users could move from a single diversity score to the underlying distributions that need attention.",
      "I worked in an agile delivery cadence with increments containing sprints: Jira ticket standups on Mondays and Wednesdays, biweekly Scrum demos of in-progress work, and Thursday retrospectives to discuss what went wrong and plan the next increment.",
    ],
    learnedStack: [
      { label: "FastAPI", icon: <ApiRoundedIcon /> },
      { label: "TypeScript + Vite", icon: <WebRoundedIcon /> },
      { label: "Chart.js", icon: <WebRoundedIcon /> },
      { label: "Mock Service Worker", icon: <ApiRoundedIcon /> },
      { label: "GEOINT Data", icon: <StorageRoundedIcon /> },
    ],
  },
  {
    period: "Jun. 2025 - Aug. 2025",
    role: "Software & DevOps Intern",
    organization: "Dark Wolf Solutions",
    paragraphs: [
      "Over the summer, I worked at Dark Wolf Solutions as a Software & DevOps Intern on Project Syndicate. The experience showed me what it looks like to contribute on a real engineering team where communication, collaboration, and accountability matter every day.",
      "I worked closely with two other interns, and that shared problem-solving made the internship especially valuable. We operated in an agile environment with daily standups, biweekly sprints, live code reviews, and GitLab ticketing, which helped me get much more comfortable discussing progress, blockers, and technical decisions.",
      "We were guided by experienced engineers, which gave me a clearer view into how professional software teams organize work, mentor junior developers, and build at scale. That mentorship helped me grow not only technically, but also in the way I approached teamwork and ownership.",
      "On the technical side, we helped create the user interface for Syndicate, a pipeline dashboard designed across pipeline, application, and organization-level views. We built and deployed a containerized system using PostgreSQL, a Next.js frontend, a FastAPI backend, and Dex for OAuth, with deployments running through GKE. Overall, the internship strengthened both my technical foundation and my confidence in working as part of a collaborative engineering team.",
    ],
    imageSrc: darkWolfPhoto,
    imageWidth: 1320,
    imageHeight: 1651,
    imageAlt: "Bryan Torres at Dark Wolf Solutions",
    learnedStack: [
      { label: "Git", icon: <SourceRoundedIcon /> },
      { label: "Linux", icon: <TerminalRoundedIcon /> },
      { label: "Docker", icon: <LayersRoundedIcon /> },
      { label: "GitLab CI", icon: <AccountTreeRoundedIcon /> },
      { label: "PostgreSQL", icon: <StorageRoundedIcon /> },
      { label: "FastAPI", icon: <ApiRoundedIcon /> },
      { label: "GKE", icon: <CloudQueueRoundedIcon /> },
      { label: "React + MUI", icon: <WebRoundedIcon /> },
    ],
  },
];

export const aboutCollageTiles = [
  {
    src: aboutPhotoOne,
    alt: "Bryan Torres outdoors portrait",
    className: "about-collage-tile-small",
  },
  {
    src: aboutPhotoTwo,
    alt: "Bryan Torres outdoors",
    className: "about-collage-tile-large",
  },
  {
    src: aboutPhotoSeven,
    alt: "Bryan Torres portrait",
    className: "about-collage-tile-small",
  },
  {
    src: aboutPhotoThree,
    alt: "Bryan Torres lifestyle",
    className: "about-collage-tile-small",
  },
  {
    src: aboutPhotoFour,
    alt: "Bryan Torres candid",
    className: "about-collage-tile-wide",
  },
  {
    src: aboutPhotoFive,
    alt: "Bryan Torres outdoors portrait",
    className: "about-collage-tile-small",
  },
  {
    src: aboutPhotoSix,
    alt: "Bryan Torres active lifestyle",
    className: "about-collage-tile-small",
  },
  {
    src: aboutPhotoEight,
    alt: "Bryan Torres candid portrait",
    className: "about-collage-tile-small",
  },
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "first-post",
    status: "Published",
    title: "How to become more effective utilizing AI tools",
    excerpt: "Tooling with AI",
    source: writingPost,
  },
];
