# AfriYouth Innovation Labs Website

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
│   ├── content/              Editable content, see "Editing content" below
│   │   ├── labs/            The six AfriYouth labs: services, summary, flagship product
│   │   ├── programs/        Youth-facing programmes and opportunities
│   │   ├── team/            Team member bios (optional, section hides if empty)
│   │   └── site-settings.json   Contact details, social links, form endpoint
│   ├── content.config.ts    Schema definitions for the content above
│   ├── layouts/Layout.astro Shared page shell: meta tags, header, footer
│   ├── pages/                One file per route (Home, About, Services, Programs, etc.)
│   │   └── programs/[slug]/register.astro   One registration page per programme
│   └── styles/global.css    Design tokens (colours, type) and global styles
├── astro.config.mjs
└── package.json
```

## Editing content

Everything a non-developer needs to update lives in `src/content/` as Markdown or JSON, with no
code changes required.

- **Labs** (`src/content/labs/*.md`): each file is one of AfriYouth's six labs. Edit the
  `summary`, `services` list, or `product` field in the frontmatter at the top of the file.
- **Programs** (`src/content/programs/*.md`): each file is one programme or opportunity. Set
  `status` to `open`, `upcoming`, or `closed`. While a programme has no `applyUrl`, its button on
  the Programs page reads "Register Interest" and leads to a dedicated registration form at
  `/programs/<slug>/register`. Once you add an `applyUrl` (an external application link or form)
  and set `status: open`, the button automatically switches to "Apply Now" and links there
  instead.
- **Team** (`src/content/team/*.md`): add one file per person with `name`, `role`, and optional
  `bio`/`photo`. The "Our team" section on the About page only appears once a file exists here.
- **Site settings** (`src/content/site-settings.json`): contact email, phone numbers, social
  links, and the contact form endpoint.

## Remaining placeholders

These values are still marked `[TBC: ...]` pending official information from AfriYouth. The site
builds and runs correctly with them in place; replace each before final handover.

| Placeholder            | File                             | Field              |
| ---------------------- | -------------------------------- | ------------------ |
| Official contact email | `src/content/site-settings.json` | `email`            |
| Official phone number  | `src/content/site-settings.json` | `phone`            |
| Office address         | `src/content/site-settings.json` | `address`          |
| LinkedIn URL           | `src/content/site-settings.json` | `social.linkedin`  |
| X / Twitter URL        | `src/content/site-settings.json` | `social.twitter`   |
| Facebook URL           | `src/content/site-settings.json` | `social.facebook`  |
| Instagram URL          | `src/content/site-settings.json` | `social.instagram` |

Social icons in the footer only appear once their URL is filled in; each stays hidden while its
value still starts with `[TBC`.

The contact form and every per-programme registration form already submit to a working Web3Forms
account (access key `be537b15-e5df-4643-a8cb-8443e9ba1d8e`). Submissions land in the inbox used
to create that key. Swap this key for AfriYouth's own Web3Forms account before final handover, in
both `src/pages/contact.astro` and `src/pages/programs/[slug]/register.astro`.

After editing, commit the change. Vercel rebuilds and redeploys automatically.

## Technology choices

Each tool below was picked against one requirement of the challenge brief: a fast, accessible,
content-editable site that a non-developer can maintain and that costs nothing to host.

| Choice                                    | Why                                                                                                                                                                                                                                                                                    |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Astro** (static output)                 | The site is content, not an application. Astro renders every page to plain HTML at build time and ships zero JavaScript by default, so pages load fast on the low-bandwidth mobile connections much of the audience uses. A static build also has no server to run, patch, or pay for. |
| **Astro content collections**             | Labs, programmes, and team members live as Markdown/JSON in `src/content/`, validated by a schema in `src/content.config.ts`. Staff edit plain text files; a typo in a field name or a bad `status` value fails the build instead of silently breaking a page.                         |
| **Tailwind CSS v4**                       | Utility classes keep styling next to the markup, so there is no growing stylesheet to untangle. Brand colours and type scale are defined once as design tokens in `src/styles/global.css`, and unused CSS is stripped at build time.                                                   |
| **TypeScript** (`astro/tsconfigs/strict`) | Strict typing on content schemas and component props catches a missing programme field or mistyped prop during development rather than after deployment.                                                                                                                               |
| **lucide-static**                         | Icons are inlined as SVG at build time — no icon font, no runtime request, no third-party script on the page.                                                                                                                                                                          |
| **Web3Forms**                             | The contact and registration forms need to deliver email, which static hosting cannot do. Web3Forms handles submissions over HTTPS without a backend, a database, or any personal data stored in this repository.                                                                      |
| **@astrojs/sitemap**                      | Generates `sitemap-index.xml` at build time for search engines, with no manual upkeep as pages are added.                                                                                                                                                                              |
| **Prettier + EditorConfig**               | One formatting standard, enforced by `npm run format:check`, so contributions stay consistent and diffs show real changes rather than whitespace.                                                                                                                                      |
| **Vercel**                                | Free static hosting with automatic HTTPS, a global CDN, and a rebuild on every push to `main`. Any static host works equally well, since the build output is just files.                                                                                                               |

## Security

The site has no backend, no database, no user accounts, and no server-side code at runtime — it
is a folder of static files behind a CDN. That removes most of the usual attack surface
(SQL injection, authentication bypass, server compromise) by design rather than by mitigation.
What remains is handled as follows.

- **No secrets in the repository.** The site is fully static, so nothing in this codebase is
  confidential at runtime. The Web3Forms `access_key` in the form markup is a public submission
  key by design — it only lets a form post a message to the owner's inbox and grants no access to
  past submissions or account settings. The key is rate-limited by Web3Forms and can be rotated
  from their dashboard if abused. No API tokens, database credentials, or private keys exist in
  this project.
- **No personal data stored.** Form submissions travel over HTTPS directly from the visitor's
  browser to Web3Forms and are delivered by email. Nothing is written to this site, a database, or
  browser storage, which keeps the project clear of data-retention obligations.
- **Spam handling.** Both forms include a hidden `botcheck` honeypot field. Web3Forms rejects any
  submission that fills it, blocking most automated spam without a CAPTCHA that would hurt
  accessibility and slow the page.
- **Input handling.** All visitor input leaves the page immediately as a form POST and is never
  rendered back into the site, so there is no stored-XSS path. Pages are built from trusted
  repository content only; nothing is generated from URL parameters or visitor input.
- **Controlled raw HTML.** `set:html` is used in exactly one place, `src/components/Icon.astro`,
  to inline Lucide SVG files read from `node_modules` at build time. The source is a pinned
  dependency, not user or network input. Astro escapes every other interpolation by default, and
  this remains the one exception to review.
- **Minimal third-party code.** No analytics, tag managers, trackers, or hosted scripts are
  loaded. The only external request a visitor's browser makes is the form POST to Web3Forms on
  submit. Fewer third parties means fewer ways to inject code into the page.
- **Dependency hygiene.** Dependencies are pinned in `package-lock.json`, and the set is
  deliberately small. All are build-time only — none ship to the browser — so a vulnerability in
  one cannot reach visitors directly. Run `npm audit` before handover and after any dependency
  update.
- **Transport security.** Vercel serves the site over HTTPS with HSTS and redirects HTTP
  automatically. Web3Forms accepts submissions over HTTPS only, so form data is encrypted in
  transit.
- **Outbound links.** External links open with `rel="noopener noreferrer"`, preventing the target
  page from reaching back into this one via `window.opener`.

### Before handover

- Replace the shared Web3Forms access key with one from AfriYouth's own account, in both
  `src/pages/contact.astro` and `src/pages/programs/[slug]/register.astro`, so submissions reach
  an inbox AfriYouth controls.
- Run `npm audit` and update anything flagged.
- Restrict write access to the GitHub repository to trusted maintainers; a push to `main`
  deploys straight to production.

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

The site is a static build with no backend. Deploy the `dist/` output to any static host.
For Vercel: import the GitHub repository, leave the build settings at their Astro defaults
(`npm run build`, output directory `dist`), and deploy.

## Recommended editor setup

Opening this project in VS Code will prompt to install the recommended extensions
(`.vscode/extensions.json`): Astro language support, Tailwind CSS IntelliSense, Prettier, and
EditorConfig support. Installing these gives accurate autocomplete and keeps formatting consistent
with the rest of the codebase.
