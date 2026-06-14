import type { ExportOptions, CanvasLayout } from "../types";

/**
 * Builds the FFmpeg `-filter_complex` string for the export.
 *
 * Applies all design settings from the Design tab:
 *   - Background blur (gblur) + opacity (colorchannelmixer)
 *   - Video padding (scale to padded size)
 *   - Video opacity (colorchannelmixer on vid stream)
 *   - Shadow (split + blur + darken + underlay)
 *   - Final composite onto canvas
 *
 * Note: border-radius is a CSS-only effect and cannot be replicated in FFmpeg
 * without a per-frame alpha mask — it is intentionally skipped here.
 */
export function buildFilterGraph(
  opts: ExportOptions,
  layout: CanvasLayout,
): string {
  const { outputWidth: W, outputHeight: H, trimStart, designSettings } = opts;
  const { svw, svh, vx, vy, effectiveTrimEnd } = layout;

  const ds = designSettings ?? {};
  const padding      = ds.padding      ?? 0;           // rem units → scale factor
  const opacity      = ds.opacity      ?? 100;          // 0-100
  const shadow       = ds.shadow       ?? "none";
  const shadowInt    = (ds.shadowIntensity ?? 75) / 100; // 0-1
  const blur         = ds.blur         ?? "none";
  const blurAmount   = (ds.blurAmount  ?? 50) / 100;   // 0-1
  const designScale  = ds.scale        ?? 1.0;

  // ── 1. Video dimensions accounting for padding and scale ──────────────────
  // padding is in rem; 1rem ≈ 16px, but we work in fractions of the video size
  // paddingFrac: how much to shrink the video on each side
  const paddingFrac = Math.min(padding / 10, 0.35); // cap at 35% per side
  const paddedW = Math.round(svw * (1 - paddingFrac * 2) * designScale);
  const paddedH = Math.round(svh * (1 - paddingFrac * 2) * designScale);
  // Re-center within original svw × svh slot
  const paddedX = Math.round(vx + (svw - paddedW) / 2);
  const paddedY = Math.round(vy + (svh - paddedH) / 2);

  // ── 2. Opacity value (0.0–1.0) ─────────────────────────────────────────────
  const opacityVal = (opacity / 100).toFixed(3);

  // ── 3. Background blur sigma ───────────────────────────────────────────────
  // Preset base sigmas match the CSS px values in VideoPlayer / BlurPreview
  const blurBase =
    blur === "subtle" ? 6 :
    blur === "medium" ? 15 :
    blur === "heavy"  ? 30 : 0;
  const blurSigma = (blurBase * blurAmount).toFixed(1);

  // ── 4. Shadow spread / blur sigma ─────────────────────────────────────────
  const shadowSigma =
    shadow === "hug"    ? Math.round(8  * shadowInt) :
    shadow === "soft"   ? Math.round(20 * shadowInt) :
    shadow === "strong" ? Math.round(35 * shadowInt) : 0;

  // ── 5. Video trim + scale filter (base, shared) ────────────────────────────
  // Scale to the padded dimensions
  const vidTrimScale = [
    `[0:v] trim=start=${trimStart}:end=${effectiveTrimEnd}`,
    `setpts=PTS-STARTPTS`,
    `scale=${paddedW}:${paddedH} [vidscaled]`,
  ].join(", ");

  // Apply opacity if < 100%
  const vidOpacity =
    opacity < 100
      ? `[vidscaled] colorchannelmixer=aa=${opacityVal} [vid]`
      : `[vidscaled] copy [vid]`;

  // ── 6. Build background filter ─────────────────────────────────────────────
  let bgFilter: string;
  if (opts.backgroundUrl) {
    const blurPart = blurSigma !== "0.0" ? `gblur=sigma=${blurSigma}` : null;
    const parts = [
      `[1:v] scale=${W}:${H}:force_original_aspect_ratio=increase`,
      `crop=${W}:${H}`,
      blurPart,
      `colorchannelmixer=aa=0.85`,
    ].filter(Boolean);
    bgFilter = `${parts.join(", ")} [bg]`;
  } else {
    bgFilter = `color=black:size=${W}x${H}:rate=30 [bg]`;
  }

  // ── 7. Shadow layer (optional) ─────────────────────────────────────────────
  if (shadow !== "none" && shadowSigma > 0) {
    const shadowX = paddedX - shadowSigma;
    const shadowY = paddedY - shadowSigma;

    return [
      bgFilter,
      vidTrimScale,
      vidOpacity,
      // Split the composited video into two streams
      `[vid] split [vid1][vidforshadow]`,
      // Build the shadow: darken to black, blur it, pad so the blur doesn't clip
      `[vidforshadow] colorchannelmixer=rr=0:gg=0:bb=0:aa=${(shadowInt * 0.75).toFixed(3)}, gblur=sigma=${shadowSigma}, pad=iw+${shadowSigma * 2}:ih+${shadowSigma * 2}:${shadowSigma}:${shadowSigma}:color=black@0 [shadow]`,
      // Lay shadow under the video
      `[bg][shadow] overlay=${shadowX}:${shadowY}:format=auto [withshadow]`,
      `[withshadow][vid1] overlay=${paddedX}:${paddedY}:format=auto [out]`,
    ].join("; ");
  }

  // ── 8. Simple composite (no shadow) ────────────────────────────────────────
  return [
    bgFilter,
    vidTrimScale,
    vidOpacity,
    `[bg][vid] overlay=${paddedX}:${paddedY}:format=auto [out]`,
  ].join("; ");
}
