import React from "react";
import { Container } from "./container";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-earth-200 bg-earth-50 py-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <Logo size="sm" />
            <p className="mt-3 text-sm text-earth-500">
              Inspiration and motivation for the Bodo community and beyond.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-heading font-semibold text-earth-800 mb-3">Platform</h4>
              <ul className="space-y-2 text-earth-500">
                <li><a href={process.env.NEXT_PUBLIC_CAREERS_URL || "#"} className="hover:text-thulunga-600">Careers</a></li>
                <li><span className="text-earth-300">Connect (coming soon)</span></li>
                <li><span className="text-earth-300">Learn (coming soon)</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-earth-800 mb-3">About</h4>
              <ul className="space-y-2 text-earth-500">
                <li><a href="/about" className="hover:text-thulunga-600">Our Mission</a></li>
                <li><a href="/contact" className="hover:text-thulunga-600">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-earth-200 pt-6 text-center text-xs text-earth-400">
          &copy; {new Date().getFullYear()} Thulunga. Built with pride from Bodoland.
        </div>
      </Container>
    </footer>
  );
}
