import { useState } from "react";
import { Mail, ArrowRight, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WAITLIST_CONFIG } from "@/configs/landing.config";
import { Typography } from "@/design-system/Typography";

type FormState = "idle" | "submitting" | "success" | "error";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const cfg = WAITLIST_CONFIG;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || state === "submitting") return;

    setState("submitting");

    try {
      const res = await fetch(cfg.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setState(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-2xl px-8 py-16 text-center text-primary-foreground md:px-16 bg-brand-gradient">
          {/* Decorative blobs — subdued, no shadows */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute -top-20 -left-20 h-60 w-60 bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 bg-white/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <Mail className="h-3.5 w-3.5" />
              <Typography variant="label">{cfg.badgeLabel}</Typography>
            </div>

            <Typography variant="h2" as="h2">
              {cfg.headline}
            </Typography>

            <Typography
              variant="body"
              className="mx-auto mt-4 max-w-lg text-white/80"
            >
              {cfg.subtext}
            </Typography>

            {state === "success" ? (
              <div className="mx-auto mt-8 max-w-md animate-fade-up">
                <div className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  <Typography variant="body-sm" className="font-medium">
                    {cfg.successMessage}
                  </Typography>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  id="waitlist-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === "submitting"}
                  placeholder={cfg.inputPlaceholder}
                  className="flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm outline-none transition-colors focus:border-white/40 focus:bg-white/15 disabled:opacity-60 type-body-sm"
                />
                <Button
                  id="waitlist-submit-btn"
                  type="submit"
                  size="lg"
                  disabled={state === "submitting"}
                  className="gap-2 bg-white px-8 font-semibold hover:bg-white/90 disabled:opacity-70 text-primary"
                >
                  {state === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <Typography variant="body-sm">Sending…</Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="body-sm">{cfg.ctaLabel}</Typography>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {state === "error" && (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-white/70">
                <AlertCircle className="h-4 w-4" />
                <Typography variant="caption">{cfg.errorMessage}</Typography>
              </div>
            )}

            <Typography variant="caption" className="mt-4 text-white/50">
              {cfg.disclaimer}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
