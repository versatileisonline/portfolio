import type { ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Link as RouterLink, useParams } from "react-router-dom";
import { blogPosts } from "../content/portfolio";

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

export function BlogIndexPage() {
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

export function BlogPostPage() {
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
