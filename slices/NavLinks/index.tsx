import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export type NavLinksProps = SliceComponentProps<Content.NavLinksSlice>;

const NavLinks: FC<NavLinksProps> = ({ slice }) => {
  const { title, link } = slice.primary;

  if (slice.variation === "default") {
    return (
      <div>
        {isFilled.link(link) ? (
          <PrismicNextLink field={link} className="block">
            {title}
          </PrismicNextLink>
        ) : (
          <span>{title}</span>
        )}
      </div>
    );
  }

  if (slice.variation === "withSubmenu") {
    return (
      <div>
        {isFilled.link(link) ? (
          <PrismicNextLink field={link} className="block">
            {title}
          </PrismicNextLink>
        ) : (
          <span>{title}</span>
        )}
        {isFilled.repeatable(slice.items) && (
          <div className="submenu">
            {slice.items.map((item, index) => (
              <div key={index}>
                {isFilled.link(item.submenu_links) && (
                  <PrismicNextLink field={item.submenu_links}>
                    {item.submenu_links?.text || "Link"}
                  </PrismicNextLink>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default NavLinks;
