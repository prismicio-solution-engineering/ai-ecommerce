"use client";

import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";

export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/* Fetch product from dummyjson */
async function fetchProduct(id: string) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
  return response.json();
}

/* Fetch category from dummyjson */
async function fetchCategory(slug: string) {
  const response = await fetch(`https://dummyjson.com/products/category/${slug}`);
  if (!response.ok) throw new Error(`Failed to fetch category ${slug}`);
  return response.json();
}

/* Reusable two-col full-size layout (Header37/Header36 pattern) */
function TwoColsFullSize({
  slice,
  textContent,
}: {
  slice: Content.CallToActionSlice;
  textContent: React.ReactNode;
}) {
  const p = slice.primary as Record<string, unknown>;
  const imageLeft = p.image_left as boolean | undefined;
  const imageField = p.image as Content.CallToActionSlice["primary"] extends { image: infer I } ? I : never;

  const imageBlock = isFilled.image(imageField) ? (
    <div>
      <PrismicNextImage
        field={imageField}
        className="w-full object-cover lg:h-screen lg:max-h-[60rem]"
      />
    </div>
  ) : null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid grid-cols-1 items-center lg:grid-cols-2 lg:pt-0"
    >
      {imageLeft ? (
        <>
          {imageBlock}
          <div className="w-full box-border px-[5%] py-[10%] lg:max-w-xl md:justify-self-start lg:px-20">
            {textContent}
          </div>
        </>
      ) : (
        <>
          <div className="w-full box-border px-[5%] py-[10%] lg:max-w-xl md:justify-self-start lg:px-20">
            {textContent}
          </div>
          {imageBlock}
        </>
      )}
    </section>
  );
}

const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  const { heading, description } = slice.primary;

  // Helper: alternative text components for overlay variations
  const altHeading = {
    heading2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="mb-5 text-3xl font-bold text-[var(--color-text-alternative)] md:mb-6 md:text-4xl lg:text-5xl">
        {children}
      </h2>
    ),
  };
  const altParagraph = {
    paragraph: ({ children }: { children: React.ReactNode }) => (
      <p className="text-[var(--color-text-alternative)] md:text-[18px]">
        {children}
      </p>
    ),
  };

  // -- Default ----------------------------------------------------------
  if (slice.variation === "default") {
    const center = slice.primary.center_text;
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-8 md:py-12 lg:py-16"
      >
        <div className={`w-full flex ${center ? "justify-center" : ""}`}>
          <div className={`container max-w-lg ${center ? "text-center" : ""}`}>
            <RichText field={heading} />
            <RichText field={description} additionalClassNames="text-[var(--color-text-secondary)]" />
            {isFilled.repeatable(slice.primary.buttons) && (
              <div className={`mt-6 flex flex-wrap gap-4 md:mt-8 ${center ? "items-center justify-center" : ""}`}>
                {slice.primary.buttons.map((link, i) => (
                  <Button key={i} field={link} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // -- With Background Image --------------------------------------------
  if (slice.variation === "withBackgroundImage") {
    const center = slice.primary.center_text;
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative px-[5%] py-8 md:py-12 lg:py-16"
      >
        <div className={`relative z-10 ${center ? "flex flex-col items-center text-center" : ""}`}>
          <div className="w-full max-w-lg">
            <RichText field={heading} components={altHeading} />
            <RichText field={description} components={altParagraph} />
            {isFilled.repeatable(slice.primary.buttons) && (
              <div className={`mt-6 flex flex-wrap gap-4 md:mt-8 ${center ? "justify-center" : ""}`}>
                {slice.primary.buttons.map((link, i) => (
                  <Button key={i} field={link} alternative />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          {isFilled.image(slice.primary.image) && (
            <PrismicNextImage field={slice.primary.image} className="size-full object-cover" />
          )}
          <div className="absolute inset-0 bg-[var(--color-overlay)]" />
        </div>
      </section>
    );
  }

  // -- With Background Color --------------------------------------------
  if (slice.variation === "withBackgroundColor") {
    const center = slice.primary.center_text;
    const bgColor = slice.primary.background_color ?? undefined;
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-8 md:py-12 lg:py-16"
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        <div className="relative">
          <div
            className={`relative z-10 flex flex-col ${center ? "items-center text-center" : ""}`}
          >
            <div className="max-w-lg">
              <RichText field={heading} components={altHeading} />
              <RichText field={description} components={altParagraph} />
            </div>
            {isFilled.repeatable(slice.primary.buttons) && (
              <div className={`mt-6 flex flex-wrap gap-4 md:mt-8 ${center ? "items-center justify-center" : ""}`}>
                {slice.primary.buttons.map((link, i) => (
                  <Button key={i} field={link} alternative />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // -- Two Cols ---------------------------------------------------------
  if (slice.variation === "twoCols") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-8 md:py-12 lg:py-16"
      >
        <div className="mx-auto max-w-5xl grid w-full grid-cols-1 items-start justify-between gap-6 md:grid-cols-[1fr_max-content] md:gap-x-12 md:gap-y-8 lg:gap-x-20">
          <div className="md:mr-12 lg:mr-0">
            <div className="w-full max-w-lg">
              <RichText
                field={heading}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="mb-5 text-3xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-4xl lg:text-5xl">
                      {children}
                    </h2>
                  ),
                }}
              />
              <RichText field={description} additionalClassNames="text-[var(--color-text-secondary)]" />
            </div>
          </div>
          {isFilled.repeatable(slice.primary.buttons) && (
            <div className="flex items-start justify-start gap-4">
              {slice.primary.buttons.map((link, i) => (
                <Button key={i} field={link} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // -- Two Cols Text and Image ------------------------------------------
  if (slice.variation === "twoColsTextAndImage") {
    const imageLeft = slice.primary.image_left;
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-8 md:py-12 lg:py-16"
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
            <div className={imageLeft ? "order-2" : "order-1"}>
              <RichText field={heading} />
              <RichText field={description} additionalClassNames="text-[var(--color-text-secondary)]" />
              {isFilled.repeatable(slice.primary.buttons) && (
                <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                  {slice.primary.buttons.map((link, i) => (
                    <Button key={i} field={link} />
                  ))}
                </div>
              )}
            </div>
            {isFilled.image(slice.primary.image) && (
              <div className={imageLeft ? "order-1" : "order-2"}>
                <PrismicNextImage field={slice.primary.image} className="w-full object-cover border-2 border-[var(--color-border)] rounded-xl shadow-(--shadow-primary)" />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // -- Two Cols Featured Collection (text ref) --------------------------
  // -- Two Cols Featured Product (text ref) -----------------------------
  // -- IF Two Cols Featured Collection (integration) --------------------
  // -- IF Two Cols Featured Product (integration) -----------------------
  // All use the same Header37/Header36 two-col full-size pattern
  if (
    slice.variation === "twoColsFeaturedCollection" ||
    slice.variation === "twoColsFeaturedProduct" ||
    slice.variation === "ifTwoColsFeaturedCollection" ||
    slice.variation === "ifTwoColsFeaturedProduct"
  ) {
    const isCollection = slice.variation.includes("Collection");
    const isIntegration = slice.variation.startsWith("if");

    let referenceId: string | null = null;

    if (isIntegration) {
      // Get ID from integration field blob
      const primary = slice.primary as Record<string, unknown>;
      const integrationField = isCollection
        ? (primary.collection as Record<string, unknown> | undefined)
        : (primary.product as Record<string, unknown> | undefined);
      referenceId = (integrationField?.id as string) || null;
    } else {
      // Get ID from text field
      const primary = slice.primary as Record<string, unknown>;
      const textField = isCollection
        ? (primary.collection_reference as string | undefined)
        : (primary.product_reference as string | undefined);
      referenceId = textField || null;
    }

    // Render featured content with fetched data
    const FeaturedContent = () => {
      const [data, setData] = useState<Record<string, unknown> | null>(null);
      const [loading, setLoading] = useState(!!referenceId);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        if (!referenceId) {
          setLoading(false);
          return;
        }

        const promise = isCollection
          ? fetchCategory(referenceId)
          : fetchProduct(referenceId);

        promise
          .then(setData)
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));
      }, []);

      if (!referenceId) {
        return (
          <TwoColsFullSize
            slice={slice}
            textContent={
              <>
                <RichText field={heading} />
                <RichText field={description} additionalClassNames="text-[var(--color-text-secondary)]" />
                {isFilled.repeatable(slice.primary.buttons) && (
                  <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                    {slice.primary.buttons.map((link, i) => (
                      <Button key={i} field={link} />
                    ))}
                  </div>
                )}
              </>
            }
          />
        );
      }

      if (loading) {
        return (
          <TwoColsFullSize
            slice={slice}
            textContent={
              <>
                <RichText field={heading} />
                <RichText field={description} additionalClassNames="text-[var(--color-text-secondary)]" />
                <div className="mt-4 h-4 w-32 animate-pulse bg-gray-200" />
              </>
            }
          />
        );
      }

      if (error || !data) {
        return (
          <TwoColsFullSize
            slice={slice}
            textContent={
              <>
                <RichText field={heading} />
                <RichText field={description} additionalClassNames="text-[var(--color-text-secondary)]" />
                <p className="mt-4 text-sm text-red-500">{error || "Failed to load data"}</p>
              </>
            }
          />
        );
      }

      return (
        <TwoColsFullSize
          slice={slice}
          textContent={
            <>
              <RichText field={heading} />
              <RichText field={description} additionalClassNames="text-[var(--color-text-secondary)]" />
              {isCollection && (data as Record<string, unknown>).products ? (
                <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                  {((data as Record<string, unknown>).products as Array<unknown>).length} products available
                </p>
              ) : null}
              {!isCollection && (
                <div className="mt-4 space-y-2">
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                    ${String((data as Record<string, unknown>).price)}
                  </p>
                  {(data as Record<string, unknown>).rating ? (
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      ★ {((data as Record<string, unknown>).rating as number).toFixed(1)} rating
                    </p>
                  ) : null}
                </div>
              )}
              {isFilled.repeatable(slice.primary.buttons) && (
                <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                  {slice.primary.buttons.map((link, i) => (
                    <Button key={i} field={link} />
                  ))}
                </div>
              )}
            </>
          }
        />
      );
    };

    return <FeaturedContent />;
  }

  return null;
};

export default CallToAction;
