import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/articles/ArticleContent";
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

            {article.cover_image_url ? (
              <div
                aria-label={`Immagine di copertina di ${article.title}`}
                className="mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] border border-border bg-cover bg-center"
                role="img"
                style={{ backgroundImage: `url("${article.cover_image_url}")` }}
              />
            ) : null}

            <div className="mt-10">
              <ArticleContent content={article.content} />
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
