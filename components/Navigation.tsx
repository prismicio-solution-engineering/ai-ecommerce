"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";
import {
  NavigationDocumentData,
  NavLinksSliceWithSubmenu,
} from "@/prismicio-types";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

// Custom media query hook
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export const Navigation = (props: NavigationDocumentData) => {
  const { logo_image, logo_link, buttons, nav_links } = {
    ...props,
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  return (
    <section
      id="relume"
      className="z-999 flex w-full items-center border-b border-(--color-border) bg-background-primary lg:min-h-18 lg:px-[5%]"
    >
      <div className="mx-auto size-full lg:grid lg:grid-cols-[0.375fr_1fr_0.375fr] lg:items-center lg:justify-between lg:gap-4">
        <div className="flex h-16 items-center justify-between px-[5%] md:h-18 lg:px-0">
          <PrismicNextLink field={logo_link} className="h-full">
            <PrismicNextImage field={logo_image} className="h-full py-2" />
          </PrismicNextLink>
          <div className="flex items-center gap-4 lg:hidden">
            {isFilled.link(buttons?.[0]) && (
              <div>
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-1 rounded border border-border-primary hover:bg-background-secondary transition-colors"
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            )}
            <button
              className="-mr-2 flex size-12 flex-col items-center justify-center"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-black"
                animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                variants={topLineVariants}
              />
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-black"
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={middleLineVariants}
              />
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-black"
                animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                variants={bottomLineVariants}
              />
            </button>
          </div>
        </div>
        <motion.div
          variants={{
            open: {
              height: "var(--height-open, 100dvh)",
            },
            close: {
              height: "var(--height-closed, 0)",
            },
          }}
          animate={isMobileMenuOpen ? "open" : "close"}
          initial="close"
          exit="close"
          transition={{ duration: 0.4 }}
          className="overflow-hidden px-[5%] text-center lg:flex lg:items-center lg:justify-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          {nav_links.map((navLink, index) =>
            navLink.variation === "withSubmenu" &&
            navLink.primary.submenu_links?.length > 0 ? (
              <SubMenu key={index} navLink={navLink} isMobile={isMobile} />
            ) : (
              <PrismicNextLink
                key={index}
                field={navLink.primary.link}
                className="block py-3 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2"
              ></PrismicNextLink>
            ),
          )}
        </motion.div>
        {isFilled.link(buttons?.[0]) && (
          <div className="hidden justify-self-end lg:block">
            {buttons.map((button, index) => (
              <button
                key={index}
                className="px-6 py-2 rounded border border-border-primary hover:bg-background-secondary transition-colors"
              >
                {button.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const SubMenu = ({
  navLink,
  isMobile,
}: {
  navLink: NavLinksSliceWithSubmenu;
  isMobile: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="flex w-full items-center justify-center gap-4 py-3 text-center text-md lg:w-auto lg:flex-none lg:justify-start lg:gap-2 lg:px-4 lg:py-2 lg:text-base"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <PrismicNextLink field={navLink.primary.link}>
          {navLink.primary.link.text}
        </PrismicNextLink>

        <motion.span
          animate={isDropdownOpen ? "rotated" : "initial"}
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center text-lg"
        >
          <RxChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.nav
            animate="open"
            initial="close"
            exit="close"
            variants={{
              open: {
                opacity: 1,
                y: 0,
                height: "auto",
              },
              close: {
                opacity: 0,
                y: -10,
                height: 0,
              },
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-background lg:absolute lg:z-50 lg:p-2 lg:min-w-max lg:top-1/10"
          >
            {navLink.primary.submenu_links?.map((subMenuLink, index) => (
              <PrismicNextLink
                key={subMenuLink.key || index}
                field={subMenuLink}
                className="block py-3 text-center lg:px-4 lg:py-2 lg:text-left hover:bg-background-secondary"
              />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </section>
  );
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};
