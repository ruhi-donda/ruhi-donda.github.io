# ruhi-donda.github.io

My personal portfolio + blog — a space-themed static site with two "worlds":
a concise **/recruiter** view and an immersive **/explore** view (blog + hobbies
gallery). Built with [Astro](https://astro.build), Tailwind CSS, and a single
React island for the gallery. Deployed automatically to GitHub Pages.

**Live:** https://ruhi-donda.github.io

---

## Run locally

```sh
npm install
npm run dev        # http://localhost:4321
```

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start the dev server at `localhost:4321`   |
| `npm run build`   | Build the production site to `./dist/`     |
| `npm run preview` | Preview the production build locally       |

You need [Node.js](https://nodejs.org) 18+ (developed on Node 22).

---

## Editing your info

All personal details — name, tagline, links, email, education, and skills —
live in one file: [`src/config.ts`](src/config.ts). Edit there and every page
updates.

Drop your real résumé in at `public/resume.pdf` (replacing the placeholder).

---

## Adding content

Everything is Markdown. To add something, add a file — no code required. You can
do this **right from GitHub's web UI**: browse to the folder, click **Add file →
Create new file**, paste the frontmatter, and commit. The site rebuilds and
deploys itself.

### ✍️ Add a blog post

Create a file in [`src/content/blog/`](src/content/blog/), e.g.
`my-post.md`. The filename becomes the URL: `/blog/my-post`.

```markdown
---
title: My post title
description: One-line summary shown in cards and social previews.
date: 2026-07-09
tags: [space, ai]
# cover: ../../assets/blog/my-cover.jpg   # optional
# coverAlt: Description of the cover image
# draft: true                              # hide from the site while writing
---

Write your post here in **Markdown**.
```

- Posts are sorted by `date` (newest first).
- `tags` power the filter on the [`/blog`](https://ruhi-donda.github.io/blog) page.
- If you omit `cover`, the card shows an on-theme gradient — no image needed.
- Set `draft: true` to keep a post out of the build until it's ready.

### 🚀 Add a project

Create a file in [`src/content/projects/`](src/content/projects/), e.g.
`my-project.md`. Projects show as cards on the **/recruiter** page.

```markdown
---
title: Project name
summary: One or two lines describing what it is and why it's interesting.
stack: [Python, React, Supabase]
repo: https://github.com/ruhi-donda/my-project   # optional
demo: https://my-demo.example.com                # optional
order: 1        # lower numbers show first
featured: true  # show on the recruiter page
writeup: true   # use for private projects — shows a "Write-up" badge, no link
---

Optional longer description in Markdown.
```

### 🎨 Add hobby media (image or video)

Create a file in [`src/content/hobbies/`](src/content/hobbies/). Categories:
`blender`, `art`, `photography`, `gardening`.

**Image** — put the file in `src/assets/hobbies/` first, then:

```markdown
---
title: Sunset render
category: blender
type: image
image: ../../assets/hobbies/sunset.jpg
alt: A sunset scene rendered in Blender
date: 2026-07-01
order: 1
---
```

**Video** — no file needed, just an embed ID (keeps the repo light):

```markdown
---
title: Timelapse
category: photography
type: video
provider: youtube      # or: vimeo
videoId: YE7VzlLtp-4    # the id from the video URL
date: 2026-07-01
---
```

Videos are **click-to-load** — the player only loads when a visitor opens it,
so the page stays fast. Images are optimized automatically (see below).

---

## Images are optimized for you

Any image referenced from a content collection (via `src/assets/…`) is run
through Astro's built-in image tooling at build time — resized, converted to
WebP, and served responsively. Just drop reasonably-sized source images into
`src/assets/` and reference them; don't commit huge files, and **never commit
raw video** — embed it instead.

---

## How the landing gate works

The home page (`/`) asks visitors to pick a view. The choice is saved to
`localStorage`, so returning visitors skip straight to their last view. Both
`/recruiter` and `/explore` are always directly linkable and crawlable — the
gate never hides content. Visit `/?choose` to force the gate and re-pick.

---

## Deployment

Every push to `main` triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
site and deploys it to GitHub Pages. No manual step. Because this is a **user
site** (`ruhi-donda.github.io`), Astro's `site` is set to the root domain and
**no `base` path** is configured — don't add one, it breaks routing.

---

## Accessibility & performance

- Respects `prefers-reduced-motion` — the starfield and all scroll animations
  turn off for visitors who ask for less motion.
- Mobile-first, responsive, dark deep-space theme.
- SEO + Open Graph tags on every page; sitemap and RSS (`/rss.xml`) included.

---

## Optional: browser-based editing (not installed)

Adding posts via GitHub's web UI already works today. If you later want a
friendlier visual editor in the browser, you could add a git-based CMS like
[Decap CMS](https://decapcms.org) or [TinaCMS](https://tina.io) — both work with
a static Astro site and free hosting. This is an optional add-on; the site is
fully functional without it.
