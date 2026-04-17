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
        className="px-[5%] py-8 md:py-12 lg:py-16"
      >
          <div className="mx-auto max-w-5xl">
            <RichText field={slice.primary.content} />
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
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            {imageLeft ? (
              <>
                {isFilled.image(slice.primary.image) && (
                  <div>
                    <PrismicNextImage
                      field={slice.primary.image}
                      className="w-full object-cover border-2 border-[var(--color-border)] rounded-xl shadow-(--shadow-primary)"
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
                      className="w-full object-cover border-2 border-[var(--color-border)] rounded-xl shadow-(--shadow-primary)"
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
      <div className={`w-full box-border px-[5%] py-[10%] lg:max-w-xl ${imageLeft ? "lg:justify-self-start" : "lg:justify-self-end"} lg:px-20`}>
        <RichText field={slice.primary.heading} />
        <RichText
          field={slice.primary.description}
          additionalClassNames="text-[var(--color-text-secondary)]"
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
        className="grid grid-cols-1 items-center lg:grid-cols-2 lg:pt-0"
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
        className="px-[5%] py-8 md:py-12 lg:py-16"
      >
        <div className="mx-auto max-w-2xl">
          <blockquote className="flex flex-col sm:flex-row gap-4 p-6 border-2 border-[var(--color-text-secondary)] bg-[var(--color-surface)] rounded-xl shadow-(--shadow-primary)">
            <div className="text-[var(--color-text-secondary)]">
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="currentColor"><path d="m228-240 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T458-480L320-240h-92Zm360 0 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T818-480L680-240h-92Z"/></svg>
            </div>
            <RichText
              field={slice.primary.quote}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-lg italic text-[var(--color-text-secondary)] md:text-xl">
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
                  className="size-14 rounded-full object-cover shadow-(--shadow-primary)"
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
        className="px-[5%] py-8 md:py-12 lg:py-16"
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            {imageLeft ? (
              <>
                {isFilled.image(slice.primary.image) && (
                  <div>
                    <PrismicNextImage
                      field={slice.primary.image}
                      className="w-full object-cover border-2 border-[var(--color-border)] rounded-xl shadow-(--shadow-primary)"
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
                    additionalClassNames="text-[var(--color-text-secondary)]"
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
                    additionalClassNames="text-[var(--color-text-secondary)]"
                  />
                </div>
                {isFilled.image(slice.primary.image) && (
                  <div>
                    <PrismicNextImage
                      field={slice.primary.image}
                      className="w-full object-cover border-2 border-[var(--color-border)] rounded-xl shadow-(--shadow-primary)"
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
