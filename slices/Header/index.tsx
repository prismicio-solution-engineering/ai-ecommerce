import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

export type HeaderProps = SliceComponentProps<Content.HeaderSlice>;

const Header: FC<HeaderProps> = ({ slice }) => {
  const { heading, description } = slice.primary;

  // -- Default: centered text + buttons ---------------------------------
  if (slice.variation === "default") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto w-full max-w-lg text-center">
            <RichText field={heading} />
            <RichText
              field={description}
              additionalClassNames="text-[var(--color-text-secondary)]"
            />
            {isFilled.repeatable(slice.primary.buttons) && (
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
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

  // -- With Bottom Image ------------------------------------------------
  if (slice.variation === "withBottomImage") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center">
            <div className="mb-12 text-center md:mb-18 lg:mb-20">
              <div className="w-full max-w-lg">
                <RichText field={heading} />
                <RichText
                  field={description}
                  additionalClassNames="text-[var(--color-text-secondary)]"
                />
                {isFilled.repeatable(slice.primary.buttons) && (
                  <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                    {slice.primary.buttons.map((link, i) => (
                      <Button key={i} field={link} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {isFilled.image(slice.primary.image) && (
              <div>
                <PrismicNextImage
                  field={slice.primary.image}
                  className="size-full object-cover border-2 border-[var(--color-border)] rounded-xl shadow-(--shadow-primary)"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // -- Two Cols With Image ----------------------------------------------
  if (slice.variation === "twoColsWithImage") {
    const imageLeft = slice.primary.image_left;
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
            <div className={imageLeft ? "order-2 lg:order-2" : "order-1"}>
              <RichText field={heading} />
              <RichText
                field={description}
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
            {isFilled.image(slice.primary.image) && (
              <div className={imageLeft ? "order-1 lg:order-1" : "order-2"}>
                <PrismicNextImage
                  field={slice.primary.image}
                  className="w-full object-cover border-2 border-[var(--color-border)] rounded-xl shadow-(--shadow-primary)"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // -- Two Cols With Full Size Image ------------------------------------
  if (slice.variation === "twoColsWithFullSizeImage") {
    const imageLeft = slice.primary.image_left;
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="grid grid-cols-1 items-center lg:grid-cols-2 lg:pt-0"
      >
        {imageLeft ? (
          <>
            {isFilled.image(slice.primary.image) && (
              <div>
                <PrismicNextImage
                  field={slice.primary.image}
                  className="w-full object-cover lg:h-screen lg:max-h-[60rem]"
                />
              </div>
            )}
            <div className="mx-[5%] my-[10%] sm:max-w-md md:justify-self-start lg:ml-20 lg:mr-[5vw]">
              <RichText field={heading} />
              <RichText
                field={description}
                additionalClassNames="text-[var(--color-text-secondary)]"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mx-[5%] my-[10%] sm:max-w-md md:justify-self-start lg:ml-[5vw] lg:mr-20 lg:justify-self-end">
              <RichText field={heading} />
              <RichText
                field={description}
                additionalClassNames="text-[var(--color-text-secondary)]"
              />
            </div>
            {isFilled.image(slice.primary.image) && (
              <div>
                <PrismicNextImage
                  field={slice.primary.image}
                  className="w-full object-cover lg:h-screen lg:max-h-[60rem]"
                />
              </div>
            )}
          </>
        )}
      </section>
    );
  }

  // -- With Background Image --------------------------------------------
  if (slice.variation === "withBackgroundImage") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative px-[5%]"
      >
        <div className="mx-auto max-w-5xl relative z-10">
          <div className="flex max-h-[60rem] min-h-svh items-center py-16 md:py-24 lg:py-28">
            <div className="max-w-md">
              <RichText
                field={heading}
                components={{
                  heading1: ({ children }) => (
                    <h1 className="mb-5 text-4xl font-bold text-[var(--color-text-alternative)] md:mb-6 md:text-5xl lg:text-6xl">
                      {children}
                    </h1>
                  ),
                }}
              />
              <RichText
                field={description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-[var(--color-text-alternative)] md:text-md">
                      {children}
                    </p>
                  ),
                }}
              />
              {isFilled.repeatable(slice.primary.buttons) && (
                <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                  {slice.primary.buttons.map((link, i) => (
                    <Button key={i} field={link} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          {isFilled.image(slice.primary.image) && (
            <PrismicNextImage
              field={slice.primary.image}
              className="size-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-[var(--color-overlay)]" />
        </div>
      </section>
    );
  }

  return null;
};

export default Header;
