import { ArrowRight, Play, Sparkles } from "lucide-react";
import demoVideo from "@/assets/display/frameful-edited-2026-02-22(1).webm";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { HERO_CONFIG, GRADIENT, GRADIENT_REVERSE } from "@/configs/landing.config";
import { Typography } from "@/design-system/Typography";

export default function Hero() {
  const navigate = useNavigate();
  const cfg = HERO_CONFIG;

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background gradient blobs — decorative only, pointer-events-none */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 blur-[100px] opacity-25"
          style={{ background: GRADIENT }}
        />
        <div
          className="absolute top-20 right-0 h-[400px] w-[400px] blur-[80px] opacity-10"
          style={{ background: GRADIENT_REVERSE }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <Typography variant="label" className="text-primary">
            {cfg.badge}
          </Typography>
        </div>

        {/* Headline */}
        <Typography
          variant="display"
          as="h1"
          className="animate-fade-up delay-100 text-foreground"
        >
          {cfg.headlineStatic}
          <br />
          <span className="text-brand-gradient">{cfg.headlineGradient}</span>
        </Typography>

        {/* Subtext */}
        <Typography
          variant="body"
          className="animate-fade-up delay-200 mx-auto mt-6 max-w-2xl text-muted-foreground md:text-[1.125rem]"
        >
          {cfg.subtext}
        </Typography>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            id="hero-record-btn"
            size="lg"
            className="gap-2 px-8"
            onClick={() => navigate("/record")}
          >
            {cfg.primaryCtaLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            id="hero-how-btn"
            variant="outline"
            size="lg"
            className="gap-2 px-8"
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Play className="h-4 w-4" />
            {cfg.secondaryCtaLabel}
          </Button>
        </div>

        <Typography
          variant="caption"
          className="animate-fade-up delay-400 mt-4 text-muted-foreground"
        >
          {cfg.browserSupportNote}
        </Typography>

        {/* Hero mock — browser recorder preview */}
        <div className="animate-fade-up delay-500 mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-xl border border-border bg-card animate-pulse-glow">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
              <div className="flex gap-1.5">
                {/* Traffic lights — decorative, colours intentionally semantic-neutral */}
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-amber-400/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
              </div>
              <div className="ml-3 flex-1 rounded bg-background/70 px-3 py-1">
                <Typography variant="caption" className="text-muted-foreground">
                  {cfg.mockAddressBar}
                </Typography>
              </div>
            </div>

            {/* Product demo video */}
            <video
              src={demoVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
