"use client";

import { useEffect, useState } from "react";

export function StickyBookingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      frame = 0;
      const hero = document.getElementById("homepage-hero");
      const finalContact = document.getElementById("contatti");
      const smallScreen = window.innerWidth < 640;
      const pastHero = Boolean(hero && hero.getBoundingClientRect().bottom < 0);
      const nearFinalContact = Boolean(
        finalContact && finalContact.getBoundingClientRect().top < window.innerHeight - 96,
      );
      const show = smallScreen && pastHero && !nearFinalContact;

      setVisible(show);
      document.documentElement.classList.toggle("has-sticky-booking-cta", show);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-sticky-booking-cta");
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="border-t border-border bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_28px_rgba(24,24,27,0.08)] backdrop-blur-md">
        <a
          className={`mx-auto flex min-h-12 w-full max-w-lg items-center justify-center gap-2 rounded-full border-[1.5px] border-black bg-primary px-5 text-base font-semibold text-white transition-colors hover:bg-primary-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            visible ? "pointer-events-auto" : "pointer-events-none"
          }`}
          href="/prenota"
          style={{ color: "#ffffff" }}
          tabIndex={visible ? 0 : -1}
        >
          Prenota un colloquio
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
