# Design Language Guide

This guide documents the visual and interaction language used in this portfolio so the same clean flow, calm aesthetic, and polished usability can be reused in future projects.

The core feeling is refined, quiet, editorial, and technical. The interface should feel spacious without feeling empty, premium without feeling decorative, and personal without becoming casual or cluttered.

## 1. Design Personality

Use this design language when the project should feel:

- Clean, calm, and confident.
- Editorial, with expressive large serif headings.
- Professional and portfolio-ready.
- Human, warm, and slightly tactile.
- Technical, but not cold or overly corporate.
- Minimal, but not plain.

Avoid:

- Heavy gradients.
- Bright saturated color palettes.
- Over-rounded cards or playful shapes.
- Dense dashboards unless the project specifically needs one.
- Decorative clutter that does not support content.
- Generic stock-style hero layouts.

## 2. Visual Principles

### Calm Structure

The layout is built from clear sections, generous vertical spacing, and predictable grids. Every section should have a clear purpose.

Use:

- Full-width horizontal sections.
- A centered max-width container.
- Alternating background bands for rhythm.
- Simple borders instead of heavy shadows.
- Plenty of breathing room between content groups.

### Editorial Contrast

The visual character comes from pairing large serif display text with restrained sans-serif body text.

Use serif typography for:

- Hero names.
- Main section headings.
- Logo or personal brand text.

Use sans-serif typography for:

- Paragraphs.
- Navigation.
- Buttons.
- Cards.
- UI labels.

Use monospace sparingly for:

- Eyebrows.
- Metadata.
- Number labels.
- Status text.
- Small structured facts.

### Soft Tactility

Components should feel interactive but subtle. Borders, hover background changes, and tiny vertical movement are enough.

Use:

- Thin borders.
- Soft surface colors.
- `translateY(-2px)` hover lifts.
- Small opacity and transform transitions.

Avoid:

- Large shadows.
- Dramatic scale animations.
- Strong glow effects.
- Color-heavy hover states.

## 3. Color System

The palette is based on warm ivory, ink, muted bronze, and soft taupe borders. It supports both light and dark themes through CSS variables.

### Light Theme

```css
--color-bg: #f4efe7;
--color-bg-secondary: #ebe3d7;
--color-surface: #fbf8f2;
--color-surface-hover: #f0e8dc;
--color-card: #f9f5ee;
--color-card-hover: #fffaf2;

--color-primary: #8a6f45;
--color-primary-hover: #5f4a2a;
--color-text-primary: #141414;
--color-text-secondary: #514c45;
--color-text-tertiary: #80776b;
--color-text-inverse: #f8f3eb;

--color-border: #d5cabb;
--color-border-light: #e4dace;
--color-border-hover: #9f927f;
```

### Dark Theme

```css
--color-bg: #10100f;
--color-bg-secondary: #171613;
--color-surface: #1c1a17;
--color-surface-hover: #24211d;
--color-card: #191815;
--color-card-hover: #211f1b;

--color-primary: #c4aa78;
--color-primary-hover: #dec993;
--color-text-primary: #f3eee5;
--color-text-secondary: #c4baaa;
--color-text-tertiary: #958979;
--color-text-inverse: #12110f;

--color-border: #342f28;
--color-border-light: #29251f;
--color-border-hover: #6f6252;
```

### Color Usage Rules

- Use `--color-bg` for the main page background.
- Use `--color-bg-secondary` for alternating muted sections.
- Use `--color-card` for cards and framed content.
- Use `--color-surface` for inner media frames and soft panels.
- Use `--color-primary` only as an accent, not as a dominant fill.
- Use `--color-text-primary` for headings and key values.
- Use `--color-text-secondary` for normal paragraph text.
- Use `--color-text-tertiary` for metadata, numbers, labels, and quiet details.
- Use borders more often than shadows.

The palette should remain warm and restrained. Future projects can shift the accent color, but the background, text, and border contrast should stay similarly soft.

## 4. Typography

### Font Families

```css
--font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-serif: "Cormorant Garamond", Georgia, serif;
--font-mono: "JetBrains Mono", "Cascadia Code", Consolas, monospace;
```

### Type Scale

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 2rem;
--text-4xl: 2.75rem;
--text-5xl: 4rem;
--text-6xl: 5.5rem;
```

### Heading Style

Large headings are intentionally oversized and elegant.

```css
h1 {
  font-family: var(--font-serif);
  font-size: clamp(4.5rem, 14vw, 10rem);
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: 0;
}

h2 {
  font-family: var(--font-serif);
  font-size: clamp(2.75rem, 6vw, 5.5rem);
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: 0;
}
```

For hero names, use:

```css
font-size: clamp(4.5rem, 10vw, 8.5rem);
```

On small screens, reduce hero text to:

```css
font-size: clamp(4rem, 22vw, 6.4rem);
```

### Body Text

Body text should be readable and relaxed.

```css
font-size: 1rem;
line-height: 1.72;
color: var(--color-text-secondary);
```

For long-form prose, allow a mild responsive increase:

```css
font-size: clamp(1rem, 1.5vw, 1.18rem);
```

### Labels and Metadata

Eyebrows and metadata use monospace uppercase text.

```css
font-family: var(--font-mono);
font-size: var(--text-xs);
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.12em;
color: var(--color-primary);
```

Use this style for section labels, project numbers, card marks, facts, certification issuers, contact labels, and footer credits.

## 5. Spacing System

All spacing should come from tokens. This keeps rhythm consistent across pages.

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.25rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-10: 2.5rem;
--space-12: 3rem;
--space-14: 3.5rem;
--space-16: 4rem;
--space-20: 5rem;
--space-24: 6rem;
--space-28: 7rem;
```

### Layout Spacing

Use these as defaults:

- Container horizontal padding: `var(--space-6)`.
- Mobile container padding: `var(--space-5)`.
- Desktop section padding: `var(--space-24) 0`.
- Mobile section padding: `var(--space-16) 0`.
- Section header bottom margin: `var(--space-14)`.
- Mobile section header bottom margin: `var(--space-10)`.
- Major grid gaps: `var(--space-16)`.
- Medium grid gaps: `var(--space-10)`.
- Card internal padding: `var(--space-6)`.
- Mobile card padding: `var(--space-5)`.
- Button horizontal padding: `var(--space-5)` to `var(--space-6)`.

### Spacing Philosophy

The design should feel spacious because sections have strong vertical padding, not because individual cards are bloated. Keep cards compact and let page-level rhythm do most of the work.

## 6. Layout System

### Containers

```css
--container-max: 1180px;
--container-narrow: 780px;
```

Use the main container for most sections:

```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-6);
}
```

Use the narrow container for text-heavy pages or detail views.

### Sections

Each major block should be a `.section`.

```css
.section {
  position: relative;
  padding: var(--space-24) 0;
  border-top: 1px solid var(--color-border-light);
}
```

Use `.section-muted` to create quiet alternation:

```css
.section-muted {
  background: var(--color-bg-secondary);
}
```

### Two-Column Editorial Grid

Use this for sections with a label/title on the left and content on the right.

```css
grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1.2fr);
gap: var(--space-16);
```

The left copy can be sticky on desktop:

```css
position: sticky;
top: calc(var(--header-height) + var(--space-8));
```

On tablet and mobile, collapse to one column.

### Hero Layout

The hero uses a two-column layout on desktop and one column on tablet/mobile.

Desktop:

- Full viewport height.
- Header-aware top padding.
- Name and intro on the left.
- Portrait or visual panel on the right.
- Facts row spans the full width below.

Mobile:

- Auto height.
- Centered text.
- Stacked layout.
- Full-width action buttons.

### Cards and Lists

Use cards for repeated content:

- Projects.
- Skills.
- Timeline items.
- Credentials.
- Community items.
- Contact links.

Use simple grids:

- Project list: one-column stacked cards.
- Capabilities: three columns on desktop, two on tablet, one on mobile.
- Credentials/community: one-column list.
- Contact: two-column layout on desktop, one-column on mobile.

## 7. Components

### Buttons

Buttons are pill-shaped, compact, and quiet.

```css
min-height: 42px;
padding: var(--space-3) var(--space-5);
border: 1px solid var(--color-border);
border-radius: var(--radius-full);
font-size: var(--text-sm);
font-weight: var(--weight-semibold);
```

Large buttons:

```css
min-height: 48px;
padding: var(--space-4) var(--space-6);
```

Small buttons:

```css
min-height: 36px;
padding: var(--space-2) var(--space-4);
font-size: var(--text-xs);
```

Button behavior:

- Primary buttons use `--color-text-primary` as the background.
- Primary hover changes to `--color-primary`.
- Secondary buttons are transparent with a border.
- Hover lifts by `translateY(-2px)`.

### Header

The header is fixed, glassy, and minimal.

```css
height: var(--header-height);
background: var(--color-surface-glass);
backdrop-filter: blur(18px);
border-bottom: 1px solid var(--color-border-light);
```

Behavior:

- Becomes slightly stronger when scrolled.
- Hides when scrolling down after the first part of the page.
- Reappears when scrolling up.
- Uses active link underlines based on the current section.

### Navigation Links

Navigation is subtle. Use color change and a thin animated underline.

```css
.nav-link::after {
  height: 1px;
  transform: scaleX(0);
}
```

On hover/active:

```css
color: var(--color-text-primary);
transform: scaleX(1);
```

### Mobile Menu

The mobile menu slides in from the right and uses a blurred surface.

```css
width: min(100%, 420px);
height: 100dvh;
padding: var(--space-10);
background: var(--color-surface-glass-strong);
backdrop-filter: blur(24px);
transform: translateX(100%);
```

When open:

```css
transform: translateX(0);
```

UX rules:

- Lock body scroll when open.
- Close on overlay click.
- Close on `Escape`.
- Update `aria-expanded`.
- Use a visible overlay behind the panel.

### Project Cards

Project cards use a structured three-column row on desktop:

```css
grid-template-columns: 72px minmax(0, 1fr) auto;
gap: var(--space-6);
padding: var(--space-6);
```

On mobile:

```css
grid-template-columns: 1fr;
gap: var(--space-4);
padding: var(--space-5);
```

Each card should include:

- Numeric index.
- Title.
- Short practical description.
- Technology chips.
- Quiet status label.

### Skill Cards

Skill cards are simple, tall enough to breathe, and organized vertically.

```css
min-height: 220px;
padding: var(--space-6);
display: flex;
flex-direction: column;
justify-content: space-between;
```

Use a small monospace mark at the top and concise copy below.

### Contact Items

Contact links behave like cards. They should be readable and clearly clickable.

```css
display: grid;
gap: var(--space-2);
padding: var(--space-6);
```

Use a small uppercase label and a stronger value.

## 8. Borders, Radius, and Shadows

### Radius

```css
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-full: 999px;
```

Usage:

- Use `--radius-full` only for buttons, pills, toggles, and circular icon controls.
- Use small or medium radius for framed images and panels only when needed.
- Most cards in this design are rectangular with borders, which gives the layout a more editorial feel.

### Borders

Borders are essential to the language.

Use:

- `--color-border-light` for section dividers and subtle internal frames.
- `--color-border` for cards and buttons.
- `--color-border-hover` for interactive hover states.

### Shadows

Shadows exist but should be rare.

```css
--shadow-card: 0 20px 50px rgb(45 38 29 / 0.08);
--shadow-nav: 0 1px 0 rgb(20 20 20 / 0.08);
```

Prefer borders and background shifts. Use shadows only when a component genuinely needs elevation.

## 9. Motion and Animation

Motion should feel refined and almost invisible. It should guide attention, not entertain.

### Motion Tokens

```css
--duration-fast: 150ms;
--duration-normal: 260ms;
--duration-slow: 520ms;
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
--ease-smooth: cubic-bezier(0.65, 0, 0.35, 1);
```

### Hero Entrance

Hero content enters once on page load:

- Starts at `opacity: 0`.
- Moves from `translateY(20px)`.
- Animates to visible over `720ms`.
- Staggers by roughly `80ms`.

This creates a graceful first impression without feeling flashy.

### Scroll Reveal

Reusable reveal classes:

- `.reveal`
- `.reveal-fade-up`
- `.reveal-fade-left`
- `.reveal-fade-right`
- `.reveal-scale`

Current behavior:

```css
opacity: 0;
transform: translateY(24px);
transition: opacity var(--duration-slow) var(--ease-out),
  transform var(--duration-slow) var(--ease-out);
```

When visible:

```css
opacity: 1;
transform: translateY(0);
```

Intersection observer settings:

```js
threshold: 0.12
rootMargin: "0px 0px -40px 0px"
```

### Staggering

For lists, use custom stagger indexes:

```css
transition-delay: calc(var(--stagger-index, 0) * 70ms);
```

Example:

```html
<article class="project-card reveal-fade-up" style="--stagger-index: 2;">
```

### Theme Transitions

Background, text, and border colors transition globally:

```css
transition-property: background-color, color, border-color;
transition-duration: var(--duration-normal);
transition-timing-function: var(--ease-out);
```

### Reduced Motion

Always respect reduced motion preferences.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

If reduced motion is enabled, reveal elements should appear immediately.

## 10. Responsiveness

The system uses three main responsive ranges.

### Desktop

Default desktop behavior:

- Header height: `76px`.
- Container max width: `1180px`.
- Hero uses two columns.
- Section grids use two columns.
- Capabilities use three columns.
- Header navigation is visible.
- Mobile menu is hidden.

### Tablet and Small Desktop

Breakpoint:

```css
@media (max-width: 1023px)
```

Rules:

- Hide desktop nav links.
- Show hamburger.
- Collapse hero, section, and contact grids to one column.
- Center hero content.
- Set hero max width to `780px`.
- Capabilities become two columns.
- Disable sticky section copy.
- Hero becomes auto-height instead of full viewport.

### Mobile

Breakpoint:

```css
@media (max-width: 767px)
```

Rules:

- Header height becomes `64px`.
- Container padding becomes `var(--space-5)`.
- Section padding becomes `var(--space-16) 0`.
- Hero action buttons stack vertically and become full width.
- Project cards collapse to a single column.
- Capability cards become one column.
- Footer becomes one column.
- Header resume button is hidden.
- Mobile menu uses full width.
- Contact strong text reduces to base size.

### Very Small Mobile

Breakpoint:

```css
@media (max-width: 420px)
```

Rules:

- Logo font size reduces to `var(--text-lg)`.
- Theme toggle and hamburger become `34px`.
- Navigation action gap tightens to `var(--space-2)`.

## 11. UI and UX Rules

### Content Flow

The page should read like a guided story:

1. Identity and positioning.
2. About summary.
3. Selected work.
4. Experience.
5. Capabilities.
6. Credentials.
7. Community.
8. Contact.

Each section should answer one user question. Do not overload a section with too many competing actions.

### Navigation UX

Navigation should:

- Stay available through a fixed header.
- Hide on downward scroll to preserve reading space.
- Reappear when the user scrolls up.
- Highlight the current section.
- Smooth-scroll to anchors with header offset.
- Provide a mobile menu with keyboard and overlay support.

### Interaction Style

Interactions should be consistent:

- Hover lifts: `translateY(-2px)`.
- Hover backgrounds: slightly warmer/lighter card surface.
- Link hover: stronger text color or primary accent.
- Buttons: subtle border and background transitions.
- No dramatic animation or bouncing.

### Accessibility

Maintain:

- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`.
- Clear `aria-label` values for icon buttons and special nav areas.
- A skip-to-content link.
- Visible `:focus-visible` outlines.
- Keyboard support for mobile menu and back-to-top.
- Reduced-motion support.
- Sufficient contrast in both themes.
- Real text instead of image text.

### Forms and Contact

This design prefers direct contact links over fake or inactive forms. If a form is required in a future project, keep it visually aligned:

- Thin bordered fields.
- Warm surface backgrounds.
- Clear labels.
- Strong focus states.
- Minimal helper text.
- No oversized form cards.

## 12. Imagery

Images should feel authentic and content-specific.

Use:

- A real portrait or relevant product visual.
- Simple bordered frames.
- `object-fit: cover`.
- Stable aspect ratios.
- Neutral backgrounds that match the surface palette.

Avoid:

- Heavy image filters.
- Dark blurred overlays.
- Random stock images.
- Decorative illustrations unless they directly support the project.

The current portrait frame uses:

```css
aspect-ratio: 4 / 3;
border: 1px solid var(--color-border-light);
background: var(--color-surface);
```

## 13. Dark Mode

Dark mode is not a separate design. It is the same system with inverted warmth.

Rules:

- Use the same layout and components.
- Do not introduce new colors outside the token system.
- Keep primary accent warmer and softer in dark mode.
- Update browser theme color when the theme changes.
- Store user preference in `localStorage`.
- Respect system preference when no stored preference exists.

## 14. Implementation Pattern

Use a modular CSS structure:

```text
css/
|-- reset.css
|-- variables.css
|-- typography.css
|-- layout.css
|-- components.css
|-- animations.css
|-- responsive.css
`-- style.css
```

Import order:

```css
@import url("reset.css");
@import url("variables.css");
@import url("typography.css");
@import url("layout.css");
@import url("components.css");
@import url("animations.css");
@import url("responsive.css");
```

Keep this separation:

- `reset.css`: browser normalization, focus styles, skip link.
- `variables.css`: colors, spacing, typography tokens, motion tokens.
- `typography.css`: text hierarchy and prose rules.
- `layout.css`: containers, sections, grids, hero, footer.
- `components.css`: buttons, nav, cards, mobile menu, contact items.
- `animations.css`: reveal, hero entrance, motion preferences.
- `responsive.css`: all breakpoint overrides.

## 15. Reuse Checklist

Before using this design language in a new project, confirm:

- The project benefits from a calm editorial style.
- Content is strong enough to carry a minimal interface.
- Section order tells a clear story.
- Headings use the serif display style.
- Body text remains readable at relaxed line height.
- Colors are pulled from tokens.
- Spacing uses the token scale.
- Cards use borders and subtle hover motion.
- Mobile layouts collapse cleanly.
- Buttons are large enough to tap.
- Navigation works with keyboard and touch.
- Reduced motion is respected.
- Dark mode uses the same component system.

## 16. Quick Starter Values

For a future project, these are the most important values to keep:

```css
:root {
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-mono: "JetBrains Mono", "Cascadia Code", Consolas, monospace;

  --color-bg: #f4efe7;
  --color-bg-secondary: #ebe3d7;
  --color-card: #f9f5ee;
  --color-primary: #8a6f45;
  --color-text-primary: #141414;
  --color-text-secondary: #514c45;
  --color-text-tertiary: #80776b;
  --color-border: #d5cabb;
  --color-border-light: #e4dace;

  --container-max: 1180px;
  --header-height: 76px;

  --duration-normal: 260ms;
  --duration-slow: 520ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

The easiest way to preserve the look is to keep the same typography contrast, warm neutral palette, generous section spacing, thin borders, and restrained motion.
