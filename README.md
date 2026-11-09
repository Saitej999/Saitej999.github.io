# Saitej Sagi — Java Full Stack Developer portfolio

A responsive, dependency-free HTML/CSS/JavaScript portfolio for Saitej Sagi. It highlights enterprise Java work, Spring Boot, microservices, Kafka, AWS, Angular, and an illustrative banking transaction architecture. No API keys, database, analytics, external fonts, or build step are required.

The website source is MIT licensed. Personal career content belongs to Saitej; replace it with your own information when reusing the design.

## Preview locally

Open `dist/index.html` in a browser, or run `python -m http.server 8080 --directory dist` from this repository and visit http://localhost:8080.

## Maintain the project cards

The cards in `dist/projects.js` describe source-reviewed public repositories: FinFlow Banking Platform, Ecom, and Wayfinder Travel Planner. To add another project, add an object inside `window.PORTFOLIO_PROJECTS = [...]`:

```js
{
  title: "Your verified project title",
  category: "Java & Spring Boot",
  status: "Prototype",
  description: "What the implemented application does.",
  features: ["A verified feature", "Another verified feature"],
  tags: ["Java", "Spring Boot"],
  repo: "https://github.com/Saitej999/YOUR-REPOSITORY",
  // Optional: demo, writeup, image, imageAlt, featured.
}
```

Supported categories are **Java & Spring Boot**, **Banking & Fintech**, **Full Stack**, **Cloud & DevOps**, and **Other**. Filters appear only for categories with entries. Verify every feature, tag, screenshot, status, and demo URL before adding it. Do not add employer or client source code as a public project.

## GitHub Pages deployment

The existing workflow in `.github/workflows/pages.yml` publishes only `dist/` from `main`. In repository Settings → Pages → Build and deployment, select **GitHub Actions**. A repository named `Saitej999.github.io` uses the root URL `https://saitej999.github.io/`; another repository name uses a project path. No custom domain or build tool is needed.

## Content updates

- Branding, experience, education, contact links, and metadata: `dist/index.html`
- Personal project entries: `dist/projects.js`
- Layout and responsive styles: `dist/styles.css`
- Dark developer theme accents: `dist/developer.css`
- Project filters, architecture detail panel, and active navigation: `dist/app.js`
- Resume download: `dist/assets/Saitej-Resume.pdf`

The Java Full Stack Developer resume is available at `dist/assets/Saitej-Resume.pdf`. The source PDF was copied byte for byte, without changing its contents.

The architecture diagram is a generic educational example, not a diagram of an employer's internal system. Professional experience is described separately from personal projects.
