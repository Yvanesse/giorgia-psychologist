import { siteConfig } from "@/config/site.config";

const message = "Ciao Giorgia, ti contatto dal sito per avere alcune informazioni.";

export function WhatsAppContact() {
  const phone = siteConfig.contacts.phone.replace(/\D/g, "");
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      aria-label="Contatta Giorgia su WhatsApp"
      className="whatsapp-contact group fixed bottom-5 right-4 z-40 inline-flex min-h-14 items-center gap-2 rounded-full border border-black/10 bg-[#25D366] px-4 font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:bottom-6 sm:right-6"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <span
        aria-hidden="true"
        className="flex size-7 items-center justify-center rounded-full bg-white/15"
      >
        <svg
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M7.8 5.8c.4-.4.9-.6 1.4-.4.4.1.7.5.9.9l.8 1.9c.2.5.1 1-.2 1.4l-.7.8c.7 1.5 1.9 2.7 3.4 3.4l.8-.7c.4-.3.9-.4 1.4-.2l1.9.8c.5.2.8.5.9.9.2.5 0 1-.4 1.4l-.8.8c-.9.9-2.3 1.2-3.5.8-4.1-1.4-7.3-4.6-8.7-8.7-.4-1.2-.1-2.6.8-3.5l1-1Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="hidden sm:inline">Scrivi su WhatsApp</span>
    </a>
  );
}
