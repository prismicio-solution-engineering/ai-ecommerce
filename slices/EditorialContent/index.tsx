import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

export type EditorialContentProps =
  SliceComponentProps<Content.EditorialContentSlice>;

const EditorialContent: FC<EditorialContentProps> = ({ slice }) => {
  // -- Default Rich Text ------------------------------------------------
  if (slice.variation === "default") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          <div className="mx-auto max-w-lg">
            <RichText field={slice.primary.content} />
          </div>
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
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            {imageLeft ? (
              <>
                {isFilled.image(slice.primary.image) && (
                  <div>
                    <PrismicNextImage
                      field={slice.primary.image}
                      className="w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <RichText field={slice.primary.heading} />
                  <RichText field={slice.primary.content} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <RichText field={slice.primary.heading} />
                  <RichText field={slice.primary.content} />
                </div>
                {isFilled.image(slice.primary.image) && (
                  <div>
                    <PrismicNextImage
                      field={slice.primary.image}
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  // -- Two Cols With Full Size Image ------------------------------------
  if (slice.variation === "twoColsWithFullSizeImage") {
    const imageLeft = slice.primary.image_left;
    const imageBlock = isFilled.image(slice.primary.image) ? (
      <div>
        <PrismicNextImage
          field={slice.primary.image}
          className="w-full object-cover lg:h-screen lg:max-h-[60rem]"
        />
      </div>
    ) : null;

    const textBlock = (
      <div className="mx-[5%] sm:max-w-md md:justify-self-start lg:mx-20">
        <RichText field={slice.primary.heading} />
        <RichText
          field={slice.primary.description}
          className="text-[var(--color-text-secondary)]"
        />
        {isFilled.repeatable(slice.primary.buttons) && (
          <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
            {slice.primary.buttons.map((link, i) => (
              <Button key={i} field={link} />
            ))}
          </div>
        )}
      </div>
    );

    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0"
      >
        {imageLeft ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </section>
    );
  }

  // -- Quote ------------------------------------------------------------
  if (slice.variation === "quote") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          <div className="mx-auto max-w-lg">
            <blockquote className="border-l-4 border-[var(--brand-primary)] pl-6">
              <RichText
                field={slice.primary.quote}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-lg italic text-[var(--color-text-primary)] md:text-xl">
                      {children}
                    </p>
                  ),
                }}
              />
            </blockquote>
            {(slice.primary.author_name || isFilled.image(slice.primary.author_image)) && (
              <div className="mt-8 flex items-center gap-4">
                {isFilled.image(slice.primary.author_image) && (
                  <PrismicNextImage
                    field={slice.primary.author_image}
                    className="size-14 rounded-full object-cover"
                  />
                )}
                <div>
                  {slice.primary.author_name && (
                    <p className="font-semibold text-[var(--color-text-primary)] md:text-md">
                      {slice.primary.author_name}
                    </p>
                  )}
                  {slice.primary.author_title && (
                    <p className="text-[var(--color-text-secondary)]">
                      {slice.primary.author_title}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // -- Two Cols Image and Text ------------------------------------------
  if (slice.variation === "twoColsImageAndText") {
    const imageLeft = slice.primary.image_left;
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            {imageLeft ? (
              <>
                {isFilled.image(slice.primary.image) && (
                  <div>
                    <PrismicNextImage
                      field={slice.primary.image}
                      className="w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <RichText
                    field={slice.primary.heading}
                    components={{
                      heading2: ({ children }) => (
                        <h2 className="mb-5 text-4xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-5xl lg:text-6xl">
                          {children}
                        </h2>
                      ),
                    }}
                  />
                  <RichText
                    field={slice.primary.description}
                    className="text-[var(--color-text-secondary)]"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <RichText
                    field={slice.primary.heading}
                    components={{
                      heading2: ({ children }) => (
                        <h2 className="mb-5 text-4xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-5xl lg:text-6xl">
                          {children}
                        </h2>
                      ),
                    }}
                  />
                  <RichText
                    field={slice.primary.description}
                    className="text-[var(--color-text-secondary)]"
                  />
                </div>
                {isFilled.image(slice.primary.image) && (
                  <div>
                    <PrismicNextImage
                      field={slice.primary.image}
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default EditorialContent;
