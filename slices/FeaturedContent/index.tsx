"use client";

import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

export type FeaturedContentProps =
  SliceComponentProps<Content.FeaturedContentSlice>;

const FeaturedContent: FC<FeaturedContentProps> = ({ slice }) => {
  const { tagline, heading, description } = slice.primary;

  // -- Default: carousel of manually-filled cards -----------------------
  if (slice.variation === "default") {
    const cards = slice.primary.cards ?? [];
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          {/* Header row */}
          <div className="mb-12 grid grid-cols-1 items-start justify-start gap-y-8 md:mb-18 md:grid-cols-[1fr_max-content] md:items-end md:justify-between md:gap-x-12 md:gap-y-4 lg:mb-20 lg:gap-x-20">
            <div className="md:mr-12 lg:mr-0">
              <div className="w-full max-w-lg">
                {tagline && (
                  <p className="mb-3 font-semibold text-[var(--color-text-primary)] md:mb-4">
                    {tagline}
                  </p>
                )}
                <RichText field={heading} />
                <RichText
                  field={description}
                  className="text-[var(--color-text-secondary)]"
                />
              </div>
            </div>
            {isFilled.link(slice.primary.view_all_link) && (
              <div className="hidden md:flex">
                <Button field={slice.primary.view_all_link} variant="Secondary" />
              </div>
            )}
          </div>

          {/* Cards grid (scrollable on mobile) */}
          <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 lg:grid-cols-3">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex min-w-[80%] flex-col border border-[var(--color-border)] sm:min-w-[60%] md:min-w-0"
              >
                {isFilled.image(card.image) && (
                  <div className="w-full overflow-hidden">
                    <PrismicNextImage
                      field={card.image}
                      className="aspect-[3/2] size-full object-cover"
                    />
                  </div>
                )}
                <div className="flex w-full flex-1 flex-col justify-between p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-4 md:mb-4">
                    {card.category && (
                      <p className="bg-[var(--color-surface)] px-2 py-1 text-sm font-semibold text-[var(--color-text-primary)]">
                        {card.category}
                      </p>
                    )}
                    {card.read_time && (
                      <p className="inline text-sm font-semibold text-[var(--color-text-secondary)]">
                        {card.read_time}
                      </p>
                    )}
                  </div>
                  <div className="flex w-full flex-col items-start justify-start">
                    <RichText
                      field={card.title}
                      components={{
                        heading3: ({ children }) => (
                          <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)] md:text-2xl">
                            {children}
                          </h3>
                        ),
                      }}
                    />
                    <RichText
                      field={card.description}
                      className="text-[var(--color-text-secondary)]"
                    />
                    {isFilled.link(card.link) && (
                      <div className="mt-5 md:mt-6">
                        <PrismicNextLink
                          field={card.link}
                          className="font-semibold text-[var(--brand-primary)]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile view-all button */}
          {isFilled.link(slice.primary.view_all_link) && (
            <div className="mt-12 flex justify-end md:hidden">
              <Button field={slice.primary.view_all_link} variant="Secondary" />
            </div>
          )}
        </div>
      </section>
    );
  }

  // -- Content Relationship: same layout, articles via relationships ----
  if (slice.variation === "contentRelationship") {
    const articles = slice.primary.articles ?? [];
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          <div className="mb-12 grid grid-cols-1 items-start justify-start gap-y-8 md:mb-18 md:grid-cols-[1fr_max-content] md:items-end md:justify-between md:gap-x-12 md:gap-y-4 lg:mb-20 lg:gap-x-20">
            <div className="md:mr-12 lg:mr-0">
              <div className="w-full max-w-lg">
                {tagline && (
                  <p className="mb-3 font-semibold text-[var(--color-text-primary)] md:mb-4">
                    {tagline}
                  </p>
                )}
                <RichText field={heading} />
                <RichText
                  field={description}
                  className="text-[var(--color-text-secondary)]"
                />
              </div>
            </div>
            {isFilled.link(slice.primary.view_all_link) && (
              <div className="hidden md:flex">
                <Button field={slice.primary.view_all_link} variant="Secondary" />
              </div>
            )}
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 lg:grid-cols-3">
            {articles.map((item, index) => {
              if (!isFilled.link(item.article)) return null;
              return (
                <PrismicNextLink
                  key={index}
                  field={item.article}
                  className="flex min-w-[80%] flex-col border border-[var(--color-border)] sm:min-w-[60%] md:min-w-0"
                >
                  <div className="flex w-full flex-1 flex-col justify-center p-5 sm:p-6">
                    <p className="text-lg font-bold text-[var(--color-text-primary)]">
                      {item.article.text || "Read more"}
                    </p>
                  </div>
                </PrismicNextLink>
              );
            })}
          </div>

          {isFilled.link(slice.primary.view_all_link) && (
            <div className="mt-12 flex justify-end md:hidden">
              <Button field={slice.primary.view_all_link} variant="Secondary" />
            </div>
          )}
        </div>
      </section>
    );
  }

  // -- Background Image Cards: auto-adapting 1-4 column grid -----------
  if (slice.variation === "backgroundImageCards") {
    const cards = slice.primary.cards ?? [];
    const count = cards.length;

    // Determine grid cols based on card count (1-4 adaptive)
    const gridCols =
      count === 1
        ? "grid-cols-1"
        : count === 2
          ? "grid-cols-1 md:grid-cols-2"
          : count === 3
            ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          <div className="mb-12 md:mb-18 lg:mb-20">
            <div className="mx-auto max-w-lg text-center">
              {tagline && (
                <p className="mb-3 font-semibold text-[var(--color-text-primary)] md:mb-4">
                  {tagline}
                </p>
              )}
              <RichText field={heading} />
              <RichText
                field={description}
                className="text-[var(--color-text-secondary)]"
              />
            </div>
          </div>
          <div className={`grid justify-center gap-6 md:gap-8 ${gridCols}`}>
            {cards.map((card, index) => (
              <div key={index} className="relative p-6 md:p-8">
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-[var(--color-overlay)]" />
                  {isFilled.image(card.image) && (
                    <PrismicNextImage
                      field={card.image}
                      className="size-full object-cover"
                    />
                  )}
                </div>
                <div className="relative z-10">
                  {isFilled.image(card.icon) && (
                    <div className="mb-3 md:mb-4">
                      <PrismicNextImage field={card.icon} className="size-12" />
                    </div>
                  )}
                  <RichText
                    field={card.title}
                    components={{
                      heading3: ({ children }) => (
                        <h3 className="mb-2 text-xl font-bold text-[var(--color-text-alternative)] md:text-2xl">
                          {children}
                        </h3>
                      ),
                    }}
                  />
                  <RichText
                    field={card.description}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="text-[var(--color-text-alternative)]">
                          {children}
                        </p>
                      ),
                    }}
                  />
                  {isFilled.link(card.link) && (
                    <div className="mt-5 flex items-center md:mt-6">
                      <PrismicNextLink
                        field={card.link}
                        className="font-semibold text-[var(--color-text-alternative)]"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default FeaturedContent;
