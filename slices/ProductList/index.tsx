"use client";

import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";

export type ProductListProps = SliceComponentProps<Content.ProductListSlice>;

interface FetchedProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
}

/* Fetch product from dummyjson */
async function fetchProduct(id: string): Promise<FetchedProduct> {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
  return response.json();
}

/* Shared product card */
function ProductCard({
  productRef,
}: {
  productRef: string;
}) {
  const [product, setProduct] = useState<FetchedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct(productRef)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [productRef]);

  if (loading) {
    return <div className="animate-pulse bg-gray-200 aspect-[5/6]" />;
  }

  if (error || !product) {
    return <div className="text-sm text-red-500">Failed to load product</div>;
  }

  const inner = (
    <div className="transition-all hover:scale-101 hover:cursor-pointer">
      {product.thumbnail && (
        <div className="mb-3 aspect-[5/6] md:mb-4 border-2 border-[var(--color-border)] rounded-xl shadow-(--shadow-primary) p-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="size-full object-cover"
          />
        </div>
      )}
      <div className="mb-2">
        <h3 className="font-semibold text-[var(--color-text-primary)] md:text-md line-clamp-2">
          {product.title}
        </h3>
      </div>
      <div className="text-md font-semibold text-[var(--color-text-primary)] md:text-lg">
        ${product.price.toFixed(2)}
      </div>
      {product.rating && (
        <div className="text-sm text-[var(--color-text-secondary)]">
          ★ {product.rating.toFixed(1)}
        </div>
      )}
    </div>
  );

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
        <RichText field={description} additionalClassNames="text-[var(--color-text-secondary)]" />
      </div>
      {viewAllLink && isFilled.link(viewAllLink) && (
        <Button field={viewAllLink} variant="Secondary" className="hidden md:flex inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[var(--color-button-secondary-border)] bg-[var(--color-button-secondary-bg)] px-6 py-3 text-[var(--color-button-secondary-text)] font-medium transition-all hover:opacity-90 hover:scale-105" />
      )}
    </div>
  );
}

const ProductList: FC<ProductListProps> = ({ slice }) => {
  const { tagline, heading, description, view_all_link } = slice.primary;
  const products = slice.primary.products ?? [];

  const isCarousel =
    slice.variation === "default" || slice.variation === "carousel3Cols";

  // const carouselBasis =
  //   slice.variation === "carousel3Cols" ? "lg:basis-[33%] lg:pr-12" : "lg:basis-1/4";
  const carouselBasis =
  slice.variation === "carousel3Cols" ? "lg:basis-1/3" : "lg:basis-1/4";

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
          <div className="flex gap-6 overflow-x-auto pt-4 pb-4 md:gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className={`min-w-[80%] shrink-0 sm:min-w-[60%] md:min-w-[45%] lg:min-w-0 ${carouselBasis}`}
              >
                <ProductCard productRef={product.product_reference || ""} />
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
            <ProductCard key={index} productRef={product.product_reference || ""} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
