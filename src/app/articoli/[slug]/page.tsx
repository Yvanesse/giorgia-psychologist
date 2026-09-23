import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button, Container, Heading, Section, Text } from "@/components/ui";
import { estimateReadingTime, getPublishedArticleBySlug } from "@/lib/public-articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    return { title: "Articolo non trovato | Giorgia Petruzzellis" };
  }

  return {
    title: `${article.title} | Giorgia Petruzzellis`,
    description: article.excerpt || article.content.slice(0, 160),
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) notFound();

  const paragraphs = article.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main id="main-content">
      <Section spacing="compact">
        <Container>
          <article className="mx-auto max-w-3xl py-6 sm:py-10">
            <p className="section-label">{article.category}</p>
            <Heading className="mt-3" variant="h1">
              {article.title}
            </Heading>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-muted">
              <span>{estimateReadingTime(article.content)} di lettura</span>
              {article.published_at ? (
                <span>{dateFormatter.format(new Date(article.published_at))}</span>
              ) : null}
            </div>

            {article.excerpt ? (
              <Text className="mt-7" variant="lead">
                {article.excerpt}
              </Text>
            ) : null}

            <div className="mt-10 space-y-6 text-[1.05rem] leading-8 text-ink-soft sm:text-lg sm:leading-8">
              {paragraphs.map((paragraph, index) => (
                <p key={`${article.id}-${index}`}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 border-t border-border pt-8">
              <Button href="/articoli" variant="outline">
                ← Torna agli articoli
              </Button>
            </div>
          </article>
        </Container>
      </Section>
    </main>
  );
}
