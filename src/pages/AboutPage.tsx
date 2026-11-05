import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import SectionHeading from "../components/SectionHeading";
import { aboutCollageTiles } from "../content/portfolio";

export default function AboutPage() {
  return (
    <Stack spacing={4.5}>
      <Card
        id="about-drives"
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
        id="about-photos"
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
        id="about-interests"
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
