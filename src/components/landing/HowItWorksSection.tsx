import { HOW_IT_WORKS_CONFIG, GRADIENT } from "@/configs/landing.config";
import { Typography } from "@/design-system/Typography";

export default function HowItWorksSection() {
  const { sectionLabel, headline, subtext, steps } = HOW_IT_WORKS_CONFIG;

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <Typography variant="overline" className="text-primary">
            {sectionLabel}
          </Typography>
          <Typography variant="h2" as="h2" className="mt-3 text-foreground">
            {headline}
          </Typography>
          <Typography variant="body" className="mt-4 text-muted-foreground">
            {subtext}
          </Typography>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Connecting line */}
          <div
            className="absolute top-16 left-[16.6%] right-[16.6%] hidden h-px md:block opacity-30"
            style={{ background: GRADIENT }}
          />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {/* Icon container */}
              <div
                className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-border"
                style={{
                  backgroundColor: step.bgColor,
                  color: step.color,
                }}
              >
                <step.icon className="h-6 w-6" />
              </div>

              {/* Step number */}
              <Typography
                variant="code"
                className="mb-2 block"
                style={{ color: step.color } as React.CSSProperties}
              >
                STEP {step.number}
              </Typography>

              <Typography variant="h3" as="h3" className="text-foreground">
                {step.title}
              </Typography>
              <Typography
                variant="body-sm"
                className="mt-2 text-muted-foreground"
              >
                {step.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
