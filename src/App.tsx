import { type ReactNode, useEffect, useState } from 'react'
import './App.css'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Fab,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material' 
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import WestRoundedIcon from '@mui/icons-material/WestRounded'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import SourceRoundedIcon from '@mui/icons-material/SourceRounded'
import LayersRoundedIcon from '@mui/icons-material/LayersRounded'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded'
import WebRoundedIcon from '@mui/icons-material/WebRounded'
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded'
import ApiRoundedIcon from '@mui/icons-material/ApiRounded'
import profilePic from './assets/photos/compressed_images/IMG_9088.jpg'
import aboutPhotoOne from './assets/photos/compressed_images/IMG_3927.jpg'
import aboutPhotoTwo from './assets/photos/compressed_images/IMG_8620.jpeg'
import aboutPhotoThree from './assets/photos/compressed_images/IMG_8628.jpg'
import aboutPhotoFour from './assets/photos/compressed_images/IMG_3652.jpeg'
import aboutPhotoFive from './assets/photos/compressed_images/IMG_3696.jpg'
import aboutPhotoSix from './assets/photos/compressed_images/IMG_2092.jpg'
import aboutPhotoSeven from './assets/photos/compressed_images/IMG_4213.jpeg'
import aboutPhotoEight from './assets/photos/compressed_images/IMG_6994.JPEG.jpeg'

import melanomaVisual from './assets/photos/ml_healthcare.png'
import marcoVisual from './assets/photos/compressed_images/IMG_1671.jpg'
import canvasVisual from './assets/photos/canvas_plus.png'
import syndicateVisual from './assets/photos/project_syndicate.png'
import darkWolfPhoto from './assets/photos/compressed_images/IMG_4204.jpeg'
import { Link as RouterLink, Route, Routes, useLocation, useParams } from 'react-router-dom'

import resume from './assets/resume_bryan01.pdf'
import melanoma from './assets/melanoma_detection.pdf'
import writingPost from './content/writing/index.md?raw'
import secondWritingPost from './content/writing/second.md?raw'

type NavRoute = {
  label: string
  to: string
}

type ContactLink = {
  label: string
  value: string
  href: string
  icon: ReactNode
}

type ProjectCard = {
  eyebrow: string
  title: string
  href?: string
  linkLabel?: string
  description: string
  tags: string[]
  details: string[]
  imageLabel: string
  imageSrc: string
  featuredOnHome?: boolean
  imageClassName?: string
}

type SkillCard = {
  title: string
  description: string
  highlights?: { label: string; icon: ReactNode }[]
}

type ExperienceCard = {
  period: string
  role: string
  organization: string
  paragraphs: string[]
  imageSrc?: string
  imageAlt?: string
  learnedStack?: { label: string; icon: ReactNode }[]
}

type BlogPost = {
  slug: string
  status: string
  title: string
  excerpt: string
  source: string
}

const navRoutes: NavRoute[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Writing', to: '/writing' },
]

const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    value: 'bryantorres@vt.edu',
    href: 'mailto:bryantorres@vt.edu',
    icon: <EmailRoundedIcon />,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/bryantorres-cs',
    href: 'https://www.linkedin.com/in/bryantorres-cs',
    icon: <LinkedInIcon />,
  },
  {
    label: 'GitHub',
    value: 'github.com/versatileisonline',
    href: 'https://github.com/versatileisonline',
    icon: <GitHubIcon />,
  },
  {
    label: 'Resume',
    value: 'View resume PDF',
    href: resume,
    icon: <DescriptionRoundedIcon />,
  },
]

const projectCards: ProjectCard[] = [
  {
    eyebrow: 'In progress: Jan. 2026 -',
    title: 'ML For Healthcare: Melanoma Classification',
    href: melanoma,
    linkLabel: 'Read paper',
    description:
      'Built a machine leraning pipeline for melanoma image classification, focusing on early skin cancer detection from images.',
    tags: ['Melanoma Detection', 'Medical Imaging', 'Python / Jupyter Notebook'],
    details: [
      'This project focuses on applying machine learning to a healthcare setting where early detection matters. I built the pipeline around melanoma image classification with an emphasis on model experimentation, data handling, and evaluation.',
      'A big part of the work was thinking carefully about how to structure the workflow in a way that was reproducible and readable. I wanted the project to feel like something that could be expanded beyond a one-off notebook into a stronger research or product direction.',
    ],
    imageLabel: 'Melanoma project visual',
    imageSrc: melanomaVisual,
    featuredOnHome: true,
  },
  {
    eyebrow: 'Academia Work: Oct. 2024 to Jan. 2026',
    title: 'M.A.R.C.O - Multi-Agent Reactive Code Optimizer',
    href: 'https://arxiv.org/pdf/2505.03906',
    linkLabel: 'Read paper',
    description:
      'Built as part of my undergraduate research, MARCO is an agentic AI framework designed for automated, reliable kernel generation and optimization.',
    tags: ['High-performance Computing (HPC)', 'Agentic AI Framework', 'Benchmarking'],
    details: [
      'MARCO grew out of undergraduate research focused on making LLM-assisted kernel generation more reliable. The project explored how specialized guidance and structured agents could help automate high-performance GPU kernel optimization while still preserving strong performance.',
      'What made this especially meaningful to me was the mix of systems thinking, benchmarking, and research communication. It pushed me to think beyond simply writing code and toward building a framework that made technical claims testable and defensible.',
    ],
    imageLabel: 'MARCO research visual',
    imageSrc: marcoVisual,
    featuredOnHome: true,
    imageClassName: 'project-detail-image-marco',
  },
  {
    eyebrow: 'Most Recent: Jan. 2026 -',
    title: 'Canvas+',
    href: 'https://github.com/versatileisonline/CanvasPlus',
    linkLabel: 'View project',
    description:
      'A Chromium-based browser extension that reimagines the Canvas dashboard with a more centralized course homepage.',
    tags: ['Browser Extension', 'UX Iteration', 'Student Productivity'],
    details: [
      'Canvas+ comes from wanting a student-facing tool that genuinely feels more useful day to day. The goal was to create a cleaner, more centralized course experience on top of an LMS that often feels fragmented. We surveyed Virginia Tech students from various colleges, providing further insight on how we should design our product.',
      'This project leans more into product thinking and interface design. I have been using it to explore how frontend polish, usability, and small workflow improvements can have a real impact on how students stay organized.',
    ],
    imageLabel: 'Canvas+ product visual',
    imageSrc: canvasVisual,
    featuredOnHome: true,
  },
  {
    eyebrow: 'Summer 2025 Internship Project',
    title: 'Project Syndicate',
    description:
      'A CI/CD pipeline data aggregation dashboard built during my internship to help teams understand pipeline health, security, and compliance in one place.',
    tags: ['Internship Project', 'CI/CD Visibility', 'Dashboard Design'],
    details: [
      'During my summer internship at Dark Wolf Solutions, I worked with two other interns on Project Syndicate, a CI/CD pipeline data aggregation platform built to give teams a clearer, centralized view of pipeline health, security, and compliance.',
      'My work focused on helping build the dashboard experience, where we designed and developed interfaces that made complex pipeline, application, and organization-level data easier to understand and navigate.',
      'Through this project, I gained hands-on experience with full-stack and DevOps workflows, including React, Material UI, FastAPI, PostgreSQL, Docker, GitLab CI, Google Kubernetes Engine, and Dex-based authentication.',
      'Beyond the technical work, Syndicate helped me grow professionally by reinforcing how important communication, collaboration, and iterative problem-solving are in a real engineering environment, especially while working closely with other interns, engineers, and leadership to ship something practical and meaningful.',
    ],
    imageLabel: 'Project Syndicate dashboard',
    imageSrc: syndicateVisual,
    featuredOnHome: false,
  },
]

const skillCards: SkillCard[] = [
  {
    title: 'Most Proficient Languages',
    description: 'Python, C, C#, Java',
    // highlights: [
    //   { label: 'Git', icon: <SourceRoundedIcon /> },
    //   { label: 'Linux', icon: <TerminalRoundedIcon /> },
    // ],
  },
  {
    title: 'Frameworks & Tools',
    description: 'Unix/Linux cmds, GKE, Docker, Git, GitHub/GitLab, Next.js, React, MUI, FastAPI',
    highlights: [
      { label: 'Docker', icon: <LayersRoundedIcon /> },
      { label: 'GitLab', icon: <AccountTreeRoundedIcon /> },
      { label: 'Linux', icon: <TerminalRoundedIcon /> },
      { label: 'GKE', icon: <CloudQueueRoundedIcon /> },
    ],
  },
  {
    title: 'Certifications',
    description: 'None as of yet, studying for Google Cloud Digital Leader!',
    // highlights: [
    //   { label: 'React', icon: <WebRoundedIcon /> },
    //   { label: 'FastAPI', icon: <ApiRoundedIcon /> },
    // ],
  },
]

const experienceCards: ExperienceCard[] = [
  {
    period: 'Incoming Summer 2026',
    role: 'DevOps Intern',
    organization: 'Expedition Technology',
    paragraphs: ['TBD'],
  },
  {
    period: 'Jun. 2025 - Aug. 2025',
    role: 'Software & DevOps Intern',
    organization: 'Dark Wolf Solutions',
    paragraphs: [
      'Over the summer, I worked at Dark Wolf Solutions as a Software & DevOps Intern on Project Syndicate. The experience showed me what it looks like to contribute on a real engineering team where communication, collaboration, and accountability matter every day.',
      'I worked closely with two other interns, and that shared problem-solving made the internship especially valuable. We operated in an agile environment with daily standups, biweekly sprints, live code reviews, and GitLab ticketing, which helped me get much more comfortable discussing progress, blockers, and technical decisions.',
      'We were guided by experienced engineers, which gave me a clearer view into how professional software teams organize work, mentor junior developers, and build at scale. That mentorship helped me grow not only technically, but also in the way I approached teamwork and ownership.',
      'On the technical side, we helped create the user interface for Syndicate, a pipeline dashboard designed across pipeline, application, and organization-level views. We built and deployed a containerized system using PostgreSQL, a Next.js frontend, a FastAPI backend, and Dex for OAuth, with deployments running through GKE. Overall, the internship strengthened both my technical foundation and my confidence in working as part of a collaborative engineering team.',
    ],
    imageSrc: darkWolfPhoto,
    imageAlt: 'Bryan Torres at Dark Wolf Solutions',
    learnedStack: [
      { label: 'Git', icon: <SourceRoundedIcon /> },
      { label: 'Linux', icon: <TerminalRoundedIcon /> },
      { label: 'Docker', icon: <LayersRoundedIcon /> },
      { label: 'GitLab CI', icon: <AccountTreeRoundedIcon /> },
      { label: 'PostgreSQL', icon: <StorageRoundedIcon /> },
      { label: 'FastAPI', icon: <ApiRoundedIcon /> },
      { label: 'GKE', icon: <CloudQueueRoundedIcon /> },
      { label: 'React + MUI', icon: <WebRoundedIcon /> },
    ],
  },
]

const beyondCodeInterests = [
  'Reading',
  'Gaming',
  'Staying active',
  'Building side projects',
  'Learning new systems',
  'Designing useful tools',
]

const aboutCollageTiles = [
  {
    src: aboutPhotoOne,
    alt: 'Bryan Torres outdoors portrait',
    className: 'about-collage-tile-small',
  },
  {
    src: aboutPhotoTwo,
    alt: 'Bryan Torres outdoors',
    className: 'about-collage-tile-large',
  },
  {
    src: aboutPhotoSeven,
    alt: 'Bryan Torres portrait',
    className: 'about-collage-tile-small',
  },
  {
    src: aboutPhotoThree,
    alt: 'Bryan Torres lifestyle',
    className: 'about-collage-tile-small',
  },
  {
    src: aboutPhotoFour,
    alt: 'Bryan Torres candid',
    className: 'about-collage-tile-wide',
  },
  {
    src: aboutPhotoFive,
    alt: 'Bryan Torres outdoors portrait',
    className: 'about-collage-tile-small',
  },
  {
    src: aboutPhotoSix,
    alt: 'Bryan Torres active lifestyle',
    className: 'about-collage-tile-small',
  },
  {
    src: aboutPhotoEight,
    alt: 'Bryan Torres candid portrait',
    className: 'about-collage-tile-small',
  },
] as const

const blogPosts: BlogPost[] = [
  {
    slug: 'first-post',
    status: 'Published',
    title: 'How to become more effective utilizing AI tools',
    excerpt: "Tooling with AI",
    source: writingPost,
  },
  {
    slug: 'second-post',
    status: 'Draft',
    title: 'Second Post',
    excerpt: 'Blah blah... second post stuff.',
    source: secondWritingPost,
  },
]

function SectionHeading(props: {
  eyebrow: string
  title: string
  subtitle: string
  action?: ReactNode
}) {
  const { eyebrow, title, subtitle, action } = props

  return (
    <Stack spacing={1.4} className="section-heading">
      <Typography className="section-eyebrow">{eyebrow}</Typography>
      <Typography variant="h2" className="section-title">
        {title}
      </Typography>
      <Typography className="section-subtitle">{subtitle}</Typography>
      {action ? <Box className="section-action-row">{action}</Box> : null}
    </Stack>
  )
}

function PageSummaryCard(props: { subtitle: string; delay?: string }) {
  const { subtitle, delay = '80ms' } = props

  return (
    <Card className="section-card fade-in-up page-summary-card" style={{ animationDelay: delay }}>
      <CardContent className="page-summary-content">
        <Typography className="page-summary-text">{subtitle}</Typography>
      </CardContent>
    </Card>
  )
}

function MarkdownArticle(props: { source: string }) {
  const source = props.source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\r\n/g, '\n')
    .trim()

  if (!source) {
    return <Box className="markdown-empty-space" />
  }

  const lines = source.split('\n')
  const blocks: ReactNode[] = []

  let index = 0
  while (index < lines.length) {
    const line = lines[index].trim()

    if (!line) {
      index += 1
      continue
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <Typography key={`h3-${index}`} variant="h5" className="markdown-h3">
          {line.slice(4)}
        </Typography>,
      )
      index += 1
      continue
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <Typography key={`h2-${index}`} variant="h4" className="markdown-h2">
          {line.slice(3)}
        </Typography>,
      )
      index += 1
      continue
    }

    if (line.startsWith('# ')) {
      blocks.push(
        <Typography key={`h1-${index}`} variant="h2" className="markdown-h1">
          {line.slice(2)}
        </Typography>,
      )
      index += 1
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []

      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().slice(2))
        index += 1
      }

      blocks.push(
        <Box key={`list-${index}`} component="ul" className="markdown-list">
          {items.map((item) => (
            <Box key={item} component="li" className="markdown-list-item">
              <Typography className="markdown-paragraph">{item}</Typography>
            </Box>
          ))}
        </Box>,
      )
      continue
    }

    if (line.startsWith('```')) {
      const codeLines: string[] = []
      index += 1

      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index])
        index += 1
      }

      index += 1

      blocks.push(
        <Box key={`code-${index}`} component="pre" className="markdown-code-block">
          <code>{codeLines.join('\n')}</code>
        </Box>,
      )
      continue
    }

    const paragraphLines: string[] = []
    while (index < lines.length) {
      const current = lines[index].trim()
      if (!current || current.startsWith('#') || current.startsWith('- ') || current.startsWith('```')) {
        break
      }
      paragraphLines.push(current)
      index += 1
    }

    blocks.push(
      <Typography key={`p-${index}`} className="markdown-paragraph">
        {paragraphLines.join(' ')}
      </Typography>,
    )
  }

  return <Stack spacing={2.1}>{blocks}</Stack>
}

function BlogIndexPage() {
  return (
    <Stack spacing={4.5}>
      <PageSummaryCard
        subtitle="A space for notes, lessons learned, and technical reflections. Each entry lives in its own markdown file, so writing and version control stay simple."
      />

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
              <Typography className="card-description">{post.excerpt}</Typography>
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
  )
}

function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((entry) => entry.slug === slug)

  if (!post) {
    return (
      <Card className="section-card fade-in-up page-card markdown-post-card" style={{ animationDelay: '120ms' }}>
        <CardContent className="page-card-content markdown-post-content">
          <Typography variant="h3" className="markdown-h2">
            Post not found
          </Typography>
          <Typography className="markdown-paragraph">
            That markdown post doesn&apos;t exist yet. Add a file and a matching entry to the blog post registry when
            you&apos;re ready.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Stack spacing={3.2}>
      <PageSummaryCard subtitle={post.title} />
      <Card className="section-card fade-in-up page-card markdown-post-card" style={{ animationDelay: '120ms' }}>
        <CardContent className="page-card-content markdown-post-content">
          <MarkdownArticle source={post.source} />
        </CardContent>
      </Card>
    </Stack>
  )
}

function HomePage() {
  const featuredProjects = projectCards.filter((project) => project.featuredOnHome !== false)

  return (
    <>
      <Box component="section" id="home" className="hero-section">
        <Box className="hero-panel fade-in-up" style={{ animationDelay: '80ms' }}>
          <Box className="hero-grid">
            <Stack spacing={3.5} className="hero-copy">
              <Box>
                <Typography variant="h1" className="hero-title">
                  <Box component="span" className="hero-name-highlight">Bryan Torres</Box>
                  <Box component="span" aria-hidden="true" className="hero-title-cursor">|</Box>
                </Typography>
              </Box>

              <Typography className="hero-subtitle">
                Hey, I&apos;m <Box component="span" className="hero-name-highlight">Bryan Torres</Box>. Here, you can
                check out what I&apos;m working on. I do my best to contribute to impactful projects.
              </Typography>

              <Box className="contact-grid">
                {contactLinks.map((item, index) => (
                  <Box
                    key={item.label}
                    component="a"
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="contact-card fade-in-up"
                    style={{ animationDelay: `${160 + index * 90}ms` }}
                  >
                    <Box className="contact-icon">{item.icon}</Box>
                    <Box className="contact-copy">
                      <Typography className="contact-label">{item.label}</Typography>
                      <Typography className="contact-value">{item.value}</Typography>
                    </Box>
                    <ArrowOutwardRoundedIcon className="contact-arrow" />
                  </Box>
                ))}
              </Box>
            </Stack>

            <Box className="portrait-column">
              <Box className="portrait-ring fade-in-up" style={{ animationDelay: '220ms' }}>
                <Avatar alt="Bryan Torres" src={profilePic} className="hero-avatar" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box component="section" id="about" className="content-section">
        <Box className="fade-in-up" style={{ animationDelay: '280ms' }}>
          <SectionHeading
            eyebrow="01"
            title="About Me"
            subtitle="A short look at what motivates me."
            action={
              <Button
                component={RouterLink}
                to="/about"
                endIcon={<ArrowOutwardRoundedIcon />}
                className="section-link-button"
              >
                More About Me
              </Button>
            }
          />
        </Box>

        <Card className="section-card about-card fade-in-up" style={{ animationDelay: '340ms' }}>
          <CardContent className="about-card-content">
            <Typography className="card-description">
              I want to make an impact on the world, whether for students, healthcare personnel, or fellow coders. I&apos;m
              drawn to building things that make someone&apos;s day better and give people back time.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box component="section" id="projects" className="content-section">
        <Box className="fade-in-up" style={{ animationDelay: '400ms' }}>
          <SectionHeading
            eyebrow="02"
            title="Featured Projects"
            subtitle="Work that shows research, product thinking and topics that I care about."
            action={
              <Button
                component={RouterLink}
                to="/projects"
                endIcon={<ArrowOutwardRoundedIcon />}
                className="section-link-button"
              >
                View All Projects
              </Button>
            }
          />
        </Box>

        <Box className="card-grid projects-grid">
          {featuredProjects.map((project, index) => (
            <Card
              key={project.title}
              className="section-card project-card fade-in-up"
              style={{ animationDelay: `${460 + index * 90}ms` }}
            >
              <CardContent className="card-content">
                <Typography className="card-eyebrow">{project.eyebrow}</Typography>
                <Typography variant="h5" className="card-title">
                  {project.title}
                </Typography>
                <Typography className="card-description">{project.description}</Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" className="tag-row">
                  {project.tags.map((tag) => (
                    <Chip key={tag} label={tag} className="info-chip" />
                  ))}
                </Stack>

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
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box component="section" id="skills" className="content-section">
        <Box className="fade-in-up" style={{ animationDelay: '560ms' }}>
          <SectionHeading
            eyebrow="03"
            title="Technical Skills"
            subtitle="The languages, tools, and systems I rely on most right now."
          />
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
                <Typography className="card-description">{skill.description}</Typography>
                {skill.highlights ? (
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" className="icon-badge-row">
                    {skill.highlights.map((highlight) => (
                      <Box key={`${skill.title}-${highlight.label}`} className="icon-badge">
                        <Box className="icon-badge-icon">{highlight.icon}</Box>
                        <Typography className="icon-badge-label">{highlight.label}</Typography>
                      </Box>
                    ))}
                  </Stack>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box component="section" id="experience" className="content-section">
        <Box className="fade-in-up" style={{ animationDelay: '720ms' }}>
          <SectionHeading
            eyebrow="04"
            title="Experience"
            subtitle="Professional work experience and the environments that shaped how I work."
          />
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
                <Typography className="experience-period">{experience.period}</Typography>
                <Typography variant="h5" className="card-title">
                  {experience.role}
                </Typography>
                <Typography className="experience-organization">
                  <Box component="span" className="company-name">{experience.organization}</Box>
                </Typography>
                <Stack spacing={2} className="experience-paragraphs">
                  {experience.paragraphs.map((paragraph) => (
                    <Typography key={paragraph} className="card-description experience-paragraph">
                      {paragraph}
                    </Typography>
                  ))}
                </Stack>
                {experience.learnedStack ? (
                  <Box className="experience-stack-panel">
                    <Typography className="experience-stack-title">Learned Most From:</Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" className="icon-badge-row">
                      {experience.learnedStack.map((item) => (
                        <Box key={`${experience.organization}-${item.label}`} className="icon-badge">
                          <Box className="icon-badge-icon">{item.icon}</Box>
                          <Typography className="icon-badge-label">{item.label}</Typography>
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

    </>
  )
}

function AboutPage() {
  return (
    <Stack spacing={4.5}>
      <PageSummaryCard
        subtitle="A little more context on how I think, what I value, and who I am outside of technical work."
      />

      <Card className="section-card fade-in-up page-card" style={{ animationDelay: '160ms' }}>
        <CardContent className="page-card-content">
          <SectionHeading
            eyebrow="Overview"
            title="What Drives Me"
            subtitle="I care most about building things that are useful, thoughtful, and meaningful to the people using them."
          />
          <Stack spacing={2.2} className="page-paragraphs">
            <Typography className="card-description page-paragraph">
              I want to make an impact on the world, whether that is for students, healthcare teams, or the engineers I
              collaborate with. The kind of work that excites me most is work that has a real effect beyond the screen.
            </Typography>
            <Typography className="card-description page-paragraph">
              I&apos;m drawn to a mix of software engineering, systems thinking, and product-minded design. I like tools
              that feel useful in a concrete way and make somebody&apos;s day easier.
            </Typography>
            <Typography className="card-description page-paragraph">
              Long term, I want to keep growing into someone who can build reliable systems, contribute to strong teams,
              and design software that matters.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card className="section-card fade-in-up page-card" style={{ animationDelay: '220ms' }}>
        <CardContent className="page-card-content">
          <Box className="about-collage-grid">
            {aboutCollageTiles.map((tile, index) => (
              <Box key={`${tile.alt}-${index}`} className={`about-collage-tile ${tile.className}`}>
                <Box component="img" src={tile.src} alt={tile.alt} className="about-collage-image" />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Card className="section-card fade-in-up page-card" style={{ animationDelay: '280ms' }}>
        <CardContent className="page-card-content">
          <SectionHeading
            eyebrow="Beyond Code"
            title="Interests Outside of Engineering"
            subtitle="The things that reset my brain, shape my perspective, and keep me creative."
          />
          <Typography className="card-description page-paragraph">
            Outside of coding, I enjoy reading, playing games, and staying active. Those are the things that help me
            recharge and often spark new ideas when I come back to technical work. 

            I enjoy going to the gym and staying active, everyday I have to do some sort of activity in order to feel "complete."
            
            Most importantly, I love spending time with family. Majority of my family resides in Queens, New York, and I adore the holidays because I get
            to not only eat like a pig for a little bit, but also see the people I care most about in the world.

            
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" className="interest-row">
            {beyondCodeInterests.map((interest) => (
              <Chip key={interest} label={interest} className="info-chip interest-chip" />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

function ProjectsPage() {
  return (
    <Stack spacing={4.5}>
      <PageSummaryCard
        subtitle="A deeper look into the work, decisions, and technical direction behind the projects I want to highlight."
      />

      <Stack spacing={2.25}>
        {projectCards.map((project, index) => (
          <Card
            key={project.title}
            className="section-card fade-in-up project-page-card"
            style={{ animationDelay: `${160 + index * 90}ms` }}
          >
            <CardContent className="page-card-content">
              <Box className="project-detail-media">
                <Box
                  component="img"
                  src={project.imageSrc}
                  alt={project.imageLabel}
                  className={`project-detail-image ${project.imageClassName ?? ''}`}
                />
              </Box>
              <Typography className="card-eyebrow">{project.eyebrow}</Typography>
              <Typography variant="h4" className="card-title">
                {project.title}
              </Typography>
              <Stack spacing={1.5} className="page-paragraphs">
                <Typography className="card-description page-paragraph">{project.description}</Typography>
                {project.details.map((detail) => (
                  <Typography key={detail} className="card-description page-paragraph">
                    {detail}
                  </Typography>
                ))}
              </Stack>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" className="tag-row">
                {project.tags.map((tag) => (
                  <Chip key={tag} label={tag} className="info-chip" />
                ))}
              </Stack>
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
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  )
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showFooterBar, setShowFooterBar] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320)
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setShowFooterBar(scrollTop + clientHeight >= scrollHeight - 8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const handleThemeToggle = () => {
    setIsDarkMode((currentMode) => !currentMode)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isRouteActive = (route: string) => {
    if (route === '/') {
      return location.pathname === '/'
    }

    return location.pathname === route || location.pathname.startsWith(`${route}/`)
  }

  return (
    <Box className={`app-shell ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
      <AppBar position="sticky" elevation={0} className="topbar" sx={{ bgcolor: '#000000ff' }}>
        <Toolbar className="topbar-toolbar">
          <Box component={RouterLink} to="/" className="brand-mark">
            BT
          </Box>

          <Stack direction="row" spacing={1.5} className="topbar-actions">
            <Stack direction="row" spacing={1} className="topbar-links">
              {navRoutes.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color="inherit"
                  className={`topbar-button ${isRouteActive(item.to) ? 'topbar-button-active' : ''}`}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <IconButton
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
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
          {location.pathname !== '/' ? (
            <Button
              component={RouterLink}
              to="/"
              startIcon={<WestRoundedIcon />}
              className="back-link-button fade-in-up"
              style={{ animationDelay: '40ms' }}
            >
              Back Home
            </Button>
          ) : null}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/writing" element={<BlogIndexPage />} />
            <Route path="/writing/:slug" element={<BlogPostPage />} />
          </Routes>
        </Container>
      </Box>

      {showFooterBar ? (
        <Box className="footer-bar">
          <Typography className="footer-text">© Copyright 2026 Bryan Torres, All Rights Reserved.</Typography>
        </Box>
      ) : null}

      {showScrollTop ? (
        <Fab aria-label="Scroll back to top" className="scroll-top-button" onClick={scrollToTop}>
          <ArrowUpwardRoundedIcon />
        </Fab>
      ) : null}
    </Box>
  )
}

export default App
