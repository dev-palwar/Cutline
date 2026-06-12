import { Link } from "react-router";
import { FOOTER_CONFIG } from "@/configs/landing.config";
import { Typography } from "@/design-system/Typography";

export default function Footer() {
  const { brandName, copyright, links } = FOOTER_CONFIG;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Brand */}
          <span className="bg-brand-gradient text-primary-foreground px-3 py-1 type-label tracking-widest uppercase">
            {brandName}
          </span>

          {/* Links */}
          <div className="flex items-center gap-6">
            {links.map((link) =>
              link.internal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ),
            )}
          </div>

          {/* Copyright */}
          <Typography variant="caption" className="text-muted-foreground">
            {copyright}
          </Typography>
        </div>
      </div>
    </footer>
  );
}
