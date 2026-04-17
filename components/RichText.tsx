import { PrismicRichText } from "@prismicio/react";
import type { RichTextField } from "@prismicio/client";
import type { RichTextComponents } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

type Props = {
  field: RichTextField;
  components?: RichTextComponents;
  additionalClassNames?: string;
};

export function RichText({ field, components, additionalClassNames }: Props) {
  const defaultComponents: RichTextComponents = {
    heading1: ({ children }) => (
      <h1
        className={clsx(
          "mb-5 text-4xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-5xl lg:text-6xl",
          additionalClassNames,
        )}
      >
        {children}
      </h1>
    ),
    heading2: ({ children }) => (
      <h2
        className={clsx(
          "mb-5 text-3xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-4xl lg:text-5xl",
          additionalClassNames,
        )}
      >
        {children}
      </h2>
    ),
    heading3: ({ children }) => (
      <h3
        className={clsx(
          "mb-3 text-2xl font-bold text-[var(--color-text-primary)] md:mb-4 md:text-3xl lg:text-4xl",
          additionalClassNames,
        )}
      >
        {children}
      </h3>
    ),
    heading4: ({ children }) => (
      <h4
        className={clsx(
          "mb-3 text-xl font-bold text-[var(--color-text-primary)] md:mb-4 md:text-2xl",
          additionalClassNames,
        )}
      >
        {children}
      </h4>
    ),
    heading5: ({ children }) => (
      <h5
        className={clsx(
          "mb-2 text-lg font-bold text-[var(--color-text-primary)] md:text-xl",
          additionalClassNames,
        )}
      >
        {children}
      </h5>
    ),
    heading6: ({ children }) => (
      <h6
        className={clsx(
          "mb-2 text-base font-bold text-[var(--color-text-primary)] md:text-lg",
          additionalClassNames,
        )}
      >
        {children}
      </h6>
    ),
    paragraph: ({ children }) => (
      <p
        className={clsx(
          "mb-4 text-[var(--color-text-secondary)] md:text-[18px]",
          additionalClassNames,
        )}
      >
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className={clsx("font-bold", additionalClassNames)}>
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className={clsx("italic", additionalClassNames)}>{children}</em>
    ),
    hyperlink: ({ node, children }) => (
      <PrismicNextLink
        field={node.data}
        className={clsx(
          "text-[var(--brand-primary)] underline",
          additionalClassNames,
        )}
      >
        {children}
      </PrismicNextLink>
    ),
    list: ({ children }) => (
      <ul
        className={clsx(
          "mb-4 list-disc pl-6 text-[var(--color-text-secondary)] md:text-md",
          additionalClassNames,
        )}
      >
        {children}
      </ul>
    ),
    listItem: ({ children }) => (
      <li className={clsx("mb-2", additionalClassNames)}>{children}</li>
    ),
    oList: ({ children }) => (
      <ol
        className={clsx(
          "mb-4 list-decimal pl-6 text-[var(--color-text-secondary)] md:text-md",
          additionalClassNames,
        )}
      >
        {children}
      </ol>
    ),
    oListItem: ({ children }) => (
      <li className={clsx("mb-2", additionalClassNames)}>{children}</li>
    ),
    preformatted: ({ children }) => (
      <pre
        className={clsx(
          "mb-4 overflow-x-auto rounded bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-primary)]",
          additionalClassNames,
        )}
      >
        {children}
      </pre>
    ),
    image: ({ node }) => (
      <figure className={clsx("my-6", additionalClassNames)}>
        <img
          src={node.url}
          alt={node.alt ?? ""}
          className={clsx("w-full rounded object-cover", additionalClassNames)}
        />
        {node.alt && (
          <figcaption
            className={clsx(
              "mt-2 text-center text-sm text-[var(--color-text-secondary)]",
              additionalClassNames,
            )}
          >
            {node.alt}
          </figcaption>
        )}
      </figure>
    ),
    embed: ({ node }) => (
      <div
        className={clsx("my-6", additionalClassNames)}
        dangerouslySetInnerHTML={{ __html: node.oembed.html ?? "" }}
      />
    ),
    ...components,
  };

  return (
    <PrismicRichText
      field={field}
      components={{
        ...defaultComponents,
        ...components,
      }}
    />
  );
}
