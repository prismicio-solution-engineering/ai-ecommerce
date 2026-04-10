import { PrismicRichText } from "@prismicio/react";
import type { RichTextField } from "@prismicio/client";
import type { JSXMapSerializer } from "@prismicio/react";

type Props = {
  field: RichTextField;
  components?: JSXMapSerializer;
  classNames?: string;
};

export function RichText({ field, components, classNames }: Props) {
  const defaultComponents: JSXMapSerializer = {
    heading1: ({ children }) => (
      <h1
        className={`font-heading text-[var(--color-text-primary)] ${classNames ?? ""}`}
      >
        {children}
      </h1>
    ),
    heading2: ({ children }) => (
      <h2
        className={`font-heading text-[var(--color-text-primary)] ${classNames ?? ""}`}
      >
        {children}
      </h2>
    ),
    heading3: ({ children }) => (
      <h3
        className={`font-heading text-[var(--color-text-primary)] ${classNames ?? ""}`}
      >
        {children}
      </h3>
    ),
    paragraph: ({ children }) => (
      <p
        className={`text-[var(--color-text-secondary)] ${classNames ?? ""}`}
      >
        {children}
      </p>
    ),
    hyperlink: ({ node, children }) => (
      <a href={node.data.url} className="text-[var(--brand-primary)] underline">
        {children}
      </a>
    ),
    ...components,
  };
  return <PrismicRichText field={field} components={defaultComponents} />;
}
