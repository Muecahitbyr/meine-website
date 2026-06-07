# BAYAR-SOLUTIONS — Frontend Design System

This skill defines the complete visual language for the BAYAR-SOLUTIONS website.
Apply every rule here when implementing or modifying any UI in this project.
If a rule conflicts with existing code, the rule wins — update the code.

---

## Brand Identity

**Company:** BAYAR-SOLUTIONS — solo freelancer offering web, app and mobile development for German SMBs.
**Audience:** German business owners and decision-makers. Conservative enough to trust, modern enough to impress.
**Tone:** Confident, direct, professional. Not playful, not corporate, not generic.
**Reference feel:** Celonis, N26, Personio, Vercel — restrained premium, not flashy.

---

## Color System

All colors must be defined as MUI theme tokens. Never hardcode hex values in component `sx` props — use `theme.palette.*` or the CSS variables below.

### Palette

```
Brand (Teal):
  primary.main:   #1DB8AA   ← mature teal, more confident than #3dd5c7
  primary.dark:   #169E92
  primary.light:  #4ECFC3
  primary.contrastText: #0C1117  ← dark text on teal bg

Background:
  background.default: #F7F9F9   ← slightly cool off-white, not pure white
  background.paper:   #FFFFFF

Surfaces (for differentiation):
  surface.subtle:  #F0F4F4   ← use for zebra/alt sections
  surface.raised:  #FFFFFF

Text:
  text.primary:    #0C1117   ← near-black with slight warmth
  text.secondary:  #4B5563   ← confident mid-grey
  text.disabled:   #9CA3AF

Border:
  divider: rgba(0,0,0,0.08)   ← single token for all borders
  Strong border (rare): rgba(0,0,0,0.14)

Status:
  success: #16A34A
  error:   #DC2626
  warning: #D97706
```

### Rules

- Background should be `#F7F9F9`, not `#f0fcfb` — the current teal-tinted background looks unfinished
- Never use `alpha("#fff", 0.06)` glass cards as the primary card style — reserve for overlays only
- Primary brand color appears on: active nav links, CTA buttons, section title underlines, icon backgrounds, chip borders
- Do not use primary color as a section background or large fill — it must remain an accent

---

## Typography

**Font:** Inter (already loaded). No fallback stack changes needed.

### Scale

```
Role            Size   Line-height  Weight  Usage
──────────────────────────────────────────────────────
hero            64px   1.00         800     Hero h1 (desktop)
hero-mobile     40px   1.05         800     Hero h1 (mobile)
h2-section      44px   1.10         800     Section titles (desktop)
h2-mobile       32px   1.15         800     Section titles (mobile)
h3-card         20px   1.30         700     Card titles
h4-label        16px   1.40         700     Labels, stats
body-lead       17px   1.60         400     Hero subtitle, intros
body            15px   1.65         400     Default body text
body-sm         13px   1.57         400     Secondary text, card descriptions
caption         11px   1.50         500     Overlines, helper text
overline        11px   1.50         700     Section badges (letterSpacing: 1.5px, uppercase)
button          14px   1.00         700     All buttons (no textTransform)
```

### Rules

- **Never use fontWeight above 800.** Current code uses 900 and 950 excessively — it makes everything look heavy.
- `h1`, `h2` get `letterSpacing: -1.5px` and `-0.8px` respectively
- Body text is `15px`, not `16px` — keeps the layout breathing at tighter line lengths
- Overline badges use uppercase + `letterSpacing: 1.5px` + brand color, max 14 chars
- Card description text is `13px` — never truncate with `-webkit-line-clamp` more than 4 lines

---

## Spacing System

Base unit: **8px**. Use MUI's `spacing()` which maps `spacing(1) = 8px`.

```
Token   px    MUI   Usage
────────────────────────────────────────────────────
space-1   8    1    Icon padding, chip internal
space-2  16    2    Gap between inline elements
space-3  24    3    Card internal padding (mobile)
space-4  32    4    Card internal padding (desktop), section column gap
space-5  40    5    Between stacked cards
space-6  48    6    Section header → content gap
space-8  64    8    Section vertical padding (mobile)
space-10 80   10    Section vertical padding (tablet)
space-12 96   12    Section vertical padding (desktop)
space-16 128  16    Hero top padding
```

Horizontal page padding: `Container maxWidth="lg"` (1200px) with MUI defaults.
Never manually set `px` on `<Container>` — let MUI handle responsive gutters.

---

## Border Radius

Current code overuses `borderRadius: 999` (pills) on almost everything. Use the correct radius per element type.

```
Element                           Radius
──────────────────────────────────────────
Service cards, About cards        12px  (borderRadius: 1.5 in MUI theme units)
Project (Apps) cards              10px
Hero info card                    16px
Screenshot/image thumbnails       10px
Dialogs / lightbox                16px
Icon wrappers (56x56)             10px
Chips / Tags                      6px   (NOT pill — tags are not CTAs)
Input fields                      8px
CTA buttons (primary/outlined)    9999px  ← only pills that stay
Language selector pill            9999px
Nav active indicator (dot/line)   2px
Section badge/overline            6px
```

**Global MUI theme:** `shape: { borderRadius: 10 }` — down from 18.

---

## Shadows

Current code uses `0 30px 90px` and `0 35px 90px` — these are too dramatic and make cards look like they float off-screen.

```
Level   Value                                               Usage
────────────────────────────────────────────────────────────────────────────
xs     0 1px 2px rgba(0,0,0,0.05)                          Borders only, rare
sm     0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)    Default cards
md     0 4px 16px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)   Hover state
lg     0 8px 32px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)  Modal, Drawer
xl     0 16px 48px rgba(0,0,0,0.09), 0 6px 18px rgba(0,0,0,0.04) Hero card only
```

Rule: a card at rest gets `sm`. On hover it gets `md`. Hero card gets `xl`. Nothing gets more.

---

## Component Patterns

### Cards (standard)

```jsx
<Paper
  elevation={0}
  sx={(t) => ({
    p: { xs: 3, md: 4 },
    borderRadius: 1.5,  // 12px at MUI base 8
    border: `1px solid ${t.palette.divider}`,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
    background: t.palette.background.paper,
    transition: 'box-shadow 200ms ease, transform 200ms ease',
    '&:hover': {
      boxShadow: '0 4px 16px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)',
      transform: 'translateY(-2px)',
    },
  })}
/>
```

Do **not** add `backdropFilter: blur()` to regular cards. Reserve blur for the sticky Header only.

### Icon Wrappers

```jsx
<Box sx={(t) => ({
  width: 48, height: 48,
  borderRadius: '10px',
  display: 'grid', placeItems: 'center',
  backgroundColor: alpha(t.palette.primary.main, 0.10),
  color: 'primary.main',
  fontSize: 22,
  flexShrink: 0,
})} />
```

### Primary CTA Button

```jsx
<Button
  variant="contained"
  sx={{
    borderRadius: 9999,
    px: 3, py: 1.5,
    fontWeight: 700,
    fontSize: 14,
    color: 'primary.contrastText',   // #0C1117
    boxShadow: 'none',
    '&:hover': { boxShadow: 'none', filter: 'brightness(1.06)' },
  }}
/>
```

Never add `boxShadow` to buttons — it cheapens them.

### Secondary / Outlined Button

```jsx
<Button
  variant="outlined"
  sx={{
    borderRadius: 9999,
    px: 3, py: 1.5,
    fontWeight: 700,
    fontSize: 14,
    borderColor: 'primary.main',
    color: 'primary.main',
    '&:hover': { backgroundColor: alpha(primary, 0.06), borderColor: 'primary.dark' },
  }}
/>
```

### Section Heading

```jsx
<Typography
  component="h2"
  sx={{ fontSize: { xs: 32, md: 44 }, fontWeight: 800, letterSpacing: -0.8 }}
/>
<Typography
  color="text.secondary"
  sx={{ mt: 1.5, maxWidth: 560, fontSize: { xs: 15, md: 17 }, lineHeight: 1.65 }}
/>
```

Section badge above heading (optional):
```jsx
<Typography
  variant="overline"
  sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1.5, fontSize: 11 }}
>
  LEISTUNGEN
</Typography>
```

### Chips / Tags

```jsx
<Chip
  label="SwiftUI"
  size="small"
  sx={{
    borderRadius: '6px',       // square-ish, not pill
    fontWeight: 600,
    fontSize: 12,
    height: 24,
    border: `1px solid ${t.palette.divider}`,
    backgroundColor: 'transparent',
    color: 'text.secondary',
  }}
/>
```

---

## Layout

### Section Wrapper

Each section:
- `minHeight` removed — sections should be as tall as their content, not forced to 100svh
- `py: { xs: 8, md: 12 }` (= 64px / 96px)
- Section heading `mb: { xs: 5, md: 6 }` (= 40px / 48px) before content

### Grid Layouts

```
2-column cards:     gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }
3-column cards:     gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }
Hero (text+card):   gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }
About layout:       gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' }
Contact layout:     gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }
Gap:                gap: { xs: 2, md: 3 } = 16px / 24px
```

### Header

- Height: 64px
- Background: `rgba(247,249,249,0.88)` + `backdropFilter: blur(12px)`
- Border bottom: `1px solid rgba(0,0,0,0.07)`
- Nav links: 14px, fontWeight 600, color `text.secondary`
- Active nav link: `color: primary.main`
- Brand mark: 15px, fontWeight 800, letterSpacing -0.3
- Mobile drawer: 280px wide, opens right

### Footer

- `py: 5` (40px)
- `borderTop: 1px solid divider`
- No background fill — transparent

---

## Animation

### Reveal (scroll-triggered enter)

```
opacity:   0 → 1
translateY: 12px → 0   (not 18–22px — too slow/dramatic)
blur: NONE               (blur on reveal is heavy and non-standard)
scale: NONE              (no scale on enter — it adds jitter)
duration:  450ms
delay:     0–80ms per stagger step (not 120–200ms — too slow)
easing:    cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Hover Transitions

All interactive elements:
```
transition: 150ms ease   (box-shadow, transform, color, border-color)
```

Button press (`:active`):
```
transform: scale(0.97)
transition: 80ms ease
```

### TiltCard

- Keep on desktop (it's a differentiator), disable on `pointer: coarse`
- Reduce `maxTilt` to 4–5 degrees — current 6–10 is too extreme
- `effectiveLift`: max 4px
- Remove `transition: "transform 160ms ease"` — use `200ms ease-out` for smoother return

### Section Title Underline

Keep the existing `sectionTitleUnderline` CSS animation. It works well.
Duration stays `700ms` — this is acceptable for a decorative element.

### Reduced Motion

All animations must respect `@media (prefers-reduced-motion: reduce)`.
The existing `globals.css` handles `body::before` and `.shineBtn` — extend this to cover `Reveal` transitions (set `transition: none`).

---

## What to Avoid

These patterns currently exist in the codebase. Do not reproduce them.

| Pattern | Why | Fix |
|---|---|---|
| `fontWeight: 950` or `900` on body/UI | Too heavy — everything looks loud | Max 800 on headings, 700 on UI |
| `borderRadius: 999` on cards | Too playful for B2B | Use 10–16px per table above |
| `boxShadow: 0 30px 90px rgba(0,0,0,0.12)` | Overdramatic | Use shadow scale above |
| `backdropFilter: blur()` on every Paper | Heavy GPU cost, not needed | Blur only on Header |
| Hardcoded German strings in `App.jsx` | Bypasses i18n | Use `t()` for all user-visible text |
| `filter: blur(10px)` on Reveal | Gimmicky, costly | Remove blur from Reveal entirely |
| `minHeight: 100svh` on every section | Forces awkward scroll | Content-driven height only |
| Double padding (Section Box + Container) | Excessive whitespace | Single padding source |
| Negative `mt` on Hero (`mt: -16`) | Hacky overlap | Design the layout correctly |
| `mb: { md: 40 }` on Hero logos | Creates 320px void | Remove — use normal gap |
| Empty `<Reveal>` blocks in About | Renders whitespace | Remove dead markup |
| Tech logos (React, MongoDB) as service icons | Misleading | Use MUI icons: Language, PhoneAndroid, Storage, Cloud |
| Missing `storeUrl`/`link` on projects | CTA button never renders | Add links or remove the button condition |

---

## MUI Theme — Canonical Configuration

Replace the theme in `App.jsx` with this:

```js
createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1DB8AA',
      dark: '#169E92',
      light: '#4ECFC3',
      contrastText: '#0C1117',
    },
    background: {
      default: '#F7F9F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0C1117',
      secondary: '#4B5563',
      disabled: '#9CA3AF',
    },
    divider: 'rgba(0,0,0,0.08)',
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 800, letterSpacing: -1.5 },
    h2: { fontWeight: 800, letterSpacing: -0.8 },
    h3: { fontWeight: 700, letterSpacing: -0.3 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontSize: '0.9375rem', lineHeight: 1.65 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.57 },
    button: { fontWeight: 700, textTransform: 'none', letterSpacing: 0 },
    caption: { fontSize: '0.6875rem', lineHeight: 1.5 },
    overline: { fontSize: '0.6875rem', fontWeight: 700, letterSpacing: 1.5 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { html: { scrollBehavior: 'smooth' } },
    },
    MuiButton: {
      styleOverrides: {
        root: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          // No global backdropFilter — set it per-component only where needed
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6 },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'rgba(0,0,0,0.08)' },
      },
    },
  },
})
```

---

## Per-Section Design Notes

### Hero

- Left column: overline badge → h1 → subtitle → CTA row → service chips
- Right column: single clean info card (white, shadow-xl, radius 20px)
- Hero h1: "Moderne **Software**\nfür Unternehmen" — keep the brand-color highlight on one word
- Hero card content: 4 service mini-tiles in a 2×2 grid
- Remove the two logo images from hero top — they disrupt the layout hierarchy
- BayerSolutionsLogo.png can be used in the right column info card as a small logo mark (max 80px height)

### Services (TechStack)

- Rename displayed heading to "Leistungen" (already done via nav, but confirm section uses `t()`)
- Replace tech icons (SiReact, SiFirebase etc.) with MUI service icons:
  - Web → `LanguageRounded`
  - Apps → `PhoneAndroidRounded`
  - Backend → `StorageRounded`
  - Hosting → `CloudRounded`
- Grid: 2×2 on desktop, 1-column on mobile
- Each card: 48px icon wrapper + title (20px/700) + description (15px/400)

### About

- Remove the empty `<Reveal>` block (About.jsx lines 196–205)
- The 3 stats grid can be added back if real numbers exist (e.g. "3+ Jahre", "10+ Projekte")
- DeviceMock UI is a nice differentiator — keep it, clean up its internal padding

### Projects (Apps)

- Add `tags` display to each project card — render as small `Chip` elements below the description
- Fix the CTA button: if `storeUrl`/`link` is absent, show a greyed-out "Demnächst verfügbar" label instead of hiding the button entirely
- Screenshot aspect ratio `9/19.5` is correct for phone screenshots — keep it
- Add `loading="lazy"` to all screenshot images

### Contact

- Add a snackbar/toast on successful email copy — silent copy is a UX failure
- Keep the QR code — it's a genuine differentiator for German mobile users
- Contact card padding: `p: { xs: 3, md: 4 }`

### Footer

- Add a "Datenschutz" link alongside "Impressum" (Datenschutz is currently embedded in /impressum — either split or link with an anchor)
- Copyright line: right-align on desktop, centered on mobile

---

## Mobile-First Rules

1. Touch targets minimum 44×44px — check all `IconButton` sizes
2. Section padding `py: 8` (64px) on mobile — never less
3. Single-column layouts on `xs` for all multi-column sections
4. No `TiltCard` on touch devices (already implemented correctly)
5. All `<img>` elements: add `loading="lazy"` and explicit `width`/`height` or `aspect-ratio`
6. Drawer: 280px width maximum — leaves visible backdrop on 320px screens
7. Font size floor: never below 13px in body, never below 11px in captions
8. Button stacks: `direction={{ xs: 'column', sm: 'row' }}` — CTA buttons stack vertically on mobile

---

## SEO Checklist

When updating `index.html`:
- `lang="de"` (currently wrong: `lang="en"`)
- `<meta name="description" content="BAYAR-SOLUTIONS – Professionelle Webentwicklung, App-Entwicklung und digitale Lösungen für Unternehmen. Kaufbeuren, Bayern." />`
- Open Graph: `og:title`, `og:description`, `og:url`, `og:image`
- `<title>BAYAR-SOLUTIONS – Webentwicklung & Apps für Unternehmen</title>`
- Add `public/robots.txt` and `public/sitemap.xml`

---

## File Structure Reference

```
src/
  App.jsx                   ← Theme config lives here
  theme/createAppTheme.js   ← Extended theme factory (can be moved here from App.jsx)
  styles/globals.css        ← CSS custom props, sectionTitleUnderline, reduced-motion
  styles/components.css     ← Legacy CSS classes (largely superseded by MUI sx — minimize)
  components/
    Header.jsx
    Hero.jsx
    About.jsx
    TechStack.jsx           ← Rename to Services.jsx
    Apps.jsx
    Contact.jsx
    Footer.jsx
    Section.jsx             ← Remove minHeight: 100svh
    Reveal.jsx              ← Remove blur, reduce y offset to 12px, duration to 450ms
    TiltCard.jsx            ← Reduce maxTilt, remove from mobile
    ScreenshotGallery.jsx
    LanguageSelect.jsx      ← Add to Header
    ParallaxBackground.jsx  ← Either wire up CSS vars or remove
```
