"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site.config";
import { sharedContent } from "@/data";
import { Button, Container } from "@/components/ui";

const mobileAccents = ["#6848ed", "#d36e59", "#5d8f6f"] as const;

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeMobileMenu();
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-sm">
      <Container variant="wide">
        <div className="flex min-h-20 items-center justify-between gap-5">
          <Link
            aria-label={siteConfig.name}
            className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            href="/"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="hidden size-10 min-[390px]:block" height="40" src={siteConfig.logo.src} width="40" />
            <span className="text-base font-semibold tracking-tight sm:text-lg">{siteConfig.name}</span>
          </Link>

          <nav aria-label={sharedContent.openMenu} className="hidden items-center gap-6 lg:flex">
            {siteConfig.navigation.map((item) => (
              <a
                className="group relative py-2 text-base font-medium text-ink-soft transition-colors hover:text-ink focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                href={item.href}
                key={item.label}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <Button className="hidden sm:inline-flex" href={siteConfig.cta.href}>
            {siteConfig.cta.label}
          </Button>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Chiudi menu" : sharedContent.openMenu}
            className="relative flex size-12 items-center justify-center rounded-full border-[1.5px] border-black text-ink transition-[transform,background-color] duration-300 active:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:hidden"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            type="button"
          >
            <span aria-hidden="true" className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-[4px] h-px w-5 bg-current transition-[transform,top] duration-300 ${
                  isMobileMenuOpen ? "top-[9px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] h-px w-5 bg-current transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-px w-5 bg-current transition-[transform,top] duration-300 ${
                  isMobileMenuOpen ? "top-[9px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 z-[60] lg:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <button
          aria-label="Chiudi menu"
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
          tabIndex={isMobileMenuOpen ? 0 : -1}
          type="button"
        />

        <div
          className={`absolute right-0 top-0 flex h-dvh w-[min(88vw,25rem)] flex-col border-l border-black/10 bg-[#fbfaff] px-6 pb-7 pt-6 shadow-2xl transition-transform duration-500 ease-out sm:px-8 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          id="mobile-navigation"
        >
          <div className="flex items-center justify-between gap-5 border-b border-black/10 pb-5">
            <Link className="flex min-w-0 items-center gap-3" href="/" onClick={closeMobileMenu} tabIndex={isMobileMenuOpen ? 0 : -1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="size-10 shrink-0" height="40" src={siteConfig.logo.src} width="40" />
              <span className="min-w-0 text-base font-semibold tracking-tight text-ink">{siteConfig.name}</span>
            </Link>

            <button
              aria-label="Chiudi menu"
              className="flex size-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-black text-2xl leading-none text-ink transition-transform active:scale-95"
              onClick={closeMobileMenu}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav aria-label={sharedContent.openMenu} className="mt-7 flex flex-1 flex-col">
            {siteConfig.navigation.map((item, index) => (
              <a
                className={`group flex items-center gap-4 border-b border-black/10 py-4 text-[1.55rem] font-semibold leading-tight tracking-[-0.035em] text-ink transition-[opacity,transform,color] duration-500 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                  isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                }`}
                href={item.href}
                key={item.label}
                onClick={closeMobileMenu}
                style={{ transitionDelay: isMobileMenuOpen ? `${80 + index * 45}ms` : "0ms" }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: mobileAccents[index % mobileAccents.length] }}
                />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div
            className={`pt-6 transition-[opacity,transform] duration-500 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "340ms" : "0ms" }}
          >
            <p className="mb-3 text-sm leading-6 text-ink-soft">Un primo colloquio per capire insieme da dove iniziare.</p>
            <Button className="w-full" href={siteConfig.cta.href} onClick={closeMobileMenu} size="lg" tabIndex={isMobileMenuOpen ? 0 : -1}>
              Prenota un colloquio <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
