import Link from "next/link";

import { heroContent, sharedContent } from "@/data";
import { Button, Container, Text } from "@/components/ui";
import { LocalPhoto } from "./LocalPhoto";

export function HeroSection() {
  return (
    <section className="hero-surface overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
      <Container variant="wide">
        <div className="grid items-center gap-7 sm:gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
          <div className="max-w-3xl">
            <h1 className="text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.052em] text-ink min-[390px]:text-5xl sm:text-[3.5rem] lg:text-[4.4rem]">
              {heroContent.title}
            </h1>
            <Text className="mt-5 max-w-2xl text-[1.15rem] leading-8 sm:mt-7 sm:text-[1.35rem]">
              {heroContent.subtitle}
            </Text>
            <div className="mt-7 flex items-center gap-3 sm:mt-9">
              <Link
                className="group inline-flex min-h-14 items-center justify-between gap-6 rounded-full border border-primary bg-primary px-7 text-lg font-semibold tracking-tight text-white shadow-[0_12px_30px_rgba(91,53,245,.18)] transition-[transform,box-shadow,background-color] duration-300 hover:bg-primary-strong hover:shadow-[0_16px_34px_rgba(91,53,245,.24)] active:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-8"
                href={heroContent.primaryCta.href}
              >
                <span>{heroContent.primaryCta.label}</span>
                <span
                  aria-hidden="true"
                  className="text-2xl leading-none transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Button className="hidden sm:inline-flex" href={heroContent.secondaryCta.href} size="lg" variant="outline">
                {heroContent.secondaryCta.label}
              </Button>
            </div>
          </div>
          <LocalPhoto
            asset={heroContent.image}
            className="aspect-[4/4.6] max-h-[37rem] rounded-[2rem] lg:justify-self-end lg:w-full"
            placeholder={sharedContent.photoPlaceholder}
            sizes="(min-width: 1024px) 42vw, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}
