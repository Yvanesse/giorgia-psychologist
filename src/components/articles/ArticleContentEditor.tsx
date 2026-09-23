"use client";

import { useRef } from "react";

type ArticleContentEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

type FormatAction = "h2" | "h3" | "bold" | "bullet" | "numbered" | "quote" | "link";

const buttonClass =
  "rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-primary hover:text-primary";

export function ArticleContentEditor({ value, onChange }: ArticleContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function applyFormat(action: FormatAction) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    let replacement = selected;
    let cursorOffset = 0;

    if (action === "bold") {
      replacement = `**${selected || "testo in grassetto"}**`;
      cursorOffset = selected ? replacement.length : 2;
    } else if (action === "link") {
      replacement = selected ? `[${selected}](https://)` : "[testo del link](https://)";
      cursorOffset = selected ? replacement.length - 1 : 1;
    } else {
      const linePrefix =
        action === "h2"
          ? "## "
          : action === "h3"
            ? "### "
            : action === "bullet"
              ? "- "
              : action === "numbered"
                ? "1. "
                : "> ";

      const source = selected || (action === "bullet" ? "voce elenco" : action === "numbered" ? "voce elenco" : "testo");
      replacement = source
        .split("\n")
        .map((line, index) => {
          if (action === "numbered") return `${index + 1}. ${line}`;
          return `${linePrefix}${line}`;
        })
        .join("\n");
      cursorOffset = replacement.length;
    }

    const nextValue = `${value.slice(0, start)}${replacement}${value.slice(end)}`;
    onChange(nextValue);

    requestAnimationFrame(() => {
      textarea.focus();
      const nextPosition = start + cursorOffset;
      textarea.setSelectionRange(nextPosition, nextPosition);
    });
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2" aria-label="Formattazione articolo">
        <button className={buttonClass} onClick={() => applyFormat("h2")} type="button">
          Titolo H2
        </button>
        <button className={buttonClass} onClick={() => applyFormat("h3")} type="button">
          Titolo H3
        </button>
        <button className={buttonClass} onClick={() => applyFormat("bold")} type="button">
          <strong>Grassetto</strong>
        </button>
        <button className={buttonClass} onClick={() => applyFormat("bullet")} type="button">
          • Elenco
        </button>
        <button className={buttonClass} onClick={() => applyFormat("numbered")} type="button">
          1. Elenco
        </button>
        <button className={buttonClass} onClick={() => applyFormat("quote")} type="button">
          Citazione
        </button>
        <button className={buttonClass} onClick={() => applyFormat("link")} type="button">
          Link
        </button>
      </div>

      <textarea
        ref={textareaRef}
        className="min-h-[22rem] w-full resize-y rounded-2xl border border-zinc-300 bg-white px-4 py-4 font-normal leading-7 outline-none focus:border-primary"
        onChange={(event) => onChange(event.target.value)}
        placeholder={"Scrivi qui l’articolo.\n\nPuoi usare i pulsanti sopra per titoli, grassetto, elenchi, citazioni e link."}
        value={value}
      />

      <p className="mt-2 text-xs leading-5 text-zinc-500">
        Lascia una riga vuota tra i paragrafi. I pulsanti inseriscono una formattazione semplice che verrà mostrata correttamente nell’articolo pubblico.
      </p>
    </div>
  );
}
