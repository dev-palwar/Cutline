/**
 * DESIGN SYSTEM — Token Constants
 * ────────────────────────────────────────────────────────────────────────────
 * Source of truth for values that must live in JS/TS (e.g. canvas rendering,
 * landing.config.ts colour references, etc.).
 *
 * For CSS/Tailwind usage, always prefer the CSS custom properties defined in
 * src/index.css and exposed via Tailwind's @theme block.
 *
 * DO NOT hardcode any of these values elsewhere in the codebase.
 */

// ── Brand Palette ─────────────────────────────────────────────────────────────
/** Primary violet — maps to CSS var(--primary) in light mode */
export const VIOLET = "#8b5cf6";
/** Mid violet-purple — maps to CSS var(--chart-2) */
export const PURPLE = "#a855f7";
/** Fuchsia accent — right end of the brand gradient */
export const FUCHSIA = "#d946ef";
/** Dark violet used on interactive elements needing higher contrast */
export const VIOLET_DARK = "#7c3aed";
/** Lighter violet used in dark-mode primary */
export const VIOLET_LIGHT = "#a78bfa";

// ── Brand Gradients ───────────────────────────────────────────────────────────
/** Left-to-right brand gradient (canonical direction) */
export const GRADIENT =
  "linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(217, 70, 239) 100%)";
/** Right-to-left brand gradient (decorative / blob use only) */
export const GRADIENT_REVERSE =
  "linear-gradient(135deg, rgb(217, 70, 239) 0%, rgb(139, 92, 246) 100%)";

// ── Status Tints ──────────────────────────────────────────────────────────────
// Used in ComingSoonSection status badges.
// bg = rgba tint for background, text = full colour for text + dot.
export const STATUS_COLORS = {
  "In Development": { bg: "rgba(139, 92, 246, 0.10)", text: VIOLET },
  Planned: { bg: "rgba(217, 70, 239, 0.10)", text: FUCHSIA },
} as const;

// ── Step Icon Tints ───────────────────────────────────────────────────────────
// Used in HowItWorksSection step icons.
export const STEP_COLORS = {
  record: { color: VIOLET, bgColor: "rgba(139, 92, 246, 0.08)" },
  customize: { color: PURPLE, bgColor: "rgba(168, 85, 247, 0.08)" },
  export: { color: FUCHSIA, bgColor: "rgba(217, 70, 239, 0.08)" },
} as const;
