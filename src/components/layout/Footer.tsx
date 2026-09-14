import { footerContent } from "@/data";
import { Container } from "@/components/ui";

export function Footer() {
  const details = Object.values(footerContent.professionalDetails).filter(Boolean);
  return (
    <footer className="border-t border-border py-10 sm:py-14">
      <Container variant="wide">
        <div className="grid gap-8 md:grid-cols-[1fr_auto]">
          <div><p className="text-xl font-semibold">{footerContent.name}</p><p className="mt-2 text-base text-ink-muted">{footerContent.profession}</p></div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">{footerContent.legalLinks.map((item) => <a className="text-base text-ink-soft hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href={item.href} key={item.label}>{item.label}</a>)}</nav>
        </div>
        {details.length ? <p className="mt-8 text-base text-ink-muted">{details.join(" · ")}</p> : null}
        <p className="mt-8 border-t border-border pt-6 text-base text-ink-muted">© {footerContent.baseYear} {footerContent.name}</p>
      </Container>
    </footer>
  );
}
