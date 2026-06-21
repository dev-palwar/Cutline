import { useRef, useState, useEffect, useCallback } from "react";
import { Typography } from "@/design-system/Typography";
import { Play, Pause } from "lucide-react";

interface TimelineProps {
  duration: number;
  trimStart: number;
  trimEnd: number;
  currentTime: number;
  setTrimStart: (time: number) => void;
  setTrimEnd: (time: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
}

const MIN_TRIM_DURATION = 1; // seconds

export default function Timeline({
  duration,
  trimStart,
  trimEnd,
  currentTime,
  setTrimStart,
  setTrimEnd,
  isPlaying,
  onPlayPause,
  onSeek,
}: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"start" | "end" | "playhead" | null>(null);

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
      } else if (dragging === "end") {
        setTrimEnd(Math.max(trimStart + MIN_TRIM_DURATION, Math.min(newTime, duration)));
      } else if (dragging === "playhead") {
        onSeek(Math.max(0, Math.min(newTime, duration)));
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
  }, [dragging, trimStart, trimEnd, duration, setTrimStart, setTrimEnd, pixelToTime, onSeek]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startPercent = (trimStart / duration) * 100;
  const endPercent = (trimEnd / duration) * 100;
  const playheadPercent = (currentTime / duration) * 100;

  const handleTrackClick = (e: React.MouseEvent) => {
    if (dragging) return;
    const newTime = pixelToTime(e.clientX);
    onSeek(newTime);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Controls row */}
      <div className="flex items-center gap-4">
        <button
          onClick={onPlayPause}
          className="text-foreground hover:text-primary transition-colors focus:outline-none"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5" fill="currentColor" />}
        </button>
        <Typography variant="code" className="text-muted-foreground select-none">
          {formatTime(currentTime)} / {formatTime(duration)}
        </Typography>
      </div>

      {/* Timeline track */}
      <div
        ref={trackRef}
        className="relative h-16 bg-muted/20 rounded-md overflow-hidden cursor-pointer select-none border border-border/50"
        onMouseDown={handleTrackClick}
      >
        {/* Dimmed regions outside trim */}
        <div
          className="absolute top-0 bottom-0 left-0 bg-black/60 z-10 pointer-events-none"
          style={{ width: `${startPercent}%` }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 bg-black/60 z-10 pointer-events-none"
          style={{ width: `${100 - endPercent}%` }}
        />

        {/* Selected region borders */}
        <div
          className="absolute top-0 bottom-0 border-y-2 border-primary z-10 pointer-events-none"
          style={{ left: `${startPercent}%`, width: `${endPercent - startPercent}%` }}
        />

        {/* Placeholder video thumbnail background */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-700 opacity-30 pointer-events-none" />

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-px bg-primary z-30 flex justify-center cursor-ew-resize group"
          style={{ left: `${playheadPercent}%` }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDragging("playhead");
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setDragging("playhead");
          }}
        >
          <div className="absolute -top-1 w-3 h-3 bg-primary rounded-full shadow-sm group-hover:scale-125 transition-transform" />
          <div className="absolute inset-y-0 w-4 -ml-2" /> {/* Extended hit area */}
        </div>

        {/* Start handle */}
        <div
          className="absolute top-0 bottom-0 w-4 bg-primary z-40 cursor-ew-resize flex items-center justify-center group"
          style={{ left: `calc(${startPercent}% - 8px)` }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDragging("start");
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setDragging("start");
          }}
        >
          <div className="w-1 h-6 bg-primary-foreground/60 rounded-full group-hover:bg-primary-foreground transition-colors" />
        </div>

        {/* End handle */}
        <div
          className="absolute top-0 bottom-0 w-4 bg-primary z-40 cursor-ew-resize flex items-center justify-center group"
          style={{ left: `calc(${endPercent}% - 8px)` }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDragging("end");
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setDragging("end");
          }}
        >
          <div className="w-1 h-6 bg-primary-foreground/60 rounded-full group-hover:bg-primary-foreground transition-colors" />
        </div>
      </div>
    </div>
  );
}
