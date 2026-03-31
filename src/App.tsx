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
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import profilePic from './assets/IMG_9088.jpg'

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
    value: 'your.email@example.com',
    href: 'mailto:your.email@example.com',
    icon: <EmailRoundedIcon />,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/your-profile',
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
    value: 'PDF or link',
    href: '#',
    icon: <DescriptionRoundedIcon />,
  },
]

const projectCards = [
  {
    eyebrow: 'Featured Project',
    title: 'strongest build here',
    description:
      'good project',
    tags: ['Project title', 'Short summary', 'Tech stack'],
  },
  {
    eyebrow: 'Case Study',
    title: 'Highlight impact and process',
    description:
      'second project',
    tags: ['Challenge', 'Approach', 'Outcome'],
  },
  {
    eyebrow: 'In Progress',
    title: 'Reserve a space for current work',
    description:
      'stats/machine learning project',
    tags: ['Current work', 'Iteration', 'Next steps'],
  },
]

const skillCards = [
  {
    title: 'Languages',
    description: 'programming langauges',
  },
  {
    title: 'Frameworks & Tools',
    description: 'Devops tools',
  },
  {
    title: 'Strength Areas',
    description: 'blank',
  },
]

const experienceCards = [
  {
    period: 'Start Date - End Date',
    role: 'Role Title',
    organization: 'Company, Team, or Organization',
    description:
      'company and stuff',
  },
  {
    period: 'Start Date - End Date',
    role: 'Second Role or Leadership Position',
    organization: 'School, Internship, Club, or Volunteer Work',
    description:
      'school',
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
  return (
    <Box className="app-shell">
      <AppBar position="sticky" elevation={0} className="topbar">
        <Toolbar className="topbar-toolbar">
          <Typography component="a" href="#home" className="brand-mark">
            BT
          </Typography>

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
        </Toolbar>
      </AppBar>

      <Box component="main">
        <Container maxWidth="lg" className="page-content">
          <Box component="section" id="home" className="hero-section">
            <Box className="hero-panel">
              <Box className="hero-grid">
                <Stack spacing={3.5} className="hero-copy">
                  <Box>
                    <Typography className="hero-eyebrow">Portfolio</Typography>
                    <Typography variant="h1" className="hero-title">
                      Bryan Torres
                    </Typography>
                  </Box>

                  <Typography className="hero-subtitle">
                    heheh hello
                  </Typography>

                  <Box className="contact-grid">
                    {contactLinks.map((item) => (
                      <Box
                        key={item.label}
                        component="a"
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="contact-card"
                        onClick={(event) => {
                          if (item.href === '#') {
                            event.preventDefault()
                          }
                        }}
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
                  <Box className="portrait-ring">
                    <Avatar alt="Bryan Torres" src={profilePic} className="hero-avatar" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box component="section" id="about" className="content-section">
            <SectionHeading
              eyebrow="01"
              title="About Me"
              subtitle="Blank"
            />

            <Card className="section-card about-card">
              <CardContent className="about-card-content" />
            </Card>
          </Box>

          <Box component="section" id="projects" className="content-section">
            <SectionHeading
              eyebrow="02"
              title="Projects"
              subtitle="Blank"
            />

            <Box className="card-grid projects-grid">
              {projectCards.map((project) => (
                <Card key={project.title} className="section-card project-card">
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
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          <Box component="section" id="skills" className="content-section">
            <SectionHeading
              eyebrow="03"
              title="Technical Skills"
              subtitle="Fill in"
            />

            <Box className="card-grid skills-grid">
              {skillCards.map((skill) => (
                <Card key={skill.title} className="section-card skill-card">
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
            <SectionHeading
              eyebrow="04"
              title="Experience"
              subtitle="Overall experience"
            />

            <Stack spacing={2.5} className="experience-stack">
              {experienceCards.map((experience) => (
                <Card key={`${experience.role}-${experience.organization}`} className="section-card experience-card">
                  <CardContent className="experience-content">
                    <Typography className="experience-period">{experience.period}</Typography>
                    <Typography variant="h5" className="card-title">
                      {experience.role}
                    </Typography>
                    <Typography className="experience-organization">{experience.organization}</Typography>
                    <Typography className="card-description">{experience.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default App
