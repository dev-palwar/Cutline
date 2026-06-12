import type { LucideIcon } from "lucide-react";
import type React from "react";

/** Props passed down from ToolBar to every tab panel. */
export interface ToolBarProps {
  onBackgroundSelect: (bg: string) => void;
}

/** Descriptor for a single toolbar tab. */
export interface ToolBarTab {
  /** Unique machine-readable key, used as the active-tab discriminator. */
  id: string;
  /** Human-readable label shown in the tab strip. */
  label: string;
  /** One-line description shown as the panel sub-heading. */
  subtitle: string;
  /** Icon rendered next to the label. */
  icon: LucideIcon;
  /** The panel content to render when this tab is active. */
  panel: React.FC<ToolBarProps>;
}
