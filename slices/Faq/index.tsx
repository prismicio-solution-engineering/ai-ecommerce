import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

const Faq: FC<FaqProps> = ({ slice }) => {
  const {
    heading,
    description,
    questions,
    footer_heading,
    footer_description,
    button,
  } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-[5%] py-8 md:py-12 lg:py-16"
    >
      <div className="container mx-auto max-w-lg">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <RichText field={heading} />
          <RichText
            field={description}
            additionalClassNames="text-[var(--color-text-secondary)]"
          />
        </div>

        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {(questions ?? []).map((item, index) => (
            <details key={index} className="group py-4 md:py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-[var(--color-text-primary)] md:text-[18px]">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="ml-4 inline-flex size-5 shrink-0 items-center justify-center transition-transform duration-200 group-open:rotate-180"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 5L7 9L11 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="pt-3 md:pb-2">
                <RichText
                  field={item.answer}
                  additionalClassNames="text-[var(--color-text-secondary)]"
                />
              </div>
            </details>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          {isFilled.richText(footer_heading) && (
            <RichText field={footer_heading} />
          )}
          {isFilled.richText(footer_description) && (
            <RichText
              field={footer_description}
              additionalClassNames="text-[var(--color-text-secondary)]"
            />
          )}
          {isFilled.link(button) && (
            <div className="mt-6 md:mt-8">
              <Button field={button} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Faq;
