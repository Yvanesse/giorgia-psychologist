import { articlesContent } from "@/data";
import { Badge, Card, Container, Grid, Heading, Section, Text } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

export function ArticlesSection() {
  return (
    <Section id="articoli">
      <Container variant="wide">
        <SectionHeading description={articlesContent.description} label={articlesContent.label} title={articlesContent.title} />
        <Grid className="mt-10 lg:mt-12" columns={3}>
          {articlesContent.items.slice(0, 3).map((article) => (
            <Card className="overflow-hidden p-0" key={article.slug} variant="bordered">
              {article.image ? (
                // Published article media will be rendered here when supplied by the Content Layer.
                // eslint-disable-next-line @next/next/no-img-element
                <img alt={article.image.alt} className="aspect-[16/10] w-full object-cover" height={article.image.height} src={article.image.src} width={article.image.width} />
              ) : <div aria-hidden="true" className="article-placeholder aspect-[16/10] border-b border-border" />}
              <div className="p-6 sm:p-7">
                {!article.isPublished ? <Badge>{articlesContent.upcomingLabel}</Badge> : null}
                <p className="mt-5 text-base font-semibold text-primary">{article.category} · {article.readingTime}</p>
                <Heading className="mt-3" variant="h3">{article.title}</Heading>
                <Text className="mt-4" variant="small">{article.excerpt}</Text>
              </div>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
