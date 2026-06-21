/**
 * useZoomTransform.ts — Computes the CSS zoom transform for the VideoPlayer.
 *
 * Reads the current playhead time against the list of ZoomEvents and
 * returns the scale + origin to apply to the video element each frame.
 * Returns null when no zoom is active (no transform should be applied).
 */

import { useMemo } from "react";
import { resolveZoomTransform, type ZoomEvent } from "@/lib/zoom";

export interface ZoomTransformState {
  scale: number;
  originX: number;
  originY: number;
}

export function useZoomTransform(
  currentTime: number,
  zoomEvents: ZoomEvent[],
): ZoomTransformState | null {
  // resolveZoomTransform is a pure function so useMemo is appropriate here.
  // Re-runs on every time tick (frequent) but is very cheap to compute.
  return useMemo(
    () => resolveZoomTransform(currentTime, zoomEvents),
    [currentTime, zoomEvents],
  );
}
