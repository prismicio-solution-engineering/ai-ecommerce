import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";

export type MediaProps = SliceComponentProps<Content.MediaSlice>;

const Media: FC<MediaProps> = ({ slice }) => {
  // -- Image variation --------------------------------------------------
  if (slice.variation === "default") {
    if (!isFilled.image(slice.primary.image)) return null;
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-lg">
          <figure>
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full object-cover border-2 border-[var(--color-border)] rounded-xl shadow-(--shadow-primary)"
            />
            {isFilled.richText(slice.primary.caption) && (
              <figcaption className="mt-3 text-center">
                <RichText
                  field={slice.primary.caption}
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
        </div>
      </section>
    );
  }

  // -- Video variation --------------------------------------------------
  if (slice.variation === "video") {
    const embed = slice.primary.video;
    if (!isFilled.embed(embed)) return null;
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-lg">
          <figure>
            <div
              className="aspect-video w-full overflow-hidden [&>iframe]:size-full border-2 border-[var(--color-border)] rounded-xl shadow-(--shadow-primary)"
              dangerouslySetInnerHTML={{ __html: embed.html ?? "" }}
            />
            {isFilled.richText(slice.primary.caption) && (
              <figcaption className="mt-3 text-center">
                <RichText
                  field={slice.primary.caption}
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
        </div>
      </section>
    );
  }

  return null;
};

export default Media;
