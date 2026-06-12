import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Timeline from "./Timeline";
import { Play, Pause } from "lucide-react";
import { Typography } from "@/design-system/Typography";

export interface VideoPlayerHandle {
  trimStart: number;
  trimEnd: number;
}

interface VideoPlayerProps {
  videoUrl: string;
  background?: string;
  className?: string;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  function VideoPlayer({ videoUrl, background = "", className = "" }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [trimStart, setTrimStart] = useState<number>(0);
    const [trimEnd, setTrimEnd] = useState<number>(0);

    useImperativeHandle(ref, () => ({ trimStart, trimEnd }), [trimStart, trimEnd]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleLoadedMetadata = () => {
        const d = video.duration;
        setDuration(d);
        setTrimStart(0);
        setTrimEnd(d);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }, [videoUrl]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleTimeUpdate = () => {
        const current = video.currentTime;
        setCurrentTime(current);
        if (current >= trimEnd) {
          video.pause();
          setIsPlaying(false);
          video.currentTime = trimStart;
        }
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      };
    }, [trimStart, trimEnd]);

    const handlePlayPause = () => {
      const video = videoRef.current;
      if (!video) return;

      if (isPlaying) {
        video.pause();
      } else {
        if (video.currentTime < trimStart || video.currentTime >= trimEnd) {
          video.currentTime = trimStart;
        }
        video.play();
      }
    };

    return (
      <>
        {/* 16:9 Cinematic Preview */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          {/* Blurred background layer */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-[1px] opacity-80"
            style={{
              backgroundImage: background ? `url(${background})` : "none",
            }}
          />

          {/* Video layer */}
          <div
            className={`absolute inset-0 flex items-center justify-center p-3 sm:p-5 lg:p-8 ${className}`}
          >
            <video
              ref={videoRef}
              id="studio-video-player"
              src={videoUrl}
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        </div>

        {/* Controls — below the video */}
        <div className="space-y-4 px-6 pt-2 pb-5">
          {duration > 0 && (
            <Timeline
              duration={duration}
              trimStart={trimStart}
              trimEnd={trimEnd}
              currentTime={currentTime}
              setTrimStart={setTrimStart}
              setTrimEnd={setTrimEnd}
            />
          )}

          {/* Play / Pause */}
          <div className="flex items-center justify-center">
            <button
              id="studio-play-pause-btn"
              onClick={handlePlayPause}
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-gradient text-primary-foreground cursor-pointer type-label"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" fill="currentColor" />
                  <Typography variant="label" as="span">Pause</Typography>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" fill="currentColor" />
                  <Typography variant="label" as="span">Play Trimmed</Typography>
                </>
              )}
            </button>
          </div>
        </div>
      </>
    );
  },
);

export default VideoPlayer;
