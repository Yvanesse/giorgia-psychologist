import type { Metadata } from "next";

import { Button, Card, Container, Grid, Heading, Section, Text } from "@/components/ui";
import { articlesContent } from "@/data";
import { estimateReadingTime, getPublishedArticles } from "@/lib/public-articles";

export const metadata: Metadata = {
  title: "Articoli | Giorgia Petruzzellis",
  description: articlesContent.description,
};

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <main id="main-content">
      <Section spacing="compact">
        <Container variant="wide">
          <div className="max-w-3xl py-6 sm:py-10">
            <p className="section-label">I miei articoli</p>
            <Heading className="mt-3" variant="h1">
              Pensieri e approfondimenti
            </Heading>
            <Text className="mt-5 max-w-2xl" variant="lead">
              {articlesContent.description}
            </Text>
          </div>

          {articles.length > 0 ? (
            <Grid className="mt-8 lg:mt-10" columns={3}>
              {articles.map((article) => (
                <Card className="overflow-hidden p-0" key={article.id} variant="bordered">
                  {article.cover_image_url ? (
                    <div
                      aria-label={`Immagine di copertina di ${article.title}`}
                      className="aspect-[16/10] border-b border-border bg-cover bg-center"
                      role="img"
                      style={{ backgroundImage: `url("${article.cover_image_url}")` }}
                    />
                  ) : (
                    <div aria-hidden="true" className="article-placeholder aspect-[16/10] border-b border-border" />
                  )}
                  <div className="p-6 sm:p-7">
                    <p className="text-sm font-semibold text-primary">
                      {article.category} · {estimateReadingTime(article.content)}
                    </p>
                    <Heading className="mt-3" variant="h3">
                      {article.title}
                    </Heading>
                    <Text className="mt-4" variant="small">
                      {article.excerpt || article.content.slice(0, 150)}
                    </Text>
                    {article.published_at ? (
                      <p className="mt-4 text-sm text-ink-muted">
                        {dateFormatter.format(new Date(article.published_at))}
                      </p>
                    ) : null}
                    <div className="mt-6">
                      <Button href={`/articoli/${article.slug}`} variant="outline">
                        Leggi l’articolo →
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </Grid>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-border bg-surface-muted px-6 py-12 text-center sm:px-10">
              <Heading variant="h3">Gli articoli arriveranno presto.</Heading>
              <Text className="mx-auto mt-3 max-w-xl" variant="small">
                Questo spazio raccoglierà approfondimenti su psicologia, relazioni e cambiamento.
              </Text>
            </div>
          )}

          <div className="mt-10 sm:mt-12">
            <Button href="/" variant="outline">
              ← Torna alla homepage
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
