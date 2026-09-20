# Jess Boyd — portfolio

A static site: no build step, no dependencies. Every section has its own CSS file, and the sections that have interactions have their own JS file.

```
index.html                 all page content, in clearly marked section blocks
css/
  base.css                 colors, fonts, page reset, layout helpers (edit colors here)
  effects.css              shared hand-drawn marks, notes, highlighter, scroll-reveal
  dog.css                  the golden retriever illustration + tail wag
  opening.css              opening animation
  header.css               header + navigation
  hero.css                 1. Hero
  about.css                2. A Little About Me (+ Polaroids)
  common-thread.css        3. The Common Thread quote
  story.css                4. How I Got Here
  experience.css           5. Experience (folders)
  education.css            6. Education + Skills
  connect.css              7. Connect + footer
js/
  data/
    experience.js          your roles, exact resume text  <- edit content here
    images.js              image file paths
    signature-path.js      pen path for the signature animation (generated, don't edit)
    pencil.js              pencil size/tip data (don't edit)
  core.js                  shared helpers (scroll + page-ready hooks)
  effects.js               notes, arrows, reveal on scroll
  header.js  hero.js  about.js  common-thread.js  experience.js  connect.js
  opening.js               opening sequence
  init.js                  runs last
assets/img/                signature, dog layers, pencil, photos, favicon
```

Each section in `index.html` has a banner comment naming its CSS and JS files, and each CSS/JS file starts with a note saying what it controls. Responsive rules (`@media`) live at the bottom of the same file as the section they change, so you can edit one section without touching the others.

## Where to edit what
| I want to change… | Edit |
|---|---|
| Colors, fonts | top of `css/base.css` |
| Hero text, descriptors | `index.html` → HERO block |
| Hero dog timing / position | `js/hero.js` (`tyFor`), `css/hero.css` (`.peek`) |
| About paragraph, facts, photo captions | `index.html` → ABOUT block |
| Photos | replace files in `assets/img/` (keep names) |
| The common-thread quote | `index.html` → THE COMMON THREAD block |
| How I Got Here stages | `index.html` → STORY block |
| Experience roles and bullets | `js/data/experience.js` |
| Education, skills | `index.html` → EDUCATION / SKILLS blocks |
| Email, LinkedIn | `index.html` → CONNECT block |
| Adding a new section | add a block to `index.html`, a new `css/…css` file (add a `<link>`), and optionally a `js/…js` file (add a `<script>` before `opening.js`) |

## Preview
Open `index.html` in a browser. Fonts load from Google Fonts, so you need to be online.

## Opening animation
It plays on a visitor's first visit, then is skipped on repeat visits and for anyone who prefers reduced motion.
To see it again, add `?intro` to the address, e.g. `index.html?intro` or `https://yoursite.com/?intro`.

## Script order
The scripts are plain (not modules) so the site also works when you open `index.html` straight from a folder. Keep the order in `index.html`: data files, then `core.js`, then the sections, then `opening.js` and `init.js`. Shared helpers live on one object, `JB`.

## Publishing
Upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, or your domain's hosting). Keep the folder structure as is.
