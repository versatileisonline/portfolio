import { useEffect, useState } from 'react'
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
import profilePic from './assets/IMG_9088.jpg'

import resume from './assets/resume_bryan01.pdf'

import melanoma from './assets/melanoma_detection.pdf'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About Me', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Technical Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
]

const contactLinks = [
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

const projectCards = [
  {
    eyebrow: 'In progress: Jan. 2026 -',
    title: 'ML For Healthcare: Melanoma Classification',
    href: melanoma,
    linkLabel: 'View project',
    description:
      'Built a machine leraning pipeline for melanoma image classification, focusing on early skin cancer detection from images.',
    tags: ['Melanoma Detection', 'Medical Imaging', 'Python / Jupyter Notebook'],
  },
  {
    eyebrow: 'Academia Work: Oct. 2024 to Jan 2026',
    title: 'M.A.R.C.O - Multi-Agent Reactive Code Optimizer',
    href: 'https://arxiv.org/pdf/2505.03906',
    linkLabel: 'View project',
    description:
      'Built as part of my undergraduate research, MARCO is an agentic AI framework designed for automated, reliable kernel generation and optimization. Proving that LLMs, when equipped with specialized domain guidance, can reliably automate the development of complex GPU kernels with optimal performance and high efficiency.',
    tags: ['High-performance Computing (HPC)', 'Agentic AI Framework', 'Benchmarking'],
  },
  {
    eyebrow: 'Most Recent: Jan. 2026 -',
    title: 'Canvas+',
    href: 'https://github.com/versatileisonline/CanvasPlus',
    linkLabel: 'View project',
    description:
      'A Chromium-based browser extension that reimagines the Canvas dashboard with a more centralized course homepage. This project focuses on improving how students manage assignemnts, notes and academic focus by creating a cleaner and more useful experience on top of the existing LMS.',
    tags: ['Browser Extension', 'UX Iteration', 'Student Productivity'],
  },
]

const skillCards = [
  {
    title: 'Most Proficient Languages',
    description: 'Python, C, C#, Java',
  },
  {
    title: 'Frameworks & Tools',
    description: 'Unix/Linux cmds, GKE, Docker, Git, GitHub/GitLab, Next.js, React, MUI, FastAPI',
  },
  {
    title: 'Certifications',
    description: 'None as of yet',
  },
]

const experienceCards = [
  {
    period: 'Incoming Summer 2026',
    role: 'DevOps Intern',
    organization: 'Expedition Technology',
    paragraphs: [
      'TBD',
    ],
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
  },
]

function SectionHeading(props: { eyebrow: string; title: string; subtitle: string }) {
  const { eyebrow, title, subtitle } = props

  return (
    <Stack spacing={1.25} className="section-heading">
      <Typography className="section-eyebrow">{eyebrow}</Typography>
      <Typography variant="h2" className="section-title">
        {title}
      </Typography>
      <Typography className="section-subtitle">{subtitle}</Typography>
    </Stack>
  )
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleThemeToggle = () => {
    setIsDarkMode((currentMode) => !currentMode)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Box className={`app-shell ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
      <AppBar position="sticky" elevation={0} className="topbar" sx={{bgcolor:'#000000ff'}}>
        <Toolbar className="topbar-toolbar">
          <Box component="a" href="#home" className="brand-mark">
            BT
          </Box>

          <Stack direction="row" spacing={1.5} className="topbar-actions">
            <Stack direction="row" spacing={1} className="topbar-links">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  component="a"
                  href={`#${item.id}`}
                  color="inherit"
                  className="topbar-button"
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
          <Box component="section" id="home" className="hero-section">
            <Box className="hero-panel fade-in-up" style={{ animationDelay: '80ms' }}>
              <Box className="hero-grid">
                <Stack spacing={3.5} className="hero-copy">
                  <Box>
                    {/* <Typography className="hero-eyebrow">Portfolio</Typography> */}
                    <Typography variant="h1" className="hero-title">
                      <Box component="span" className="hero-name-highlight">Bryan Torres</Box>
                      <Box component="span" aria-hidden="true" className="hero-title-cursor">|</Box>
                    </Typography>
                  </Box>

                  <Typography className="hero-subtitle">
                    Hey, I&apos;m <Box component="span" className="hero-name-highlight">Bryan Torres</Box>. Here, you
                    can check out what I&apos;m working on. I do my best to contribute to impactful projects.
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
                subtitle=""
              />
            </Box>

            <Card className="section-card about-card fade-in-up" style={{ animationDelay: '340ms' }}>
              <CardContent className="about-card-content">
                <Typography className="card-description">
                I want to make an impact on the world, whether for students, healthcare personnels, or fellow coders. I'm drawn to building things that actually make someone's day better. Tools that give people back time. I care about work that has a real effect beyond the screen. At the end of the day, I don't just want to write code, I want to build things that matter. 
                
                Aside from that, I have a range of interests outside of coding. I enjoy reading, playing games and staying active. It's always how I get my mood and creativity up.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box component="section" id="projects" className="content-section">
            <Box className="fade-in-up" style={{ animationDelay: '400ms' }}>
              <SectionHeading
                eyebrow="02"
                title="Projects"
                subtitle="Featured Projects"
              />
            </Box>

            <Box className="card-grid projects-grid">
              {projectCards.map((project, index) => (
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
                subtitle="Looking forward to expand!"
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
                subtitle="Professional work experience"
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
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

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
  )
}

export default App
