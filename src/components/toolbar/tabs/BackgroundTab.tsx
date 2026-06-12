import React, { useState, useRef } from "react";
import bg1 from "@/assets/bgs/9088083.jpg";
import bg2 from "@/assets/bgs/snowy-summit-landscape.jpg";
import bg3 from "@/assets/bgs/thomas-griesbeck-BS-Uxe8wU5Y-unsplash.jpg";
import bg4 from "@/assets/bgs/wallhaven-qrz8pl.jpg";
import bg5 from "@/assets/bgs/wallpaperflare.com_wallpaper.jpg";
import { Plus, Image as ImageIcon } from "lucide-react";
import type { ToolBarProps } from "../types";
import { Typography } from "@/design-system/Typography";

const DEFAULT_BACKGROUNDS: string[] = [bg1, bg2, bg3, bg4, bg5];

const BackgroundTab: React.FC<ToolBarProps> = ({ onBackgroundSelect }) => {
  const [backgrounds, setBackgrounds] =
    useState<string[]>(DEFAULT_BACKGROUNDS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setBackgrounds((prev) => [result, ...prev]);
      onBackgroundSelect(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {/* Upload button */}
      <button
        id="toolbar-upload-bg-btn"
        onClick={handleUploadClick}
        className="w-full h-20 rounded-md border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/40 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
      >
        <div className="p-1.5 rounded-md bg-muted">
          <Plus className="w-4 h-4 text-muted-foreground" />
        </div>
        <Typography variant="label" className="text-muted-foreground">
          Upload Custom
        </Typography>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </button>

      {/* Background thumbnails */}
      {backgrounds.map((bg, i) => (
        <button
          key={i}
          id={`toolbar-bg-thumb-${i}`}
          className="group relative w-full h-24 rounded-md border border-border cursor-pointer overflow-hidden hover:border-primary transition-colors"
          onClick={() => onBackgroundSelect(bg)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
          />
          {/* Hover overlay with icon — flat, no scale */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
          <div className="absolute bottom-2 right-2 p-1.5 rounded-sm bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <ImageIcon className="w-3 h-3 text-white" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default BackgroundTab;
