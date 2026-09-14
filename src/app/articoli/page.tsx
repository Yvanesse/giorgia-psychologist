import type { Metadata } from "next";

import { articlesContent } from "@/data";
import { Badge, Button, Card, Container, Grid, Heading, Section, Text } from "@/components/ui";

export const metadata: Metadata = {
  title: "Articoli | Giorgia Petruzzellis",
  description: articlesContent.description,
};

export default function ArticlesPage() {
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

          <Grid className="mt-8 lg:mt-10" columns={3}>
            {articlesContent.items.map((article) => (
              <Card className="overflow-hidden p-0" key={article.slug} variant="bordered">
                <div aria-hidden="true" className="article-placeholder aspect-[16/10] border-b border-border" />
                <div className="p-6 sm:p-7">
                  {!article.isPublished ? <Badge>{articlesContent.upcomingLabel}</Badge> : null}
                  <p className="mt-5 text-base font-semibold text-primary">
                    {article.category} · {article.readingTime}
                  </p>
                  <Heading className="mt-3" variant="h3">
                    {article.title}
                  </Heading>
                  <Text className="mt-4" variant="small">
                    {article.excerpt}
                  </Text>
                </div>
              </Card>
            ))}
          </Grid>

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
