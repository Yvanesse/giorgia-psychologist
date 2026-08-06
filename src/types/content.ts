export type NavigationItem = {
  readonly label: string;
  readonly href: string;
};

export type CallToAction = {
  readonly label: string;
  readonly href: string;
};

export type MediaAsset = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

export type HeroContent = {
  readonly eyebrow: string | null;
  readonly title: string;
  readonly highlight: string | null;
  readonly subtitle: string;
  readonly primaryCta: CallToAction;
  readonly secondaryCta: CallToAction;
  readonly image: MediaAsset;
  readonly isProvisional: boolean;
};

export type SectionContent<T> = {
  readonly label?: string;
  readonly title: string;
  readonly description?: string;
  readonly items: readonly T[];
};

export type FinalCtaContent = {
  readonly title: string;
  readonly description: string;
  readonly cta: CallToAction;
};

export type AboutContent = {
  readonly label: string;
  readonly name: string;
  readonly role: string;
  readonly paragraphs: readonly string[];
  readonly cta: CallToAction;
  readonly image: MediaAsset;
  readonly isProvisional: boolean;
};

export type ManifestoContent = {
  readonly text: string;
};

export type ApproachItem = {
  readonly title: string;
  readonly description: string;
};

export type AreaItem = {
  readonly title: string;
  readonly description: string;
  readonly topics: readonly string[];
  readonly href: string;
  readonly note?: string;
};

export type JourneyStep = {
  readonly title: string;
  readonly description: string;
};

export type FormatItem = {
  readonly title: string;
  readonly description: string;
  readonly location?: string | null;
};

export type ArticlePreview = {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly category: string;
  readonly readingTime: string;
  readonly image: MediaAsset | null;
  readonly isPublished: boolean;
};

export type FaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type ContactContent = {
  readonly title: string;
  readonly description: string;
  readonly email: string | null;
  readonly phone: string | null;
  readonly address: string | null;
  readonly bookingHref: string;
};

export type FooterContent = {
  readonly name: string;
  readonly profession: string;
  readonly navigation: readonly NavigationItem[];
  readonly legalLinks: readonly NavigationItem[];
  readonly baseYear: number;
  readonly professionalDetails: {
    readonly numeroAlbo: string | null;
    readonly ordine: string | null;
    readonly partitaIva: string | null;
  };
};
