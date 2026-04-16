import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export type NavLinksProps = SliceComponentProps<Content.NavLinksSlice>;

const NavLinks: FC<NavLinksProps> = ({ slice }) => {
  const { link } = slice.primary;

  if (slice.variation === "default") {
    return (
      <div>
        {isFilled.link(link) ? (
          <PrismicNextLink field={link} className="block" />
        ) : (
          <span>{link.text}</span>
        )}
      </div>
    );
  }

  if (slice.variation === "withSubmenu") {
    return (
      <div>
        {isFilled.link(link) ? (
          <PrismicNextLink field={link} className="block" />
        ) : (
          <span>{link.text}</span>
        )}
        {isFilled.repeatable(slice.primary.submenu_links) && (
          <div className="submenu">
            {slice.primary.submenu_links.map((link, index) => (
              <div key={index}>
                {isFilled.link(link) && (
                  <PrismicNextLink field={link}>
                    {link?.text || "Link"}
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
