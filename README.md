# AfriYouth Innovation Labs — Website

Official website for AfriYouth Innovation Labs, built for the Jobra Competence AfriYouth Website
Design & Development Challenge.

Static site built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com),
deployable to Vercel with no backend required.

## Project structure

```text
.
├── docs/
│   └── source-material/     Official brief, brand guidelines, and content PDFs (reference only)
├── public/                  Static files served as-is (favicon, robots.txt, OG image)
├── src/
│   ├── assets/brand/        Brand SVG assets used by components
│   ├── components/          Reusable UI pieces (Header, Footer, Logo, Icon, PathCard)
│   ├── content/              Editable content — see "Editing content" below
│   │   ├── labs/            The six AfriYouth labs: services, summary, flagship product
│   │   ├── programs/        Youth-facing programmes and opportunities
│   │   ├── team/            Team member bios (optional — section hides if empty)
│   │   └── site-settings.json   Contact details, social links, form endpoint
│   ├── content.config.ts    Schema definitions for the content above
│   ├── layouts/Layout.astro Shared page shell: meta tags, header, footer
│   ├── pages/                One file per route (Home, About, Services, Programs, …)
│   └── styles/global.css    Design tokens (colours, type) and global styles
├── astro.config.mjs
└── package.json
```

## Editing content

Everything a non-developer needs to update lives in `src/content/` as Markdown or JSON — no code
changes required.

- **Labs** (`src/content/labs/*.md`): each file is one of AfriYouth's six labs. Edit the
  `summary`, `services` list, or `product` field in the frontmatter at the top of the file.
- **Programs** (`src/content/programs/*.md`): each file is one programme or opportunity. Set
  `status` to `open`, `upcoming`, or `closed`; add an `applyUrl` once applications open.
- **Team** (`src/content/team/*.md`): add one file per person with `name`, `role`, and optional
  `bio`/`photo`. The "Our team" section on the About page only appears once a file exists here.
- **Site settings** (`src/content/site-settings.json`): contact email, phone numbers, social
  links, and the contact form endpoint.

Any value still showing `[TBC: ...]` is a placeholder pending official content from AfriYouth —
search the codebase for `TBC` to find every remaining placeholder before launch.

After editing, commit the change — Vercel rebuilds and redeploys automatically.

## Local development

```bash
npm install
npm run dev       # starts a local server at http://localhost:4321
```

| Command                | Action                                   |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the local dev server               |
| `npm run build`        | Build the production site to `./dist/`   |
| `npm run preview`      | Preview the production build locally     |
| `npm run format`       | Format all files with Prettier           |
| `npm run format:check` | Check formatting without writing changes |

## Deployment

The site is a static build with no backend — deploy the `dist/` output to any static host.
For Vercel: import the GitHub repository, leave the build settings at their Astro defaults
(`npm run build`, output directory `dist`), and deploy.

## Contact form

The contact form posts to [Web3Forms](https://web3forms.com) (free, no backend needed). Before
launch, replace the placeholder `access_key` in `src/pages/contact.astro` with a real Web3Forms
access key tied to the inbox that should receive submissions.

## Recommended editor setup

Opening this project in VS Code will prompt to install the recommended extensions
(`.vscode/extensions.json`): Astro language support, Tailwind CSS IntelliSense, Prettier, and
EditorConfig support. Installing these gives accurate autocomplete and keeps formatting consistent
with the rest of the codebase.
