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
  hero.css                 1. Hero (+ the dog on her ledge)
  about.css                2. A Little About Me (+ Polaroids)
  quote.css                3. Orange quote with yellow doodles
  experience.css           4. Work Experience (notebook + education sticky note)
  skills.css               5. Skills
  connect.css              6. Connect + footer
js/
  data/
    images.js              image file paths
    signature-path.js      pen path for the signature animation (generated, don't edit)
    pencil.js              pencil size/tip data (don't edit)
  core.js                  shared helpers (scroll + page-ready hooks)
  effects.js               notes, arrows, reveal on scroll
  header.js  hero.js  about.js  connect.js
  opening.js               opening sequence
  init.js                  runs last
assets/img/                signature, dog layers, pencil, photos, favicon
assets/Jess-Boyd-Resume.pdf   the file behind "Download Resume"
```

Each section in `index.html` has a banner comment naming its CSS and JS files, and each CSS/JS file starts with a note saying what it controls. Responsive rules (`@media`) live at the bottom of the same file as the section they change, so you can edit one section without touching the others.

## Where to edit what
| I want to change… | Edit |
|---|---|
| Colors, fonts | top of `css/base.css` |
| Hero text, descriptors | `index.html` → HERO block |
| Hero dog size / position | `css/hero.css` (`.peek`, `--dw`) |
| About paragraph, facts, photo captions | `index.html` → ABOUT block (Polaroid positions: `css/about.css`) |
| Photos | replace files in `assets/img/` (keep names) |
| The orange quote | `index.html` → THE QUOTE block |
| Work experience roles, education note | `index.html` → WORK EXPERIENCE block |
| Resume file | replace `assets/Jess-Boyd-Resume.pdf` (keep the name) |
| Skills | `index.html` → SKILLS block |
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
