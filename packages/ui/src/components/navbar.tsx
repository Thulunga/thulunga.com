import React from "react";
import { Logo } from "./logo";
import { Container } from "./container";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items?: NavItem[];
  currentApp?: string;
  children?: React.ReactNode;
}

export function Navbar({ items = [], currentApp, children }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-earth-200 bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <a href={process.env.NEXT_PUBLIC_APP_URL || "/"}>
            <Logo size="sm" />
          </a>
          {currentApp && (
            <span className="text-sm font-medium text-earth-400">/ {currentApp}</span>
          )}
          <div className="hidden md:flex items-center gap-6">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-earth-600 hover:text-thulunga-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">{children}</div>
      </Container>
    </nav>
  );
}
