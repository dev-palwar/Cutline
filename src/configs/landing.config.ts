import { Video, Palette, Download } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  GRADIENT,
  GRADIENT_REVERSE,
  VIOLET,
  PURPLE,
  FUCHSIA,
  STATUS_COLORS,
  STEP_COLORS,
} from "@/design-system/tokens";

// Re-export so callers that already import from here don't break.
export { GRADIENT, GRADIENT_REVERSE, VIOLET, PURPLE, FUCHSIA };

/* ── Hero ── */
export const HERO_CONFIG = {
  badge: "Free to use · No account needed",
  headlineStatic: "Record your screen.",
  headlineGradient: "Make it beautiful.",
  subtext:
    "Frameful captures your screen, lets you pick a beautiful background, trim the timeline, and export a polished video — all in your browser. No sign-up, no uploads, fully private.",
  primaryCtaLabel: "Start recording — it's free",
  secondaryCtaLabel: "See how it works",
  browserSupportNote: "Works on Chrome, Edge, Brave & Firefox",
  mockAddressBar: "frameful.devpalwar.xyz/studio",
  mockLabels: ["Custom Background", "Trim & Export", "1080p"] as const,
};

/* ── How It Works ── */
export interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const HOW_IT_WORKS_CONFIG = {
  sectionLabel: "How it works",
  headline: "Record. Customize. Export.",
  subtext: "Three steps. No learning curve. Everything stays on your device.",
  steps: [
    {
      number: "01",
      title: "Record",
      description:
        "Click record and choose a screen, window, or browser tab. Frameful captures everything in HD with no time limit.",
      icon: Video,
      color: STEP_COLORS.record.color,
      bgColor: STEP_COLORS.record.bgColor,
    },
    {
      number: "02",
      title: "Customize",
      description:
        "Pick a beautiful background from the gallery or upload your own. Trim the timeline to keep only what matters.",
      icon: Palette,
      color: STEP_COLORS.customize.color,
      bgColor: STEP_COLORS.customize.bgColor,
    },
    {
      number: "03",
      title: "Export",
      description:
        "Hit download and your edited video renders locally in .webm format — fast, private, and ready to share.",
      icon: Download,
      color: STEP_COLORS.export.color,
      bgColor: STEP_COLORS.export.bgColor,
    },
  ] satisfies Step[],
};

/* ── Coming Soon ── */
export type ItemStatus = "In Development" | "Planned";

export interface UpcomingItem {
  title: string;
  description: string;
  status: ItemStatus;
}

export const COMING_SOON_CONFIG = {
  sectionLabel: "Coming Soon",
  headline: "What's next for Frameful.",
  subtext:
    "We're actively building these features. Join the waitlist to get early access.",
  items: [
    {
      title: "Advanced Editing",
      description:
        "Cut, split, and rearrange clips right inside the studio. Add transitions between segments and fine-tune your video without leaving the browser.",
      status: "In Development",
    },
    {
      title: "Auto Zoom-In on Click",
      description:
        "A browser extension that tracks your clicks during recording and automatically adds smooth scale-in (zoom) effects at each click point. Focus exactly where it matters.",
      status: "Planned",
    },
    {
      title: "Frameful Extension",
      description:
        "Install a lightweight browser extension to capture click events, annotate recordings, and trigger Frameful directly from any tab with a single shortcut.",
      status: "Planned",
    },
  ] satisfies UpcomingItem[],
  statusColors: STATUS_COLORS,
};

/* ── Waitlist ── */
export const WAITLIST_CONFIG = {
  formspreeEndpoint: "https://formspree.io/f/xpqjynpw",
  badgeLabel: "Join the waitlist",
  headline: "Be first to try new features.",
  subtext:
    "Auto zoom-in, advanced editing, and the browser extension are coming soon. Drop your email and we'll let you know when they're ready.",
  inputPlaceholder: "you@email.com",
  ctaLabel: "Notify me",
  successMessage: "You're on the list! We'll reach out soon.",
  errorMessage: "Something went wrong. Please try again.",
  disclaimer: "No spam. We'll only email you about new features.",
};

/* ── Footer ── */
export interface FooterLink {
  label: string;
  href: string;
  /** true → rendered as <Link>, false → plain <a> */
  internal: boolean;
}

export const FOOTER_CONFIG = {
  brandName: "frameful",
  copyright: "© 2026 Frameful. All rights reserved.",
  links: [
    { label: "Privacy", href: "/privacy", internal: true },
    { label: "Twitter", href: "https://x.com/dev_palwar2", internal: false },
    {
      label: "GitHub",
      href: "https://github.com/dev-palwar/",
      internal: false,
    },
  ] satisfies FooterLink[],
};
