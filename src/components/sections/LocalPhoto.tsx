"use client";

import { useState } from "react";

import type { MediaAsset } from "@/types/content";
import { cn } from "@/components/ui/utils";

type LocalPhotoProps = {
  asset: MediaAsset;
  placeholder: string;
  className?: string;
  sizes: string;
};

export function LocalPhoto({ asset, placeholder, className, sizes }: LocalPhotoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-primary/[0.055]", className)}>
      <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-base text-ink-muted">
        {placeholder}
      </div>
      {!failed ? (
        // A native image allows the local, optional asset to fail without breaking the page.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={asset.alt}
          className="absolute inset-0 size-full object-cover"
          height={asset.height}
          onError={() => setFailed(true)}
          sizes={sizes}
          src={asset.src}
          width={asset.width}
        />
      ) : null}
    </div>
  );
}
