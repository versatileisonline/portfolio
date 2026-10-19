import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import SourceRoundedIcon from "@mui/icons-material/SourceRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import profilePic from "./assets/photos/profile-bryan.jpg";
import aboutPhotoOne from "./assets/photos/compressed_images/IMG_3927.jpg";
import aboutPhotoTwo from "./assets/photos/compressed_images/IMG_8620.jpeg";
import aboutPhotoThree from "./assets/photos/compressed_images/IMG_8628.jpg";
import aboutPhotoFour from "./assets/photos/compressed_images/IMG_3652.jpeg";
import aboutPhotoFive from "./assets/photos/compressed_images/IMG_3696.jpg";
import aboutPhotoSix from "./assets/photos/compressed_images/IMG_2092.jpg";
import aboutPhotoSeven from "./assets/photos/compressed_images/IMG_4213.jpeg";
import aboutPhotoEight from "./assets/photos/compressed_images/IMG_6994.JPEG.jpeg";

import melanomaVisual from "./assets/photos/ml_healthcare.png";
import marcoVisual from "./assets/photos/compressed_images/IMG_1671.jpg";
import canvasVisual from "./assets/photos/canvas_plus.png";
import syndicateVisual from "./assets/photos/project_syndicate.png";
import darkWolfPhoto from "./assets/photos/compressed_images/IMG_4204.jpeg";
import {
  Link as RouterLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

import resume from "./assets/btorres_resume-2.pdf";
import melanoma from "./assets/melanoma_detection.pdf";
import writingPost from "./content/writing/index.md?raw";

type NavRoute = {
  label: string;
  to: string;
};

type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
};

type ProjectCard = {
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
  featuredOnHome?: boolean;
  imageClassName?: string;
};

type SkillCard = {
  title: string;
  description: string;
  highlights?: { label: string; icon: ReactNode }[];
};

type ExperienceCard = {
  period: string;
  role: string;
  organization: string;
  paragraphs: string[];
  imageSrc?: string;
  imageAlt?: string;
  learnedStack?: { label: string; icon: ReactNode }[];
};

type BlogPost = {
  slug: string;
  status: string;
  title: string;
  excerpt: string;
  source: string;
};

const navRoutes: NavRoute[] = [
  { label: "Home", to: "/#home" },
  { label: "Experience", to: "/#experience" },
  { label: "About Me", to: "/#about" },
];

const contactLinks: ContactLink[] = [
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

const projectCards: ProjectCard[] = [
  {
    eyebrow: "In Development: Sep. 2026 – Present",
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
    to: "/projects#tds-dataset-diversity",
    linkLabel: "Read More",
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
    featuredOnHome: false,
  },
];

const skillCards: SkillCard[] = [
  {
    title: "Languages",
    description: "Python, TypeScript, JavaScript, C, Java, C#",
    // highlights: [
    //   { label: 'Git', icon: <SourceRoundedIcon /> },
    //   { label: 'Linux', icon: <TerminalRoundedIcon /> },
    // ],
  },
  {
    title: "Frameworks & Tools",
    description:
      "Unix/Linux cmds, GKE, Docker, Git, GitHub/GitLab, Next.js, React, MUI, FastAPI",
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

const experienceCards: ExperienceCard[] = [
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

const aboutCollageTiles = [
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

const blogPosts: BlogPost[] = [
  {
    slug: "first-post",
    status: "Published",
    title: "How to become more effective utilizing AI tools",
    excerpt: "Tooling with AI",
    source: writingPost,
  },
];

function SectionHeading(props: { title: string }) {
  return (
    <Box className="section-heading">
      <Typography variant="h2" className="section-title">
        {props.title}
      </Typography>
    </Box>
  );
}

function PageSummaryCard(props: { subtitle: string; delay?: string }) {
  const { subtitle, delay = "80ms" } = props;

  return (
    <Card
      className="section-card fade-in-up page-summary-card"
      style={{ animationDelay: delay }}
    >
      <CardContent className="page-summary-content">
        <Typography className="page-summary-text">{subtitle}</Typography>
      </CardContent>
    </Card>
  );
}

function MarkdownArticle(props: { source: string }) {
  const source = props.source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\r\n/g, "\n")
    .trim();

  if (!source) {
    return <Box className="markdown-empty-space" />;
  }

  const lines = source.split("\n");
  const blocks: ReactNode[] = [];

  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <Typography key={`h3-${index}`} variant="h5" className="markdown-h3">
          {line.slice(4)}
        </Typography>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <Typography key={`h2-${index}`} variant="h4" className="markdown-h2">
          {line.slice(3)}
        </Typography>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <Typography key={`h1-${index}`} variant="h2" className="markdown-h1">
          {line.slice(2)}
        </Typography>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }

      blocks.push(
        <Box key={`list-${index}`} component="ul" className="markdown-list">
          {items.map((item) => (
            <Box key={item} component="li" className="markdown-list-item">
              <Typography className="markdown-paragraph">{item}</Typography>
            </Box>
          ))}
        </Box>,
      );
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      index += 1;

      blocks.push(
        <Box
          key={`code-${index}`}
          component="pre"
          className="markdown-code-block"
        >
          <code>{codeLines.join("\n")}</code>
        </Box>,
      );
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const current = lines[index].trim();
      if (
        !current ||
        current.startsWith("#") ||
        current.startsWith("- ") ||
        current.startsWith("```")
      ) {
        break;
      }
      paragraphLines.push(current);
      index += 1;
    }

    blocks.push(
      <Typography key={`p-${index}`} className="markdown-paragraph">
        {paragraphLines.join(" ")}
      </Typography>,
    );
  }

  return <Stack spacing={2.1}>{blocks}</Stack>;
}

function BlogIndexPage() {
  return (
    <Stack spacing={4.5}>
      <PageSummaryCard subtitle="A space for notes, lessons learned, and technical reflections. Each entry lives in its own markdown file, so writing and version control stay simple." />

      <Box className="card-grid writing-grid writing-list-grid">
        {blogPosts.map((post, index) => (
          <Card
            key={post.slug}
            className="section-card writing-card fade-in-up"
            style={{ animationDelay: `${160 + index * 90}ms` }}
          >
            <CardContent className="card-content writing-card-content">
              <Typography className="card-eyebrow">{post.status}</Typography>
              <Typography variant="h5" className="card-title">
                {post.title}
              </Typography>
              <Typography className="card-description">
                {post.excerpt}
              </Typography>
              <Button
                component={RouterLink}
                to={`/writing/${post.slug}`}
                endIcon={<ArrowOutwardRoundedIcon />}
                className="section-link-button writing-read-button"
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Stack>
  );
}

function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return (
      <Card
        className="section-card fade-in-up page-card markdown-post-card"
        style={{ animationDelay: "120ms" }}
      >
        <CardContent className="page-card-content markdown-post-content">
          <Typography variant="h3" className="markdown-h2">
            Post not found
          </Typography>
          <Typography className="markdown-paragraph">
            That markdown post doesn&apos;t exist yet. Add a file and a matching
            entry to the blog post registry when you&apos;re ready.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={3.2}>
      <PageSummaryCard subtitle={post.title} />
      <Card
        className="section-card fade-in-up page-card markdown-post-card"
        style={{ animationDelay: "120ms" }}
      >
        <CardContent className="page-card-content markdown-post-content">
          <MarkdownArticle source={post.source} />
        </CardContent>
      </Card>
    </Stack>
  );
}

function HomePage(props: { onProjectSelect: (project: ProjectCard) => void }) {
  return (
    <>
      <Box component="section" id="home" className="hero-section">
        <Box
          className="hero-panel fade-in-up"
          style={{ animationDelay: "80ms" }}
        >
          <Box className="hero-grid">
            <Stack spacing={3.5} className="hero-copy">
              <Box>
                <Typography variant="h1" className="hero-title">
                  <Box component="span" className="hero-name-highlight">
                    Bryan{" "}
                    <Box component="span" className="hero-last-name">
                      Torres
                      <Box
                        component="span"
                        aria-hidden="true"
                        className="hero-title-cursor"
                      />
                    </Box>
                  </Box>
                </Typography>
              </Box>

              <Typography className="hero-subtitle">
                Virginia Tech MEng CS candidate graduating May 2027, building
                production software across Python, TypeScript, cloud
                infrastructure, and AI.
              </Typography>

              <Box className="contact-grid">
                {contactLinks.map((item, index) => (
                  <Box
                    key={item.label}
                    component="a"
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="contact-card fade-in-up"
                    style={{ animationDelay: `${160 + index * 90}ms` }}
                  >
                    <Box className="contact-icon">{item.icon}</Box>
                    <Box className="contact-copy">
                      <Typography className="contact-label">
                        {item.label}
                      </Typography>
                      <Typography className="contact-value">
                        {item.value}
                      </Typography>
                    </Box>
                    <ArrowOutwardRoundedIcon className="contact-arrow" />
                  </Box>
                ))}
              </Box>
            </Stack>

            <Box className="portrait-column">
              <Box
                className="portrait-ring fade-in-up"
                style={{ animationDelay: "220ms" }}
              >
                <Avatar
                  alt="Bryan Torres"
                  src={profilePic}
                  className="hero-avatar"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box component="section" id="experience" className="content-section">
        <Box className="fade-in-up" style={{ animationDelay: "720ms" }}>
          <SectionHeading title="Experience" />
        </Box>

        <Stack spacing={2.5} className="experience-stack">
          {experienceCards.map((experience, index) => (
            <Card
              key={`${experience.role}-${experience.organization}`}
              className="section-card experience-card fade-in-up"
              style={{ animationDelay: `${780 + index * 90}ms` }}
            >
              <CardContent className="experience-content">
                {experience.imageSrc ? (
                  <Box className="experience-media">
                    <Box
                      component="img"
                      src={experience.imageSrc}
                      alt={experience.imageAlt ?? experience.organization}
                      className="experience-image"
                    />
                  </Box>
                ) : null}
                <Typography className="experience-period">
                  {experience.period}
                </Typography>
                <Typography variant="h5" className="card-title">
                  {experience.role}
                </Typography>
                <Typography className="experience-organization">
                  <Box component="span" className="company-name">
                    {experience.organization}
                  </Box>
                </Typography>
                <Stack spacing={2} className="experience-paragraphs">
                  {experience.paragraphs.map((paragraph) => (
                    <Typography
                      key={paragraph}
                      className="card-description experience-paragraph"
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </Stack>
                {experience.learnedStack ? (
                  <Box className="experience-stack-panel">
                    <Typography className="experience-stack-title">
                      Learned Most From:
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      flexWrap="wrap"
                      className="icon-badge-row"
                    >
                      {experience.learnedStack.map((item) => (
                        <Box
                          key={`${experience.organization}-${item.label}`}
                          className="icon-badge"
                        >
                          <Box className="icon-badge-icon">{item.icon}</Box>
                          <Typography className="icon-badge-label">
                            {item.label}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      <ProjectsSection onProjectSelect={props.onProjectSelect} />

      <Box component="section" id="skills" className="content-section">
        <Box className="fade-in-up" style={{ animationDelay: "560ms" }}>
          <SectionHeading title="Technical Skills" />
        </Box>

        <Box className="card-grid skills-grid">
          {skillCards.map((skill, index) => (
            <Card
              key={skill.title}
              className="section-card skill-card fade-in-up"
              style={{ animationDelay: `${620 + index * 90}ms` }}
            >
              <CardContent className="card-content">
                <Typography variant="h5" className="card-title">
                  {skill.title}
                </Typography>
                <Typography className="card-description">
                  {skill.description}
                </Typography>
                {skill.highlights ? (
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                    className="icon-badge-row"
                  >
                    {skill.highlights.map((highlight) => (
                      <Box
                        key={`${skill.title}-${highlight.label}`}
                        className="icon-badge"
                      >
                        <Box className="icon-badge-icon">{highlight.icon}</Box>
                        <Typography className="icon-badge-label">
                          {highlight.label}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box component="section" id="about" className="content-section">
        <SectionHeading title="About Me" />
        <AboutPage />
      </Box>
    </>
  );
}

function AboutPage() {
  return (
    <Stack spacing={4.5}>
      <Card
        className="section-card fade-in-up page-card"
        style={{ animationDelay: "160ms" }}
      >
        <CardContent className="page-card-content">
          <SectionHeading title="What Drives Me" />
          <Stack spacing={2.2} className="page-paragraphs">
            <Typography className="card-description page-paragraph">
              I&apos;m drawn to a mix of software engineering, systems thinking,
              and product-minded design. I like tools that feel useful in a
              concrete way and make somebody&apos;s day easier.
            </Typography>
            <Typography className="card-description page-paragraph">
              Long term, I want to keep growing into someone who can build
              reliable systems, contribute to strong teams, and design software
              that matters.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card
        className="section-card fade-in-up page-card"
        style={{ animationDelay: "220ms" }}
      >
        <CardContent className="page-card-content">
          <Box className="about-collage-grid">
            {aboutCollageTiles.map((tile, index) => (
              <Box
                key={`${tile.alt}-${index}`}
                className={`about-collage-tile ${tile.className}`}
              >
                <Box
                  component="img"
                  src={tile.src}
                  loading="lazy"
                  alt={tile.alt}
                  className="about-collage-image"
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Card
        className="section-card fade-in-up page-card"
        style={{ animationDelay: "280ms" }}
      >
        <CardContent className="page-card-content">
          <SectionHeading title="Interests Outside of Engineering" />
          <Typography className="card-description page-paragraph">
            Outside of coding, I enjoy reading, playing games, and staying
            active. Those are the things that help me recharge and often spark
            new ideas when I come back to technical work. I enjoy going to the
            gym and staying active, everyday I have to do some sort of activity
            in order to feel "complete." Most importantly, I love spending time
            with family. Majority of my family resides in Queens, New York, and
            I adore the holidays because I get to not only eat like a pig for a
            little bit, but also see the people I care most about in the world.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}

function ProjectsSection(props: {
  onProjectSelect: (project: ProjectCard) => void;
}) {
  return (
    <Box component="section" id="projects" className="content-section">
      <SectionHeading title="Projects" />
      <Box className="card-grid projects-grid">
        {projectCards.map((project) => (
          <Card
            key={project.title}
            id={
              project.title === "TDS: Dataset Diversity"
                ? "tds-dataset-diversity"
                : undefined
            }
            className="section-card project-card"
          >
            <CardContent className="card-content">
              <Typography className="card-eyebrow">
                {project.eyebrow}
              </Typography>
              <Typography variant="h3" className="card-title project-title">
                {project.title}
              </Typography>
              <Typography className="card-description">
                {project.description}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                className="tag-row"
              >
                {project.tags.map((tag) => (
                  <Chip key={tag} label={tag} className="info-chip" />
                ))}
              </Stack>
              <Box className="project-card-actions">
                <Button
                  className="project-details-button"
                  onClick={() => props.onProjectSelect(project)}
                  aria-label={`View details for ${project.title}`}
                  aria-haspopup="dialog"
                >
                  Project details
                </Button>
                {project.href && project.linkLabel ? (
                  <Box
                    component="a"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    <Typography component="span" className="project-link-label">
                      {project.linkLabel}
                    </Typography>
                    <ArrowOutwardRoundedIcon className="project-link-icon" />
                  </Box>
                ) : null}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFooterBar, setShowFooterBar] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(
    null,
  );
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const location = useLocation();
  const pendingSection = useRef<string | null>(null);

  const scrollToSection = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    pendingSection.current = id;
    setActiveSection(id === "home" || id === "about" ? id : "experience");
    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    let frame = 0;
    let lastOffset = 0;
    const updateScrollState = () => {
      frame = 0;
      setShowScrollTop(window.scrollY > 320);
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      setShowFooterBar(scrollTop + clientHeight >= scrollHeight - 8);

      // Share one offset between anchor scrolling and section detection.
      const headerHeight =
        document.getElementById("site-header")?.getBoundingClientRect()
          .height ?? 80;
      const offset = Math.ceil(headerHeight) + 24;
      if (offset !== lastOffset) {
        document.documentElement.style.setProperty(
          "--section-scroll-offset",
          `${offset}px`,
        );
        lastOffset = offset;
      }
      if (pendingSection.current) {
        const target = document.getElementById(pendingSection.current);
        const reachedTarget =
          target && Math.abs(target.getBoundingClientRect().top - offset) <= 2;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
        if (!reachedTarget && !atBottom && target) return;
        pendingSection.current = null;
      }
      // Experience includes projects and skills until About Me begins.
      const marker = offset + 2;
      let currentSection = "home";
      for (const route of navRoutes) {
        const id = route.to.split("#")[1];
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) {
          currentSection = id;
        }
      }
      setActiveSection(currentSection);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollState);
    };

    const releaseNavigation = () => {
      pendingSection.current = null;
      scheduleUpdate();
    };

    updateScrollState();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("scrollend", releaseNavigation);
    window.addEventListener("wheel", releaseNavigation, { passive: true });
    window.addEventListener("touchstart", releaseNavigation, { passive: true });
    window.addEventListener("keydown", releaseNavigation);
    window.addEventListener("resize", scheduleUpdate);
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    const main = document.querySelector("main");
    if (main) resizeObserver.observe(main);
    const header = document.getElementById("site-header");
    if (header) resizeObserver.observe(header);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("scrollend", releaseNavigation);
      window.removeEventListener("wheel", releaseNavigation);
      window.removeEventListener("touchstart", releaseNavigation);
      window.removeEventListener("keydown", releaseNavigation);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        scrollToSection(location.hash.slice(1));
      } else {
        pendingSection.current = null;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, scrollToSection]);

  const handleThemeToggle = () => {
    setIsDarkMode((currentMode) => !currentMode);
  };

  const scrollToTop = () => {
    scrollToSection("home");
  };

  const isRouteActive = (route: string) =>
    location.pathname === "/" && route === `/#${activeSection}`;

  return (
    <Box className={`app-shell ${isDarkMode ? "theme-dark" : "theme-light"}`}>
      <AppBar
        id="site-header"
        position="sticky"
        elevation={0}
        className="topbar"
        sx={{ bgcolor: "#000000ff" }}
      >
        <Toolbar className="topbar-toolbar">
          <Box
            component={RouterLink}
            to="/#home"
            className="brand-mark"
            onClick={() => scrollToSection("home")}
          >
            BT
          </Box>

          <Stack direction="row" spacing={1.5} className="topbar-actions">
            <Stack
              component="nav"
              aria-label="Main navigation"
              direction="row"
              spacing={1}
              className="topbar-links"
            >
              {navRoutes.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color="inherit"
                  aria-current={isRouteActive(item.to) ? "location" : undefined}
                  onClick={() => scrollToSection(item.to.split("#")[1])}
                  className={`topbar-button ${isRouteActive(item.to) ? "topbar-button-active" : ""}`}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <IconButton
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              onClick={handleThemeToggle}
              className="theme-toggle"
            >
              {isDarkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="main">
        <Container maxWidth="lg" className="page-content">
          {location.pathname !== "/" ? (
            <Button
              component={RouterLink}
              to="/"
              startIcon={<WestRoundedIcon />}
              className="back-link-button fade-in-up"
              style={{ animationDelay: "40ms" }}
            >
              Back Home
            </Button>
          ) : null}

          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onProjectSelect={(project) => {
                    setSelectedProject(project);
                    setIsProjectDialogOpen(true);
                  }}
                />
              }
            />
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
        </Container>
      </Box>

      <Dialog
        open={isProjectDialogOpen}
        onClose={() => setIsProjectDialogOpen(false)}
        aria-labelledby="project-dialog-title"
        fullWidth
        maxWidth="md"
        scroll="paper"
        className={`project-dialog ${isDarkMode ? "theme-dark" : "theme-light"}`}
        slotProps={{ paper: { className: "project-dialog-paper" } }}
      >
        <DialogTitle id="project-dialog-title" className="project-dialog-title">
          {selectedProject?.title}
        </DialogTitle>
        <IconButton
          aria-label="Close project details"
          className="project-dialog-close"
          onClick={() => setIsProjectDialogOpen(false)}
        >
          <CloseRoundedIcon />
        </IconButton>
        <DialogContent dividers className="project-dialog-content">
          {selectedProject ? (
            <Stack spacing={2.5}>
              <Typography className="card-eyebrow">
                {selectedProject.eyebrow}
              </Typography>
              {selectedProject.imageSrc ? (
                <Box
                  component="img"
                  src={selectedProject.imageSrc}
                  alt={selectedProject.imageLabel ?? selectedProject.title}
                  className="project-inline-image"
                />
              ) : null}
              <Typography className="card-description">
                {selectedProject.description}
              </Typography>
              {selectedProject.details.map((detail) => (
                <Typography key={detail} className="card-description">
                  {detail}
                </Typography>
              ))}
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {selectedProject.tags.map((tag) => (
                  <Chip key={tag} label={tag} className="info-chip" />
                ))}
              </Stack>
            </Stack>
          ) : null}
        </DialogContent>
        <DialogActions className="project-dialog-actions">
          {selectedProject?.href ? (
            <Button
              component="a"
              href={selectedProject.href}
              target="_blank"
              rel="noreferrer"
              endIcon={<ArrowOutwardRoundedIcon />}
              className="project-details-button"
            >
              {selectedProject.linkLabel ?? "View project"}
            </Button>
          ) : null}
          <Button
            onClick={() => setIsProjectDialogOpen(false)}
            className="project-details-button"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {showFooterBar ? (
        <Box className="footer-bar">
          <Typography className="footer-text">
            © Copyright 2026 Bryan Torres, All Rights Reserved.
          </Typography>
        </Box>
      ) : null}

      {showScrollTop ? (
        <Fab
          aria-label="Scroll back to top"
          className="scroll-top-button"
          onClick={scrollToTop}
        >
          <ArrowUpwardRoundedIcon />
        </Fab>
      ) : null}
    </Box>
  );
}

export default App;
