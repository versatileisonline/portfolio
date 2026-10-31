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

- Project features for Codeward, Kingdom Tycoon, KV Cache Lab, TDS: Dataset Diversity, melanoma classification, Canvas+, M.A.R.C.O., and Project Syndicate
- Resume PDFs and a melanoma-classification paper
- Original project visuals and personal photography, including compressed image variants for the web
- Local Poppins font files
- Contact links for email, GitHub, LinkedIn, and the current resume at `src/assets/resume.pdf`
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

GitHub Actions builds `dist/` and deploys it to GitHub Pages on pushes to `main`.
Source changes and assets are sufficient for that deployment; the checked-in
`docs/` snapshot is not the Actions deployment source.

To refresh the optional static snapshot in `docs/` locally:

```bash
npm run deploy-local
```

## Keeping projects and the resume current

Project cards and their detail dialogs share the `projectCards` entries in
`src/App.tsx`. Update an existing entry as work lands, or add an entry with its
period, description, tags, repository link, and detail paragraphs for a new project.
Keep completed work, next implementations, and longer-term options distinct.

Codeward's entry highlights its implemented Rust file-format, cryptographic, and
paper-code components. Integrated vault workflows, persistence, recovery flows,
and the desktop UI remain upcoming. Before updating its claims, check the
[implementation progress](https://github.com/versatileisonline/codeward/blob/main/docs/milestone-2-progress.md)
and [roadmap](https://github.com/versatileisonline/codeward/blob/main/docs/roadmap.md)
in the Codeward repository. Treat planned platform support and optional features
as future work until the corresponding implementation and validation exist.

Replace `src/assets/resume.pdf` with the latest approved PDF to update the resume
link without changing the import. Vite generates a content-hashed production URL
on each changed version. Run `npm run lint` and `npm run build`, then verify the
resume link and changed project dialogs in the preview before committing.

## Writing and future work

The writing section is intentionally lightweight and ready to grow. New posts can be drafted as Markdown files under `src/content/writing/`, then connected to the portfolio’s post data in the application. Future entries may cover internship lessons, machine-learning experiments, research notes, project build logs, and reflections on design and engineering.

The portfolio will continue evolving with new projects, expanded case studies, updated experience, and additional writing.

---

Curated by Bryan Torres.
