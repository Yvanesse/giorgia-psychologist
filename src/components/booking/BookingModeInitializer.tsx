"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function BookingModeInitializer() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const requestedMode = searchParams.get("mode");
    if (requestedMode !== "online" && requestedMode !== "in-presenza") return;

    const desiredLabel = requestedMode === "online" ? "Online" : "In presenza";
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("button"));
    const targetButton = buttons.find((button) =>
      Array.from(button.querySelectorAll("span")).some((span) => span.textContent?.trim() === desiredLabel),
    );

    targetButton?.click();
  }, [searchParams]);

  return null;
}
