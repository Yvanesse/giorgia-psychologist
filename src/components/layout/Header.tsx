import Link from "next/link";

import { siteConfig } from "@/config/site.config";
import { sharedContent } from "@/data";
import { Button, Container } from "@/components/ui";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-sm">
      <Container variant="wide">
        <div className="flex min-h-20 items-center justify-between gap-5">
          <Link className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="/" aria-label={siteConfig.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="hidden size-10 min-[390px]:block" height="40" src={siteConfig.logo.src} width="40" />
            <span className="text-base font-semibold tracking-tight sm:text-lg">{siteConfig.name}</span>
          </Link>
          <nav aria-label={sharedContent.openMenu} className="hidden items-center gap-6 lg:flex">
            {siteConfig.navigation.map((item) => <a className="text-base font-medium text-ink-soft transition-colors hover:text-primary focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href={item.href} key={item.label}>{item.label}</a>)}
          </nav>
          <Button className="hidden sm:inline-flex" href={siteConfig.cta.href}>{siteConfig.cta.label}</Button>
          <details className="relative lg:hidden">
            <summary aria-label={sharedContent.openMenu} className="flex size-12 cursor-pointer list-none items-center justify-center rounded-full border border-border text-ink marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <span aria-hidden="true" className="flex flex-col gap-1.5"><span className="h-px w-5 bg-current" /><span className="h-px w-5 bg-current" /><span className="h-px w-5 bg-current" /></span>
            </summary>
            <nav className="absolute right-0 top-14 w-[min(19rem,calc(100vw-3rem))] rounded-2xl border border-border bg-white p-3 shadow-xl" aria-label={sharedContent.openMenu}>
              {siteConfig.navigation.map((item) => <a className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href={item.href} key={item.label}>{item.label}</a>)}
              <Button className="mt-2 w-full sm:hidden" href={siteConfig.cta.href}>{siteConfig.cta.label}</Button>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
