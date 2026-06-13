import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ToolBarProps } from "../types";
import { Typography } from "@/design-system/Typography";

const Section = ({ title, defaultOpen = true, children }: { title: string, defaultOpen?: boolean, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="mb-6 last:mb-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full mb-3 cursor-pointer group"
      >
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`} />
        <Typography variant="label" className="text-muted-foreground group-hover:text-foreground transition-colors font-semibold tracking-wider text-[11px] uppercase">
          {title}
        </Typography>
      </button>
      {isOpen && <div className="space-y-4 pl-1">{children}</div>}
    </div>
  );
};

const CustomSlider = ({ label, value, onChange, min = 0, max = 100, step = 1, formatValue = (v: number) => v.toString() }: any) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="relative h-8 w-full bg-muted/40 rounded-md flex items-center px-3 overflow-hidden group">
      <div 
        className="absolute left-0 top-0 bottom-0 bg-muted-foreground/20 transition-all duration-75" 
        style={{ width: `${percentage}%` }} 
      />
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-muted-foreground/60 rounded-full transition-all duration-75" 
        style={{ left: `calc(${percentage}% - 1px)` }} 
      />
      
      <span className="relative z-10 text-xs text-muted-foreground pointer-events-none">{label}</span>
      <span className="relative z-10 text-xs text-foreground ml-auto pointer-events-none tabular-nums">{formatValue(value)}</span>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full m-0"
      />
    </div>
  );
};

const OptionButton = ({ label, isActive, onClick, children }: { label: string, isActive: boolean, onClick: () => void, children: React.ReactNode }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1.5 cursor-pointer w-full group">
    <div className={`w-full aspect-square rounded-lg p-1 transition-all ${isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background bg-muted/50' : 'hover:bg-muted/30 bg-transparent'}`}>
      <div className="w-full h-full rounded-md overflow-hidden flex items-center justify-center">
        {children}
      </div>
    </div>
    <Typography variant="caption" className={`text-[10px] ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
      {label}
    </Typography>
  </button>
);

const DesignTab: React.FC<ToolBarProps> = (props) => {
  const { designSettings, setDesignSettings } = props;
  
  const updateSetting = (key: keyof typeof designSettings, value: any) => {
    setDesignSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const { style, padding, opacity, borderStyle, radius, scale, shadow } = designSettings;

  return (
    <div className="grid grid-cols-1 gap-2">
      <Section title="Style">
        <div className="grid grid-cols-3 gap-x-4 gap-y-4 mb-4">
          <OptionButton label="Default" isActive={style === "default"} onClick={() => updateSetting("style", "default")}>
            <div className="w-full h-full bg-white rounded-md shadow-sm" />
          </OptionButton>
          <OptionButton label="Glass Light" isActive={style === "glass-light"} onClick={() => updateSetting("style", "glass-light")}>
            <div className="w-full h-full bg-white/80 rounded-md border border-white shadow-sm flex items-center justify-center p-1.5">
               <div className="w-full h-full bg-white rounded-sm" />
            </div>
          </OptionButton>
          <OptionButton label="Glass Dark" isActive={style === "glass-dark"} onClick={() => updateSetting("style", "glass-dark")}>
            <div className="w-full h-full bg-black/40 rounded-md border border-white/10 shadow-sm flex items-center justify-center p-1.5">
               <div className="w-full h-full bg-white rounded-sm" />
            </div>
          </OptionButton>
          <OptionButton label="Outline" isActive={style === "outline"} onClick={() => updateSetting("style", "outline")}>
            <div className="w-full h-full bg-white/10 rounded-md border-2 border-white/20 flex items-center justify-center p-1.5">
               <div className="w-full h-full bg-white rounded-sm" />
            </div>
          </OptionButton>
          <OptionButton label="Border" isActive={style === "border"} onClick={() => updateSetting("style", "border")}>
            <div className="w-full h-full bg-white rounded-md border-4 border-muted flex items-center justify-center">
               <div className="w-full h-full bg-white rounded-sm" />
            </div>
          </OptionButton>
          <OptionButton label="Border Dark" isActive={style === "border-dark"} onClick={() => updateSetting("style", "border-dark")}>
            <div className="w-full h-full bg-black/80 rounded-md border-4 border-zinc-800 flex items-center justify-center p-1">
               <div className="w-full h-full bg-white rounded-sm" />
            </div>
          </OptionButton>
        </div>
        
        <div className="space-y-2">
          <CustomSlider 
            label="Padding" 
            value={padding} 
            onChange={(v: number) => updateSetting("padding", v)} 
            min={0} max={5} step={0.1} 
            formatValue={(v: number) => v.toFixed(1)} 
          />
          <CustomSlider 
            label="Opacity" 
            value={opacity} 
            onChange={(v: number) => updateSetting("opacity", v)} 
            min={0} max={100} step={1} 
            formatValue={(v: number) => `${v}%`} 
          />
        </div>
      </Section>

      <Section title="Border">
        <div className="grid grid-cols-3 gap-x-4 gap-y-4 mb-4">
          <OptionButton label="Sharp" isActive={borderStyle === "sharp"} onClick={() => updateSetting("borderStyle", "sharp")}>
            <div className="w-full h-full bg-muted/30 p-1.5 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-none shadow-sm" />
            </div>
          </OptionButton>
          <OptionButton label="Curved" isActive={borderStyle === "curved"} onClick={() => updateSetting("borderStyle", "curved")}>
            <div className="w-full h-full bg-muted/30 p-1.5 rounded-lg flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-md shadow-sm" />
            </div>
          </OptionButton>
          <OptionButton label="Round" isActive={borderStyle === "round"} onClick={() => updateSetting("borderStyle", "round")}>
            <div className="w-full h-full bg-muted/30 p-1.5 rounded-2xl flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-xl shadow-sm" />
            </div>
          </OptionButton>
        </div>
        
        <div className="space-y-2">
          <CustomSlider 
            label="Radius" 
            value={radius} 
            onChange={(v: number) => updateSetting("radius", v)} 
            min={0} max={100} step={1} 
          />
          <CustomSlider 
            label="Scale" 
            value={scale} 
            onChange={(v: number) => updateSetting("scale", v)} 
            min={0.1} max={2.0} step={0.1} 
            formatValue={(v: number) => v.toFixed(1)} 
          />
        </div>
      </Section>

      <Section title="Shadow">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <OptionButton label="None" isActive={shadow === "none"} onClick={() => updateSetting("shadow", "none")}>
            <div className="w-full h-full bg-muted/20 p-2 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-md" />
            </div>
          </OptionButton>
          <OptionButton label="Hug" isActive={shadow === "hug"} onClick={() => updateSetting("shadow", "hug")}>
            <div className="w-full h-full bg-muted/20 p-2 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-md shadow-md" />
            </div>
          </OptionButton>
          <OptionButton label="Soft" isActive={shadow === "soft"} onClick={() => updateSetting("shadow", "soft")}>
            <div className="w-full h-full bg-muted/20 p-2 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-md shadow-xl" />
            </div>
          </OptionButton>
          <OptionButton label="Strong" isActive={shadow === "strong"} onClick={() => updateSetting("shadow", "strong")}>
            <div className="w-full h-full bg-muted/20 p-2 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
            </div>
          </OptionButton>
        </div>
      </Section>
    </div>
  );
};

export default DesignTab;
