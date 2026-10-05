# Jastin Dumuk (jasdumuk) — Personal Portfolio & Interactive Site

A bold, high-contrast, interactive portfolio built with modern web standards, featuring:
- **Color Palette**: Bright Light Teal (`#bbf7ee`), Obsidian Black (`#0a0c10`), Electric Green (`#00e676`), and Pure Snow White (`#ffffff`).
- **Typography**: The Futura geometric type system in all variations (Ultra Bold 900, Bold 700 tracked caps, Medium 500 body, Light 300 subtitles, Oblique Italics, and Outline stroke effects).
- **Aesthetic**: Neo-Brutalist editorial layout with crisp 3.5px solid black borders, hard tactile drop-shadows, and smooth micro-interactions.
- **Interactivity**:
  - Web Audio API retro quack sound generator (zero external MP3 assets required).
  - "The Duck Lab" mascot companion featuring `images/erm duck.png` with speech bubble generator and dance physics.
  - Filterable project grid with interactive detail modal dialogues.
  - Infinite typographic marquee tickers.
  - One-click copy email buttons with floating toast alerts.
  - Reading progress bar and mobile navigation drawer.

---

## File Structure

```text
jasdumuk/
├── index.html        # Semantic HTML5 structure & accessibility landmarks
├── style.css         # Neo-brutalist styling & Futura typography design system
├── script.js         # Vanilla JS: Audio synthesis, modals, filters, and mascot
├── README.md         # Documentation & deployment guide
└── images/
    └── erm duck.png  # The official mascot image
```

---

## How to Deploy to GitHub Pages

Your repository is hosted at: `https://github.com/jastincdumuk7/jasdumuk`  
Your live site URL is: `https://jastincdumuk7.github.io/jasdumuk/`

### Option 1: Using Git via Terminal

Navigate to your local repository clone or initialize git inside this folder:

```bash
# If working directly in this directory:
git add index.html style.css script.js
git commit -m "feat: complete bold interactive portfolio with light teal & Futura"
git push origin main
```

### Option 2: Uploading Directly on GitHub Web UI

1. Go to [github.com/jastincdumuk7/jasdumuk](https://github.com/jastincdumuk7/jasdumuk).
2. Open or replace `index.html` and `style.css` with the updated files.
3. Add `script.js` to the root folder.
4. Commit the changes to `main`.
5. GitHub Pages will automatically build and publish the changes within 1–2 minutes!

---

## Design System Tokens

| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg-teal-canvas` | `#bbf7ee` | Primary bright light-teal background |
| `--teal-neon` | `#00f5cc` | High-voltage neon teal hover & badge accent |
| `--ink-black` | `#0a0c10` | Deep pitch black typography, borders & shadows |
| `--accent-green` | `#00e676` | Electric green indicator lights & buttons |
| `--pure-white` | `#ffffff` | Pure white cards and high-contrast insets |
| `--font-futura` | `'Futura', 'Jost', sans-serif` | Geometric sans-serif scale (100–900) |
