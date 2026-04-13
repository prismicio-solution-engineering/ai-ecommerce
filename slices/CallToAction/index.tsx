import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

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
      className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0"
    >
      {imageLeft ? (
        <>
          {imageBlock}
          <div className="mx-[5%] sm:max-w-md md:justify-self-start lg:ml-20 lg:mr-[5vw]">
            {textContent}
          </div>
        </>
      ) : (
        <>
          <div className="mx-[5%] sm:max-w-md md:justify-self-start lg:ml-[5vw] lg:mr-20 lg:justify-self-end">
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
      <h2 className="mb-5 text-5xl font-bold text-[var(--color-text-alternative)] md:mb-6 md:text-7xl lg:text-8xl">
        {children}
      </h2>
    ),
  };
  const altParagraph = {
    paragraph: ({ children }: { children: React.ReactNode }) => (
      <p className="text-[var(--color-text-alternative)] md:text-md">
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
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className={`container max-w-lg ${center ? "text-center" : ""}`}>
          <RichText field={heading} />
          <RichText field={description} className="text-[var(--color-text-secondary)]" />
          {isFilled.repeatable(slice.primary.buttons) && (
            <div className={`mt-6 flex flex-wrap gap-4 md:mt-8 ${center ? "items-center justify-center" : ""}`}>
              {slice.primary.buttons.map((link, i) => (
                <Button key={i} field={link} />
              ))}
            </div>
          )}
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
        className="relative px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className={`container relative z-10 ${center ? "flex flex-col items-center text-center" : ""}`}>
          <div className="w-full max-w-lg">
            <RichText field={heading} components={altHeading} />
            <RichText field={description} components={altParagraph} />
            {isFilled.repeatable(slice.primary.buttons) && (
              <div className={`mt-6 flex flex-wrap gap-4 md:mt-8 ${center ? "justify-center" : ""}`}>
                {slice.primary.buttons.map((link, i) => (
                  <Button key={i} field={link} />
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
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container relative">
          <div
            className={`relative z-10 flex flex-col p-8 md:p-12 lg:p-16 ${center ? "items-center text-center" : ""}`}
            style={bgColor ? { backgroundColor: bgColor } : undefined}
          >
            <div className="max-w-lg">
              <RichText field={heading} components={altHeading} />
              <RichText field={description} components={altParagraph} />
            </div>
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

  // -- Two Cols ---------------------------------------------------------
  if (slice.variation === "twoCols") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container grid w-full grid-cols-1 items-start justify-between gap-6 md:grid-cols-[1fr_max-content] md:gap-x-12 md:gap-y-8 lg:gap-x-20">
          <div className="md:mr-12 lg:mr-0">
            <div className="w-full max-w-lg">
              <RichText
                field={heading}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="mb-3 text-4xl font-bold leading-[1.2] text-[var(--color-text-primary)] md:mb-4 md:text-5xl lg:text-6xl">
                      {children}
                    </h2>
                  ),
                }}
              />
              <RichText field={description} className="text-[var(--color-text-secondary)]" />
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
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
            <div className={imageLeft ? "order-2" : "order-1"}>
              <RichText field={heading} />
              <RichText field={description} className="text-[var(--color-text-secondary)]" />
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
                <PrismicNextImage field={slice.primary.image} className="w-full object-cover" />
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
    return (
      <TwoColsFullSize
        slice={slice}
        textContent={
          <>
            <RichText field={heading} />
            <RichText field={description} className="text-[var(--color-text-secondary)]" />
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

  return null;
};

export default CallToAction;
