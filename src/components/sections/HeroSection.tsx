import { heroContent, sharedContent } from "@/data";
import { Button, Container, Text } from "@/components/ui";
import { LocalPhoto } from "./LocalPhoto";

export function HeroSection() {
  return (
    <section className="hero-surface overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
      <Container variant="wide">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
          <div className="max-w-3xl">
            <h1 className="text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.052em] text-ink min-[390px]:text-5xl sm:text-[3.5rem] lg:text-[4.4rem]">
              {heroContent.title}
            </h1>
            <Text className="mt-6 max-w-2xl text-[1.2rem] leading-8 sm:mt-7 sm:text-[1.35rem]">
              {heroContent.subtitle}
            </Text>
            <div className="mt-8 flex flex-col gap-3 min-[430px]:flex-row sm:mt-9">
              <Button href={heroContent.primaryCta.href} size="lg">{heroContent.primaryCta.label}</Button>
              <Button href={heroContent.secondaryCta.href} size="lg" variant="outline">{heroContent.secondaryCta.label}</Button>
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
