# Jess Boyd — portfolio

A static site: no build step, no dependencies. Every section has its own CSS file, and the sections that have interactions have their own JS file.

```
index.html                 all page content, in clearly marked section blocks
links/index.html           the Linktree-style links page (yoursite.com/links/)
css/
  base.css                 colors, fonts, page reset, layout helpers (edit colors here)
  effects.css              shared hand-drawn marks, notes, highlighter, scroll-reveal
  dog.css                  the golden retriever illustration + tail wag
  opening.css              opening animation
  header.css               header + navigation
  hero.css                 1. Hero (+ the dog on her ledge)
  about.css                2. A Little About Me (+ Polaroids)
  quote.css                3. Orange quote with yellow doodles
  projects.css             4. Projects (the workspace: laptop, posts, brand guide, phone + scrolling headings)
  experience.css           5. Experience (notebook + education sticky note)
  skills.css               6. Skills
  connect.css              7. Connect + footer
  links.css                the links page
js/
  data/
    links.js               every link on the links page: title, URL, look, order, visibility  <- edit here
    images.js              image file paths
    signature-path.js      pen path for the signature animation (generated, don't edit)
    pencil.js              pencil size/tip data (don't edit)
  core.js                  shared helpers (scroll + page-ready hooks)
  effects.js               notes, arrows, reveal on scroll
  header.js  hero.js  about.js  connect.js
  links-render.js  links.js   build the link cards from data/links.js; the dog's wag
  opening.js               opening sequence
  init.js                  runs last
assets/img/                signature, dog layers, pencil, photos, favicon (dog-peek-*.png are used by the links page; the hero dog is dog-peek.png)
assets/img/projects/       the four project images (Kajabi screen, 3 social posts, LDR guide, LEGO phone)
assets/Jess-Boyd-Resume.pdf   the file behind "Download Resume"
```

Each section in `index.html` has a banner comment naming its CSS and JS files, and each CSS/JS file starts with a note saying what it controls. Responsive rules (`@media`) live at the bottom of the same file as the section they change, so you can edit one section without touching the others.

## Where to edit what
| I want to change… | Edit |
|---|---|
| Colors, fonts | top of `css/base.css` |
| Hero text, descriptors | `index.html` → HERO block |
| Hero dog (size, position, wag) | `css/hero.css` (`.peek`, `--dw`); swap `assets/img/dog-peek.png` |
| Hero supporting line | `index.html` → HERO block |
| About heading, paragraph, facts, photo captions | `index.html` → ABOUT block (Polaroid positions: `css/about.css`) |
| Photos | replace files in `assets/img/` (keep names) |
| The orange quote | `index.html` → THE QUOTE block |
| Experience roles, education note | `index.html` → EXPERIENCE block |
| Resume file | replace `assets/Jess-Boyd-Resume.pdf` (keep the name) |
| Projects: names, tags, descriptions | `index.html` → PROJECTS block (each project is one `<article>`) |
| Projects: image files | replace the files in `assets/img/projects/` (keep the names) |
| Projects: where things sit on desktop | `css/projects.css` (the `@media (min-width: 1000px)` block) |
| Skills | `index.html` → SKILLS block |
| Links page: URLs, titles, order, hide a card | `js/data/links.js` (the header text is in `links/index.html`) |
| Email, LinkedIn | `index.html` → CONNECT block |
| Adding a new section | add a block to `index.html`, a new `css/…css` file (add a `<link>`), and optionally a `js/…js` file (add a `<script>` before `opening.js`) |

## Preview
Open `index.html` in a browser. Fonts load from Google Fonts, so you need to be online.

## Opening animation
It plays on a visitor's first visit, then is skipped on repeat visits and for anyone who prefers reduced motion.
To see it again, add `?intro` to the address, e.g. `index.html?intro` or `https://yoursite.com/?intro`.

## Script order
The scripts are plain (not modules) so the site also works when you open `index.html` straight from a folder. Keep the order in `index.html`: data files, then `core.js`, then the sections, then `opening.js` and `init.js`. Shared helpers live on one object, `JB`.

## Search and sharing tags
`index.html` has a title (kept to 60 characters), description, Open Graph / Twitter tags, a `Person` structured-data block, `robots.txt` at the root, a canonical link, and a share preview image.

The preview picture (`assets/img/og-image.jpg`, 1200x630) is what shows up when the link is pasted into iMessage, Slack, Teams, LinkedIn, etc. It's built from the same purple hero background, the hand-drawn dog, the signature and the headline. If the site ever moves to a different address, update `og:url`, `og:image`, `twitter:image` and the canonical link in `index.html` to match — sharing apps also cache the preview for a while, so a changed image can take time to show up everywhere.

## Publishing
Upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, or your domain's hosting). Keep the folder structure as is.
