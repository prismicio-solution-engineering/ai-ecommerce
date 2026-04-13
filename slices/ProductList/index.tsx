"use client";

import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

export type ProductListProps = SliceComponentProps<Content.ProductListSlice>;

/* Shared product card */
function ProductCard({
  product,
}: {
  product: Content.ProductListSliceDefaultPrimaryProductsItem;
}) {
  const inner = (
    <>
      {isFilled.image(product.image) && (
        <div className="mb-3 aspect-[5/6] md:mb-4">
          <PrismicNextImage field={product.image} className="size-full object-cover" />
        </div>
      )}
      <div className="mb-2">
        {product.title && (
          <h3 className="font-semibold text-[var(--color-text-primary)] md:text-md">
            {product.title}
          </h3>
        )}
        {product.variant && (
          <div className="text-sm font-normal text-[var(--color-text-secondary)]">
            {product.variant}
          </div>
        )}
      </div>
      {product.price && (
        <div className="text-md font-semibold text-[var(--color-text-primary)] md:text-lg">
          {product.price}
        </div>
      )}
    </>
  );

  if (isFilled.link(product.link)) {
    return (
      <PrismicNextLink field={product.link} className="block">
        {inner}
      </PrismicNextLink>
    );
  }
  return <div>{inner}</div>;
}

/* Shared header row */
function SectionHeader({
  tagline,
  heading,
  description,
  viewAllLink,
}: {
  tagline?: string | null;
  heading: Content.ProductListSlice["primary"]["heading"];
  description: Content.ProductListSlice["primary"]["description"];
  viewAllLink?: Content.ProductListSlice["primary"]["view_all_link"];
}) {
  return (
    <div className="mb-12 grid grid-cols-1 items-end gap-12 md:mb-18 md:grid-cols-[1fr_max-content] lg:mb-20 lg:gap-20">
      <div className="max-w-lg">
        {tagline && (
          <p className="mb-3 font-semibold text-[var(--color-text-primary)] md:mb-4">
            {tagline}
          </p>
        )}
        <RichText field={heading} />
        <RichText field={description} className="text-[var(--color-text-secondary)]" />
      </div>
      {viewAllLink && isFilled.link(viewAllLink) && (
        <Button field={viewAllLink} variant="Secondary" className="hidden md:flex inline-flex items-center justify-center gap-2 rounded border border-[var(--color-button-secondary-border)] bg-[var(--color-button-secondary-bg)] px-6 py-3 text-[var(--color-button-secondary-text)] font-medium transition-opacity hover:opacity-90" />
      )}
    </div>
  );
}

const ProductList: FC<ProductListProps> = ({ slice }) => {
  const { tagline, heading, description, view_all_link } = slice.primary;
  const products = slice.primary.products ?? [];

  const isCarousel =
    slice.variation === "default" || slice.variation === "carousel3Cols";

  const carouselBasis =
    slice.variation === "carousel3Cols" ? "lg:basis-[33%] lg:pr-12" : "lg:basis-1/4";

  // -- Carousel variations ----------------------------------------------
  if (isCarousel) {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          <SectionHeader
            tagline={tagline}
            heading={heading}
            description={description}
            viewAllLink={view_all_link}
          />
          <div className="flex gap-6 overflow-x-auto pb-4 md:gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className={`min-w-[80%] shrink-0 sm:min-w-[60%] md:min-w-[45%] ${carouselBasis}`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // -- Grid variations --------------------------------------------------
  const gridCols =
    slice.variation === "grid4Cols"
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">
        <SectionHeader
          tagline={tagline}
          heading={heading}
          description={description}
          viewAllLink={view_all_link}
        />
        <div
          className={`grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16 lg:gap-x-12 ${gridCols}`}
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
