import { useRef, useState, useEffect, useCallback } from "react";
import { Typography } from "@/design-system/Typography";

interface TimelineProps {
  duration: number;
  trimStart: number;
  trimEnd: number;
  currentTime: number;
  setTrimStart: (time: number) => void;
  setTrimEnd: (time: number) => void;
}

const MIN_TRIM_DURATION = 1; // seconds

export default function Timeline({
  duration,
  trimStart,
  trimEnd,
  currentTime,
  setTrimStart,
  setTrimEnd,
}: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"start" | "end" | null>(null);

  const pixelToTime = useCallback(
    (pixel: number): number => {
      if (!trackRef.current) return 0;
      const trackWidth = trackRef.current.offsetWidth;
      const rect = trackRef.current.getBoundingClientRect();
      const relativeX = pixel - rect.left;
      const clampedX = Math.max(0, Math.min(relativeX, trackWidth));
      return (clampedX / trackWidth) * duration;
    },
    [duration],
  );

  useEffect(() => {
    if (!dragging) return;

    const getClientX = (e: MouseEvent | TouchEvent): number => {
      if ("touches" in e) return e.touches[0]?.clientX ?? 0;
      return e.clientX;
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const newTime = pixelToTime(getClientX(e));
      if (dragging === "start") {
        setTrimStart(Math.max(0, Math.min(newTime, trimEnd - MIN_TRIM_DURATION)));
      } else {
        setTrimEnd(Math.max(trimStart + MIN_TRIM_DURATION, Math.min(newTime, duration)));
      }
    };

    const handleUp = () => setDragging(null);

    document.addEventListener("mousemove", handleMove as EventListener);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchmove", handleMove as EventListener, { passive: false });
    document.addEventListener("touchend", handleUp);

    return () => {
      document.removeEventListener("mousemove", handleMove as EventListener);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove as EventListener);
      document.removeEventListener("touchend", handleUp);
    };
  }, [dragging, trimStart, trimEnd, duration, setTrimStart, setTrimEnd, pixelToTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startPercent = (trimStart / duration) * 100;
  const endPercent = (trimEnd / duration) * 100;
  const playheadPercent = (currentTime / duration) * 100;

  return (
    <div className="w-full space-y-3">
      {/* Time labels */}
      <div className="flex items-center justify-between gap-2">
        <Typography variant="code" className="text-muted-foreground shrink-0">
          {formatTime(trimStart)}
        </Typography>
        <Typography variant="caption" className="opacity-60 truncate text-center text-muted-foreground">
          Duration: {formatTime(trimEnd - trimStart)}
        </Typography>
        <Typography variant="code" className="text-muted-foreground shrink-0">
          {formatTime(trimEnd)}
        </Typography>
      </div>

      {/* Timeline track */}
      <div
        ref={trackRef}
        className="relative h-12 bg-muted/40 rounded-md overflow-visible cursor-pointer select-none border border-border"
      >
        {/* Dimmed regions outside trim */}
        <div
          className="absolute top-0 bottom-0 left-0 bg-foreground/10"
          style={{ width: `${startPercent}%` }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 bg-foreground/10"
          style={{ width: `${100 - endPercent}%` }}
        />

        {/* Selected region */}
        <div
          className="absolute top-0 bottom-0 bg-primary/15 border-y-2 border-primary/50"
          style={{ left: `${startPercent}%`, width: `${endPercent - startPercent}%` }}
        />

        {/* Playhead */}
        {currentTime >= trimStart && currentTime <= trimEnd && (
          <div
            className="absolute top-0 bottom-0 w-px bg-primary z-20"
            style={{ left: `${playheadPercent}%` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
          </div>
        )}

        {/* Start handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 cursor-ew-resize"
          style={{ left: `${startPercent}%` }}
          onMouseDown={() => setDragging("start")}
          onTouchStart={() => setDragging("start")}
        >
          <div className="w-4 h-10 bg-card border-2 border-primary rounded-sm flex items-center justify-center">
            <div className="w-px h-5 bg-primary/50 rounded-full" />
          </div>
        </div>

        {/* End handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 z-30 cursor-ew-resize"
          style={{ left: `${endPercent}%` }}
          onMouseDown={() => setDragging("end")}
          onTouchStart={() => setDragging("end")}
        >
          <div className="w-4 h-10 bg-card border-2 border-primary rounded-sm flex items-center justify-center">
            <div className="w-px h-5 bg-primary/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Total duration */}
      <div className="text-center">
        <Typography variant="caption" className="text-muted-foreground/60">
          Total: {formatTime(duration)}
        </Typography>
      </div>
    </div>
  );
}
