import { footerContent } from "@/data";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui";

export function Footer() {
  const details = Object.values(footerContent.professionalDetails).filter(Boolean);

  return (
    <footer className="border-t border-border py-10 sm:py-14">
      <Container variant="wide">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <p className="text-xl font-semibold">{footerContent.name}</p>
            <p className="mt-2 text-base text-ink-muted">{footerContent.profession}</p>
            <div className="mt-4 flex flex-col gap-2 text-base text-ink-soft">
              <a className="hover:text-primary" href={`mailto:${siteConfig.contacts.email}`}>
                {siteConfig.contacts.email}
              </a>
              <a className="hover:text-primary" href={`tel:${siteConfig.contacts.phone}`}>
                {siteConfig.contacts.phone}
              </a>
              <span>{siteConfig.contacts.address}</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-black bg-primary px-6 font-semibold text-white transition-colors hover:bg-primary-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              href="/prenota"
              style={{ color: "#ffffff" }}
            >
              Prenota un colloquio
            </a>

            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end">
              {footerContent.legalLinks.map((item) => (
                <a
                  className="text-base text-ink-soft hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {details.length ? <p className="mt-8 text-base text-ink-muted">{details.join(" · ")}</p> : null}
        <a
          className="mt-5 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-primary"
          href="https://www.miodottore.it/profilo/giorgia-petruzzellis"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Leggi le recensioni di Giorgia Petruzzellis su MioDottore"
        >
          <span className="font-semibold text-ink-soft">MioDottore</span>
          <span aria-hidden="true" className="text-amber-500">★★★★★</span>
          <span>5,0/5 · 17 recensioni</span>
          <span aria-hidden="true">↗</span>
        </a>
        <p className="mt-8 border-t border-border pt-6 text-base text-ink-muted">
          © {footerContent.baseYear} {footerContent.name}
        </p>
      </Container>
    </footer>
  );
}
