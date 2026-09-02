# Bryan Torres — Portfolio

A personal portfolio for Bryan Torres, featuring selected software engineering, research, machine-learning, and product projects. The site brings together project context, technical experience, a downloadable resume, and a growing space for written reflections.

## Tech stack

- **React 19** with **TypeScript**
- **Vite** for local development and production builds
- **React Router** for client-side navigation
- **Material UI (MUI)** and Emotion for the interface and styling
- **ESLint** for code-quality checks
- Static deployment output in `docs/`, suitable for GitHub Pages

## Included content and assets

- Project features for TDS: Dataset Diversity, melanoma classification, Canvas+, M.A.R.C.O., and Project Syndicate
- Resume PDFs and a melanoma-classification paper
- Original project visuals and personal photography, including compressed image variants for the web
- Local Poppins font files
- Contact links for email, GitHub, LinkedIn, and resume access
- Markdown-powered writing drafts in `src/content/writing/`

## Local development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run lint     # Check code quality
npm run build    # Type-check and create a production build
npm run preview  # Preview the production build locally
```

To refresh the checked-in static site in `docs/` for local/GitHub Pages deployment:

```bash
npm run deploy-local
```

## Writing and future work

The writing section is intentionally lightweight and ready to grow. New posts can be drafted as Markdown files under `src/content/writing/`, then connected to the portfolio’s post data in the application. Future entries may cover internship lessons, machine-learning experiments, research notes, project build logs, and reflections on design and engineering.

The portfolio will continue evolving with new projects, expanded case studies, updated experience, and additional writing.

---

Curated by Bryan Torres.
