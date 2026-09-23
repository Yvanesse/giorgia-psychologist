import { Heading, Text } from "@/components/ui";

type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({ label, title, description, centered = false }: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {label ? <p className="section-label">{label}</p> : null}
      <Heading className="mt-3" variant="h2">{title}</Heading>
      {description ? <Text className="mt-5">{description}</Text> : null}
    </div>
  );
}
