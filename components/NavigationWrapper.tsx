import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { Navigation } from "./Navigation";

export async function NavigationWrapper() {
  const client = createClient();

  try {
    const navigation = await client.getSingle("navigation");

    if (!navigation) {
      return <Navigation />;
    }

    // Transform Prismic data to Navigation props format
    const logoImage = navigation.data.logo_image;
    const logoLink = navigation.data.logo_link;
    const navLinksSlices = navigation.data.nav_links ?? [];
    const buttonsGroup = navigation.data.buttons ?? [];

    // Transform nav links from slices
    const navLinks = navLinksSlices
      .map((slice: any) => {
        if (slice.slice_type !== "nav_links") return null;

        const title = slice.primary?.title || "";
        const link = slice.primary?.link;
        const url = isFilled.link(link)
          ? link.url || "#"
          : "#";

        if (slice.variation === "withSubmenu") {
          const subMenuLinks = (slice.items || [])
            .map((item: any) => {
              const subLink = item.submenu_links;
              return {
                title: subLink?.text || "Link",
                url: isFilled.link(subLink) ? subLink.url || "#" : "#",
              };
            })
            .filter((item) => item.url !== "#" || item.title !== "");

          return {
            title,
            url,
            subMenuLinks: subMenuLinks.length > 0 ? subMenuLinks : undefined,
          };
        }

        return {
          title,
          url,
        };
      })
      .filter(Boolean);

    // Transform buttons
    const buttons = buttonsGroup.map((btn: any) => ({
      title: btn.button_text || "Button",
      link: btn.button_link?.url || "#",
      variant: btn.button_variant || "Primary",
    }));

    const props = {
      logo: {
        src: logoImage?.url || "https://d22po4pjz3o32e.cloudfront.net/logo-image.svg",
        alt: logoImage?.alt || "Logo",
        url: isFilled.link(logoLink) ? logoLink.url : "#",
      },
      navLinks,
      buttons,
    };

    return <Navigation {...props} />;
  } catch (error) {
    console.error("Failed to fetch navigation:", error);
    return <Navigation />;
  }
}
