import { COMING_SOON_CONFIG } from "@/configs/landing.config";
import { Typography } from "@/design-system/Typography";

export default function ComingSoonSection() {
  const { sectionLabel, headline, subtext, items, statusColors } =
    COMING_SOON_CONFIG;

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <Typography variant="overline" className="text-chart-2">
            {sectionLabel}
          </Typography>
          <Typography variant="h2" as="h2" className="mt-3 text-foreground">
            {headline}
          </Typography>
          <Typography variant="body" className="mt-4 text-muted-foreground">
            {subtext}
          </Typography>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => {
            const { bg, text } = statusColors[item.status];
            return (
              <div
                key={i}
                className="rounded-xl border border-dashed border-border bg-card/50 p-6 hover:bg-card transition-colors duration-200"
              >
                {/* Status badge */}
                <div
                  className="mb-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                  style={{ background: bg, color: text }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: text }}
                  />
                  <Typography variant="overline" style={{ color: text } as React.CSSProperties}>
                    {item.status}
                  </Typography>
                </div>

                <Typography variant="h3" as="h3" className="text-foreground">
                  {item.title}
                </Typography>
                <Typography
                  variant="body-sm"
                  className="mt-2 text-muted-foreground"
                >
                  {item.description}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
