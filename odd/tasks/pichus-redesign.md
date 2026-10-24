# Feature: pichus-redesign — Premium redesign of the PICHUS catalog

- Project: catalgo  pichus (D:\Pichu pets\Catalgo  Pichus)
- Created: 2026-10-24
- Route: **delegated direct (one writer)** — writer trigger fired: implementation touches 3 non-trivial files (`index.html`, `css/style.css`, new `js/main.js`). Mapping/reading done inline (2 source files) before delegation.
- Delivery: work-unit commits on branch `main` (pushed to origin). Rollback = git history (originals preserved in `97d4d9c:_backup/`; `_backup/` and `.atl/` removed from disk+repo at user request 2026-10-24).

## Objective

Transform the static PICHUS catalog (vanilla HTML/CSS) into a premium, responsive, accessible brand experience that uses all 12 existing images and preserves all commercial information (products, prices, colors).

## Problem

- Palette is pink (`#e96c8a`) but the real brand (Logo_2.png + fondos) is white/lila/morado — identity mismatch.
- 4 photos unused: `collar-happy.jpg`, `collares-mano.jpg`, `IMG_7786.JPG`, `mino.png`.
- Dead links: `href="#"` on all WhatsApp/Instagram/Facebook buttons.
- No mobile menu; color swatches have no names; plain table; no SEO/OG; no lazy loading; no CLS protection; no focus states.

## Why

User brief (2026-10-24): implement the redesign directly in code and verify it; real photos only; functional contact buttons; mobile-first audience arriving from social media.

## Scope (authorized)

- Modify `index.html`, `css/style.css`; create `js/main.js`.
- Image renames to URL-safe names ALREADY DONE (6 renames, mapping below). No photo deletions.
- No frameworks, no build tools, no new dependencies (keep Poppins + Font Awesome).

## Constraints (hard)

- Prices byte-faithful: XS $20, S $21, M $23, L $25, XL $30. Products: Collar Personalizado desde $20, Collar Gatito $12, Llavero $5, Porta Bolsas $15.
- Colors: exactly negro, café, vino, rosa, lila (named chips, no extras).
- No invented claims, measurements, certifications, or contact links.
- Contact wiring: `PICHUS_CONTACT` config in `js/main.js`; WhatsApp buttons fall back to `#contacto` when the number is empty; unconfigured Instagram/Facebook stay hidden.
- UI copy: Spanish (project language); comments: neutral Spanish; identifiers: English.
- A11y: keyboard nav, focus-visible, aria on icon buttons, alt text, prefers-reduced-motion.
- Keep the 3-step purchase flow honest (no payment/shipping/tracking claims).
- "Más vendido"/"Nuevo" badges: keep (pre-existing content) and flag for user confirmation — not invented by this change.

## Image rename mapping (old -> new)

| Old | New |
| --- | --- |
| fondo pichus.png | fondo-pichus.png |
| fondo mino.png | fondo-mino.png |
| collar de gato.png | collar-gato.png |
| pooppy bags.png | pooppy-bags.png |
| WhatsApp Image 2026-04-09 at 11.18.54 AM (1).jpeg | collar-happy.jpg |
| WhatsApp Image 2026-04-09 at 11.18.58 AM (1).jpeg | collares-mano.jpg |

## Image inventory (dimensions verified with System.Drawing)

| File | Dimensions | Purpose |
| --- | --- | --- |
| Logo_2.png | 499x500 | navbar + footer logo |
| fondo-pichus.png | 1536x1024 | hero background (schnauzer + baked PICHUS logo at left) |
| fondo-mino.png | 1536x1024 | about banner background |
| collar.png | 1122x1402 | product card: Collar Personalizado (lila, tag "Winnie") |
| collar-gato.png | 1254x1254 | product card: Collar Gatito (vino, tag "Trapito") |
| llavero.png | 1086x1448 | product card: Llavero (paw shape) |
| pooppy-bags.png | 1536x1024 | product card: Porta Bolsas (café) |
| collar-happy.jpg | 960x1280 | personalization strip / gallery (black collar, "Happy" tag) |
| collares-mano.jpg | 900x1600 | gallery only — NOT a color catalog (shows green/yellow, not confirmed colors) |
| IMG_7786.JPG | 2400x1600 | gallery lifestyle (person + cat wearing collar) |
| mino.png | 2400x1600 | gallery (cat Mino, holographic background) |
| qr.png | 1000x1000 | contact QR (preserve) |

## Design direction (verified against Logo_2.png + both fondos)

Brand surface = white + lila/morado. Drop the pink theme.

Tokens: `--lilac-900 #3f2d63` (headings), `--lilac-700 #6c4f9e` (primary), `--lilac-500 #9b7fd4`, `--lilac-300 #c9b6e8`, `--lilac-50 #f6f1fc` (bg tint), `--surface #ffffff`, `--text #2e2440`, `--muted #6b6280`, accent `--caramel #b9714a` (taken from the real leather name tags; use only on prices/small details). Plus radius/shadow/spacing variables. Poppins kept with system fallbacks.

## Tasks

- [x] T1 (delegated writer): CSS foundation — tokens, reset, typography, organized section scaffolding (style.css, 13 commented sections, lilac tokens, 0 `url()` refs)
- [x] T2 (delegated writer): Header + accessible mobile menu (hamburger `#nav-toggle`, Escape, close on select, aria, focus return on Escape; JS matchMedia 900px synced with CSS)
- [x] T3 (delegated writer): Hero redesign (CTA "Ver Catálogo" + WhatsApp secondary CTA; mobile: in-flow banner + text below (dog never covered); desktop ≥900px: absolute bg + left light panel `rgba(255,255,255,.93)` + blur)
- [x] T4 (delegated writer): About + lifestyle gallery using IMG_7786.JPG, mino.png, collares-mano.jpg, collar-happy.jpg (gallery-only for collares-mano; about: fondo-mino with right-framed panel ≥900px)
- [x] T5 (delegated writer): Product cards (uniform `.card-image`, `object-fit: contain` studio photos, prices visible, WhatsApp CTA data-wa, alt+width+height+lazy on every img)
- [x] T6 (delegated writer): Tallas (exact prices XS..XL; mobile: card rows <640px, no h-scroll at 320px) + Colores (exactly 5 named chips: Negro/Café/Vino/Rosa/Lila)
- [x] T7 (delegated writer): Cómo comprar (3 honest steps) + Contacto/QR/footer + PICHUS_CONTACT config wiring (WhatsApp → wa.me or #contacto fallback; unconfigured social hidden)
- [x] T8 (delegated writer): SEO/OG/Twitter Card + theme-color + a11y (skip link, landmarks, focus-visible) + prefers-reduced-motion + responsive 320..1920 (grids 1→2@560→3/4@900)
- [x] T9 (verify): structural checks + honest report (see Progress / evidence)

## Acceptance criteria

1. All 12 images used (or explicitly justified), all local paths resolve.
2. Zero `href="#"` left; WhatsApp/social only via config or `#contacto` fallback.
3. Prices/colors/products faithful to original content.
4. No horizontal scroll at 320/360/390/430/768/1024/1366/1920 (manual checklist — no automated browser in env).
5. Mobile menu works (open/close/Escape/link select), keyboard reachable.
6. Text contrast AA; visible focus; alt on every img.
7. Document parses; link/anchor integrity check passes.
8. Residual risks documented, not hidden.

## Applicable checks

- `node --check js/main.js`.
- Link/anchor/image integrity scan (node script — `python` is NOT installed on this machine; `python` is a WindowsApps stub exiting 9009).
- grep-equivalent: `href="#"` must be 0; old image filenames with spaces must be 0; all 12 img names referenced.
- Manual browser checklist at the 8 widths (documented for the user — env has node but no headless browser).

## Progress / evidence

- [x] R0 exploration: index.html + css/style.css read; all 12 images inspected visually.
- [x] R1 backups: `_backup/index.original.html`, `_backup/style.original.css`.
- [x] R2 image renames: 6 files URL-safe (mapping above).
- [x] Post-launch fixes (user feedback): card-image background white (no color cut), size/price table always a real table with aligned Talla/Precio headers, gallery converted to uniform 1:1 grid + vanilla lightbox (click/Enter opens, ×/Escape/backdrop closes, focus restored).
- [x] Git: `.git` unlocked via `safe.directory` (user authorized); root commit `97d4d9c` "feat: redesign PICHUS catalog with responsive lila theme, lightbox gallery and a11y" — 22 files, 2845 insertions. Working tree clean. No remote configured.
- [x] New discovery at commit time: `img/` now holds 16 photos — user added `dani_collar.jpg`, `minno_Amarillo.jpg`, `nina.1.1.jpg`, `sannie-blue.jpeg` (not yet referenced by the site).
- [x] T1–T8 implemented by three bounded delegated writers (transport note: one very large single-writer prompt twice dropped the socket; splitting into per-file writers succeeded).
  - `js/main.js` (3776 bytes): PICHUS_CONTACT config, wa.me builder, data-wa/data-social wiring, mobile menu (is-open/aria-expanded/Escape/matchMedia 900px), reveal w/ reduced-motion respect. `node --check` OK.
  - `index.html` (16994 bytes, 495 lines): full section set, 12/12 images, 0 href="#", alt+width+height everywhere, OG/Twitter/theme-color, skip link, data-wa x8, data-social x2, reveal x4.
  - `css/style.css` (27613 bytes, 1302 lines): lilac tokens, 0 stale space-named refs, 0 url() refs, 7 @media blocks, overflow-x hidden, braces balanced, prefers-reduced-motion, hero mobile-first (in-flow banner) / desktop overlay panels.
- [x] T9 verification (parent spot check + integration script):
  - `node --check js/main.js` → OK.
  - Integration check: 0 href="#", 12 imgs, 1 h1, 0 altless, 0 widthless, 0 old names, all ids present, all 12 image names used, catalog text exact (Desde $20/$12/$5/$15, XS..XL + $21/$23/$25/$30), 5 colors named, lilac present, pink #e96c8a gone, PICHUS_CONTACT + #contacto fallback present, CSS braces balanced.
  - Head/meta check: main.js linked, theme-color 6c4f9e, og:image + twitter:card, skip link, lang=es, aria-expanded, steps present.
  - Residual false positive resolved: JS handles `data-social` generically via `getAttribute("data-social")` (verified by reading main.js lines 28–41).
- [x] Native review (RDD on): `gentle-ai review assess` returned `risk: high / unassessable` — repo has a `.git` skeleton owned by a different Windows SID ("dubious ownership"); `review status` preflight also failed on the same cause. No git config changes made (user must decide). Verification of record = writer reports + parent integration checks above.

## Data pending (user input, not blockers)

- `PICHUS_CONTACT.whatsapp` (digits with country code), `.instagram`, `.facebook` in `js/main.js`.
- Optional: real footer multi-column layout needs an index.html edit (current footer is a single centered line per original content).
- Optional: git repo ownership fix (safe.directory) if the user wants native review/commits later.

## Next step

Deliver final report in Spanish; user fills PICHUS_CONTACT and runs the manual browser checklist at 320/360/390/430/768/1024/1366/1920.
