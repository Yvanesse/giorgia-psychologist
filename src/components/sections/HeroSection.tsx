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
                className="group inline-flex min-h-14 items-center gap-5 rounded-full border-[1.5px] border-[#2f176f] bg-primary px-6 text-[1.05rem] font-semibold tracking-[-0.01em] text-white transition-[transform,background-color] duration-300 hover:bg-primary-strong active:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-7 sm:text-lg"
                href={heroContent.primaryCta.href}
              >
                <span>{heroContent.primaryCta.label}</span>
                <span className="relative flex h-7 w-7 items-center justify-center" aria-hidden="true">
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 12H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M13.5 7.5L18 12L13.5 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <div className="hidden lg:block">
                <Button href={heroContent.secondaryCta.href} size="lg" variant="outline">
                  {heroContent.secondaryCta.label}
                </Button>
              </div>
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
