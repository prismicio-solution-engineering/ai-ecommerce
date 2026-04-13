import { PrismicRichText } from "@prismicio/react";
import type { RichTextField } from "@prismicio/client";
import type { JSXMapSerializer } from "@prismicio/react";

type Props = {
  field: RichTextField;
  components?: JSXMapSerializer;
  className?: string;
};

export function RichText({ field, components, className }: Props) {
  const defaultComponents: JSXMapSerializer = {
    heading1: ({ children }) => (
      <h1 className="mb-5 text-6xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-9xl lg:text-10xl">
        {children}
      </h1>
    ),
    heading2: ({ children }) => (
      <h2 className="mb-5 text-5xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-7xl lg:text-8xl">
        {children}
      </h2>
    ),
    heading3: ({ children }) => (
      <h3 className="mb-3 text-2xl font-bold text-[var(--color-text-primary)] md:mb-4 md:text-3xl lg:text-4xl">
        {children}
      </h3>
    ),
    heading4: ({ children }) => (
      <h4 className="mb-3 text-xl font-bold text-[var(--color-text-primary)] md:mb-4 md:text-2xl">
        {children}
      </h4>
    ),
    heading5: ({ children }) => (
      <h5 className="mb-2 text-lg font-bold text-[var(--color-text-primary)] md:text-xl">
        {children}
      </h5>
    ),
    heading6: ({ children }) => (
      <h6 className="mb-2 text-base font-bold text-[var(--color-text-primary)] md:text-lg">
        {children}
      </h6>
    ),
    paragraph: ({ children }) => (
      <p className="mb-4 text-[var(--color-text-secondary)] md:text-md">
        {children}
      </p>
    ),
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    hyperlink: ({ node, children }) => (
      <a
        href={node.data.url}
        className="text-[var(--brand-primary)] underline"
        target={node.data.target ?? undefined}
        rel={node.data.target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    list: ({ children }) => (
      <ul className="mb-4 list-disc pl-6 text-[var(--color-text-secondary)] md:text-md">
        {children}
      </ul>
    ),
    listItem: ({ children }) => <li className="mb-2">{children}</li>,
    oList: ({ children }) => (
      <ol className="mb-4 list-decimal pl-6 text-[var(--color-text-secondary)] md:text-md">
        {children}
      </ol>
    ),
    oListItem: ({ children }) => <li className="mb-2">{children}</li>,
    preformatted: ({ children }) => (
      <pre className="mb-4 overflow-x-auto rounded bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-primary)]">
        {children}
      </pre>
    ),
    image: ({ node }) => (
      <figure className="my-6">
        <img
          src={node.url}
          alt={node.alt ?? ""}
          className="w-full rounded object-cover"
        />
        {node.alt && (
          <figcaption className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">
            {node.alt}
          </figcaption>
        )}
      </figure>
    ),
    embed: ({ node }) => (
      <div
        className="my-6"
        dangerouslySetInnerHTML={{ __html: node.oembed.html ?? "" }}
      />
    ),
    ...components,
  };

  const mergedComponents: JSXMapSerializer = { ...defaultComponents, ...components };

  return (
    <div className={className}>
      <PrismicRichText field={field} components={mergedComponents} />
    </div>
  );
}
