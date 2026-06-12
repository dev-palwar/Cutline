# Frameful Design System

> **Version 1.0** — Established June 2026
> **Theme:** White + Purple (flat UI)
> **Font:** Plus Jakarta Sans

---

## Sources of Truth

| What | File |
|---|---|
| CSS custom properties (all colour, radius tokens) | `src/index.css` |
| Typographic scale (CSS utilities `.type-*`) | `src/index.css` — `@layer utilities` |
| JS/TS colour constants (for canvas & config) | `src/design-system/tokens.ts` |
| Typography React component | `src/design-system/Typography.tsx` |
| Landing page colour config | `src/configs/landing.config.ts` — imports from `tokens.ts` |

**Nothing else defines visual values.** If it is not in one of these files, it does not exist in the system.

---

## Colour Tokens

All colours are CSS custom properties. They resolve differently in light and dark mode. Use the Tailwind utility that maps to the token — **never use a raw hex value in a component**.

### Semantic Roles

| Token | Light | Dark | Use when |
|---|---|---|---|
| `--background` | `#faf8ff` | `#0c0515` | Page background |
| `--foreground` | `#1a0e2e` | `#ede5ff` | Primary text |
| `--card` | `#ffffff` | `#150d24` | Surface above background |
| `--card-foreground` | `#1a0e2e` | `#ede5ff` | Text on card |
| `--primary` | `#8b5cf6` | `#a78bfa` | Brand violet, CTAs, active states |
| `--primary-foreground` | `#ffffff` | `#0c0515` | Text on primary-coloured surfaces |
| `--secondary` | `#f3e8ff` | `#1e1233` | Tinted secondary surfaces |
| `--secondary-foreground` | `#6b21a8` | `#d8b4fe` | Text on secondary surfaces |
| `--muted` | `#f5f0ff` | `#1e1233` | Quiet backgrounds, code blocks |
| `--muted-foreground` | `#7c6a99` | `#a394c2` | Placeholder text, secondary labels |
| `--accent` | `#ede5ff` | `#261640` | Highlighted states, hover fills |
| `--accent-foreground` | `#5b21b6` | `#e9d5ff` | Text on accent surfaces |
| `--destructive` | `#ef4444` | `#f87171` | Errors, destructive actions |
| `--border` | `#e4d8f8` | `rgba(168,139,250,0.12)` | All dividers and strokes |
| `--input` | `#e4d8f8` | `rgba(168,139,250,0.15)` | Form control strokes |
| `--ring` | `#a78bfa` | `#8b5cf6` | Focus rings |

### Chart Palette (violet-to-fuchsia range)

| Token | Light | Dark |
|---|---|---|
| `--chart-1` | `#8b5cf6` | `#a78bfa` |
| `--chart-2` | `#a855f7` | `#c084fc` |
| `--chart-3` | `#c026d3` | `#d946ef` |
| `--chart-4` | `#d946ef` | `#e879f9` |
| `--chart-5` | `#7c3aed` | `#7c3aed` |

### Brand Gradient

The canonical brand gradient is violet → fuchsia, at 135°.

- **CSS utility:** `bg-brand-gradient` (background) / `text-brand-gradient` (clipped text)
- **JS constant:** `GRADIENT` from `src/design-system/tokens.ts`
- Use the CSS utility in components wherever possible. Use the JS constant only when CSS is not applicable (e.g. canvas rendering, `style={{}}` props driven by config data).

**Forbidden:** `linear-gradient(135deg, #8b5cf6 …)` anywhere except `tokens.ts`.

---

## Radius Scale

All radii are derived from a single `--radius: 0.625rem` (10px) base. Use the named tokens — never raw pixel values.

| Token | Value | Intended use |
|---|---|---|
| `rounded-xs` | 4px | Tags, badges, tiny chips |
| `rounded-sm` | 6px | Inputs, pills, small elements |
| `rounded-md` | 8px | Cards, panel sections, thumbnails |
| `rounded-lg` | 10px | Default Shadcn components |
| `rounded-xl` | 14px | Modals, dialogs |
| `rounded-2xl` | 18px | Large promotional cards |
| `rounded-3xl` | 22px | Hero/feature sections |

---

## Typographic Scale

Font family: **Plus Jakarta Sans** — loaded via Google Fonts in `index.html`. No other font family is permitted.

All scale steps are exposed as `.type-<variant>` CSS utility classes (in `src/index.css`). Use the `Typography` React component in JSX — **never raw Tailwind size classes**.

| Variant | Size | Weight | Leading | Use |
|---|---|---|---|---|
| `display` | clamp(36–60px) | 700 | 1.05 | Hero headline |
| `h1` | clamp(30–44px) | 700 | 1.10 | Page title |
| `h2` | clamp(24–32px) | 700 | 1.20 | Section heading |
| `h3` | 18px | 600 | 1.35 | Card / sub-section title |
| `h4` | 16px | 600 | 1.40 | Label-style headings |
| `body` | 16px | 400 | 1.625 | Default prose |
| `body-sm` | 15px | 400 | 1.60 | Secondary prose |
| `caption` | 13px | 400 | 1.50 | Supporting / helper text |
| `label` | 12px | 500 | 1.40 | Form labels, tab labels, button text |
| `overline` | 12px | 600 | 1.40 | Section eyebrows, badges (uppercase) |
| `code` | 13px | 600 | 1.50 | Timecodes, step numbers, monospace |

### Using the Typography Component

```tsx
// Correct — semantic variant, no raw sizes
<Typography variant="h2">Section Title</Typography>
<Typography variant="body-sm" className="text-muted-foreground">...</Typography>
<Typography variant="display" gradient as="h1">Make it beautiful.</Typography>

// Correct — override tag without losing scale
<Typography variant="label" as="span">Upload Custom</Typography>

// Forbidden — bypasses the scale
<p className="text-xl font-bold">Bad</p>
<span className="text-xs">Also bad</span>
```

The `gradient` prop applies the `text-brand-gradient` utility (violet → fuchsia clip). Use only on display/h1 text at most.

---

## Spacing

Spacing uses Tailwind's default 4px grid (`p-1` = 4px, `p-4` = 16px, etc.). No custom spacing tokens are defined. Use only multiples from the grid — never arbitrary pixel values.

**Common patterns in this codebase:**

| Usage | Value |
|---|---|
| Section vertical padding | `py-20 md:py-28` |
| Page container max-width | `max-w-6xl px-6` |
| Studio header height | `h-14` |
| Toolbar width | `w-80 xl:w-96` |
| Inner panel padding | `p-5` |
| Card gap | `gap-3` or `gap-6` |

---

## Interaction Design — Flat UI Rules

This codebase follows a **flat UI** philosophy. The following are **explicitly forbidden**:

| Forbidden pattern | Reason |
|---|---|
| `hover:scale-*` / `active:scale-*` | Scale transforms are not part of flat UI |
| `shadow-lg`, `shadow-xl`, `shadow-2xl` | Avoid gratuitous elevation shadows |
| `shadow-[color]/*` coloured shadows | Brand glow shadows are similarly removed |
| `animate-pulse` on blobs/orbs | Reduces visual noise |
| `rounded-2xl` or larger on interactive elements | Use `rounded-md` for buttons/inputs |
| Arbitrary `blur-3xl` background blobs on interactive elements | Use sparingly, only on purely decorative elements |

**Permitted:**

- `transition-colors` — smooth colour transitions on hover
- `transition-opacity` — show/hide overlays
- `animate-fade-up` — entrance animations for sections
- `animate-pulse-glow` — subtle brand glow on hero mock (not on buttons)
- `animate-bounce` — loading indicators only

---

## Button Patterns

Use the Shadcn `<Button>` component for navigation/form buttons. For custom-styled brand CTAs (full-width download, play/pause), use a plain `<button>` with the following pattern:

```tsx
<button className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-gradient text-primary-foreground type-label cursor-pointer">
  <Icon className="w-4 h-4" />
  <Typography variant="label" as="span">Action</Typography>
</button>
```

- No `rounded-*` class means `rounded-none` (zero radius) — the square corner is intentional for full-width CTAs.
- No shadow class.
- No hover:scale class.

---

## Animation Tokens

| Class | Usage |
|---|---|
| `.animate-fade-up` | Section/element entrance (0.45s ease-out) |
| `.animate-gradient-shift` | Animated gradient backgrounds |
| `.animate-pulse-glow` | Hero mock glow — decorative only |
| `.animate-shimmer` | Skeleton loading states |
| `.delay-{100-500}` | Staggered entrance delays |

---

## File Architecture

```
src/
├── design-system/
│   ├── tokens.ts        ← JS colour/gradient constants (source of truth for JS)
│   └── Typography.tsx   ← Typography component (source of truth for text)
├── index.css            ← CSS tokens, typographic scale, utilities (source of truth for CSS)
├── configs/
│   └── landing.config.ts ← Imports from tokens.ts, no raw hex values
└── components/
    ├── shared/          ← Header, Footer
    ├── landing/         ← Hero, HowItWorks, ComingSoon, Waitlist
    ├── video/           ← VideoPlayer, Timeline, NoVideo
    └── toolbar/
        ├── types.ts     ← ToolBarTab interface
        ├── ToolBar.tsx  ← Tab shell
        └── tabs/        ← One file per feature panel
```

---

## Instructions for Future AI Assistants

**Read this section carefully before touching any UI code.**

### Sources of truth (read these first)

1. `src/index.css` — all CSS custom property values and typographic scale utilities
2. `src/design-system/tokens.ts` — all JS colour and gradient constants
3. `src/design-system/Typography.tsx` — the only way to render text

### What is forbidden

- **No hardcoded hex values** in any `.tsx` or `.ts` component file. If you need a colour, it must already exist in `tokens.ts` or as a Tailwind token mapping to a CSS var.
- **No raw Tailwind size classes** (`text-sm`, `text-xl`, `text-2xl`, etc.) for text content. Use `<Typography variant="…">` or the `.type-*` utility class.
- **No hover:scale, active:scale** — this is a flat UI.
- **No shadow-lg, shadow-xl, shadow-2xl** on UI elements — flat UI, no elevation.
- **No new fonts** — Plus Jakarta Sans is the sole font. Do not add Google Fonts links or `font-family` declarations.
- **No new colour variables** without updating both `index.css` and `tokens.ts` and documenting them in this file.
- **No new animation keyframes** without a corresponding named class in `index.css`.

### What to check before adding a new component

1. Does the component use colour? → Use a token (`bg-primary`, `text-muted-foreground`, etc.)
2. Does it render text? → Use `<Typography variant="…">` or `.type-*` utility
3. Does it have hover/active state? → `transition-colors` only, no scale
4. Does it need a border? → `border-border` (the token), not `border-gray-200` or a hex
5. Does it use a radius? → `rounded-md` for interactive elements, `rounded-xl` for large cards max
6. Does it reference a brand gradient? → `bg-brand-gradient` or `text-brand-gradient` CSS utilities, or `GRADIENT` from `tokens.ts` for unavoidable inline styles

### Adding a new toolbar tab

1. Create `src/components/toolbar/tabs/<YourFeature>Tab.tsx` implementing `React.FC<ToolBarProps>`
2. Add one entry to the `TABS` array in `src/components/toolbar/ToolBar.tsx`
3. That is the complete change required — no other files need updating

### Adding a new colour token

1. Add the CSS var to both `:root` (light) and `.dark` blocks in `src/index.css`
2. Add a `--color-<name>: var(--<name>)` mapping in the `@theme inline` block
3. If needed in JS, add a corresponding constant in `src/design-system/tokens.ts`
4. Document it in the table above in this file
5. Do NOT invent a colour that is not on the violet-to-fuchsia spectrum unless it serves a semantic purpose (destructive, success, etc.)
