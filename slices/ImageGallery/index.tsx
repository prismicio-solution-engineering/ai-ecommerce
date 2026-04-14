import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";

export type ImageGalleryProps = SliceComponentProps<Content.ImageGallerySlice>;

const ImageGallery: FC<ImageGalleryProps> = ({ slice }) => {
  const { heading, description } = slice.primary;
  const images = slice.primary.images ?? [];

  const gridCols =
    slice.variation === "threeCols"
      ? "md:grid-cols-3"
      : "md:grid-cols-2";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <RichText field={heading} />
          <RichText
            field={description}
            additionalClassNames="text-[var(--color-text-secondary)]"
          />
        </div>
        <div
          className={`grid grid-cols-1 items-start justify-center gap-6 md:gap-8 ${gridCols}`}
        >
          {images.map((item, index) => {
            if (!isFilled.image(item.image)) return null;

            const imageEl = (
              <PrismicNextImage
                field={item.image}
                className="size-full object-cover border-2 border-[var(--color-border)] rounded-xl shadow-(--shadow-primary)"
              />
            );

            return (
              <figure key={index}>
                {isFilled.link(item.link) ? (
                  <PrismicNextLink field={item.link} className="block transition-transform duration-300 hover:scale-101">
                    {imageEl}
                  </PrismicNextLink>
                ) : (
                  imageEl
                )}
                {isFilled.richText(item.caption) && (
                  <figcaption className="mt-3 text-center">
                    <RichText
                      field={item.caption}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="text-sm text-[var(--color-text-secondary)]">
                            {children}
                          </p>
                        ),
                      }}
                    />
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
