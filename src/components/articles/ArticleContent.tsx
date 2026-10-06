import type { ReactNode } from "react";

type ArticleContentProps = {
  content: string;
};

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g).filter(Boolean);

  return tokens.map((token, index) => {
    const bold = token.match(/^\*\*(.+)\*\*$/);
    if (bold) {
      return <strong key={`bold-${index}`} className="font-semibold text-ink">{bold[1]}</strong>;
    }

    const link = token.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (link) {
      return (
        <a
          className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
          href={link[2]}
          key={`link-${index}`}
          rel="noreferrer"
          target="_blank"
        >
          {link[1]}
        </a>
      );
    }

    return token;
  });
}

export function ArticleContent({ content }: ArticleContentProps) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 className="pt-3 text-2xl font-semibold tracking-[-0.025em] text-ink" key={`h3-${index}`}>
          {renderInline(line.slice(4))}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 className="pt-5 text-3xl font-semibold tracking-[-0.035em] text-ink" key={`h2-${index}`}>
          {renderInline(line.slice(3))}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      blocks.push(
        <blockquote
          className="border-l-4 border-primary/30 bg-[#f8f6ff] px-5 py-4 text-lg italic leading-8 text-ink-soft"
          key={`quote-${index}`}
        >
          {renderInline(line.slice(2))}
        </blockquote>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(
        <ul className="list-disc space-y-2 pl-6 text-[1.05rem] leading-8 text-ink-soft sm:text-lg" key={`ul-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={`ul-item-${itemIndex}`}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s/, ""));
        index += 1;
      }
      blocks.push(
        <ol className="list-decimal space-y-2 pl-6 text-[1.05rem] leading-8 text-ink-soft sm:text-lg" key={`ol-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={`ol-item-${itemIndex}`}>{renderInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().startsWith("## ") &&
      !lines[index].trim().startsWith("### ") &&
      !lines[index].trim().startsWith("> ") &&
      !lines[index].trim().startsWith("- ") &&
      !/^\d+\.\s/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push(
      <p className="text-[1.05rem] leading-8 text-ink-soft sm:text-lg sm:leading-8" key={`p-${index}`}>
        {renderInline(paragraphLines.join(" "))}
      </p>,
    );
  }

  return <div className="space-y-6">{blocks}</div>;
}
