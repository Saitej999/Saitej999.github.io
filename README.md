# Saitej S — personal portfolio

A responsive, dependency-free HTML/CSS/JavaScript portfolio. No API keys,
database, subscriptions, analytics, external fonts, or build step required.
The website source is MIT licensed. Personal resume content describes Saitej;
replace it with your own information when reusing the design.

## Preview locally

Open `dist/index.html` in your browser, or run `python -m http.server 8080 --directory dist`
and visit http://localhost:8080.

## Add a completed project

Edit `dist/projects.js`. Add an object inside `window.PORTFOLIO_PROJECTS = [...]`:

```js
{
  title: "Your project title",
  category: "RAG",
  status: "Completed",
  description: "The problem you solved and what your application does.",
  result: "A measured result, including dataset and measurement conditions.",
  tags: ["Python", "FastAPI", "RAG"],
  repo: "https://github.com/Saitej999/YOUR-REPOSITORY",
  // Optional: omit fields you do not need.
  // demo: "https://your-demo.example",
  // writeup: "https://your-case-study.example",
  // image: "assets/project-screenshot.png",
  // imageAlt: "Describe what the screenshot shows"
}
```

Separate multiple objects with commas. Project cards and category filters
appear automatically. No completed projects are invented or prepopulated.
The roadmap text on the page is explicitly labeled as future exploration.

## Free GitHub Pages deployment

1. Create a **public** GitHub repository, such as `saitej-portfolio`.
2. Upload this folder's contents, including `.github`, to its `main` branch.
3. Under repository Settings → Pages → Build and deployment, select **GitHub Actions**.
4. Run the “Deploy portfolio to GitHub Pages” workflow from the Actions tab.
5. Subsequent commits to `main` automatically update the site.

For that repository name, the expected URL is
`https://saitej999.github.io/saitej-portfolio/` once deployment succeeds.
For a root URL, name the repository `Saitej999.github.io` instead.
No custom domain is necessary. The supplied workflow deploys only `dist/`.
`.openai/hosting.json` is for the separate Sites preview and is not needed by GitHub Pages.

## Content updates

- Main copy, experience, education, social links: `dist/index.html`
- Project entries: `dist/projects.js`
- Layout primitives: `dist/styles.css`; dark developer theme: `dist/developer.css`
- Project rendering and filtering: `dist/app.js`
- Resume: replace `dist/assets/Saitej-Resume.pdf`

The resume download includes the contact details from the supplied original.
Professional experience is summarized from the resume; client work is not
presented as independently published open-source code. No project hosting
or AI inference service is required by this portfolio.
