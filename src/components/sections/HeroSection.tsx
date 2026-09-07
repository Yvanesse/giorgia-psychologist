import Link from "next/link";

import { heroContent, sharedContent } from "@/data";
import { Button, Container, Text } from "@/components/ui";
import { LocalPhoto } from "./LocalPhoto";

export function HeroSection() {
  const startWord = "Comprendere";
  const endWord = "cambiamento";
  const startIndex = heroContent.title.indexOf(startWord);
  const endIndex = heroContent.title.indexOf(endWord);
  const canHighlightTitle = startIndex !== -1 && endIndex > startIndex;

  return (
    <section className="hero-surface overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
      <Container variant="wide">
        <div className="grid items-center gap-7 sm:gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
          <div className="max-w-3xl">
            <h1 className="text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.052em] text-ink min-[390px]:text-5xl sm:text-[3.5rem] lg:text-[4.4rem]">
              {canHighlightTitle ? (
                <>
                  {heroContent.title.slice(0, startIndex)}
                  <span className="text-[#d36e59]">{startWord}</span>
                  {heroContent.title.slice(startIndex + startWord.length, endIndex)}
                  <span className="text-[#5d8f6f]">{endWord}</span>
                  {heroContent.title.slice(endIndex + endWord.length)}
                </>
              ) : (
                heroContent.title
              )}
            </h1>
            <Text className="mt-5 max-w-2xl text-[1.15rem] leading-8 sm:mt-7 sm:text-[1.35rem]">
              {heroContent.subtitle}
            </Text>
            <div className="mt-7 flex items-center gap-3 sm:mt-9">
              <Link
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-[1.5px] border-[#2f176f] bg-primary px-6 text-center text-[1.05rem] font-semibold tracking-[-0.01em] text-white transition-[transform,background-color] duration-300 hover:bg-primary-strong active:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-7 sm:text-lg"
                href={heroContent.primaryCta.href}
              >
                <span className="text-center">{heroContent.primaryCta.label}</span>
                <span className="relative flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
                  <svg
                    className="h-[1.15rem] w-[1.15rem] transition-transform duration-300 group-hover:translate-x-0.5"
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
