import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

// export async function generateMetadata(): Promise<Metadata> {
//   const client = createClient();
//   const home = await client.getSingle("home").catch(() => notFound());

//   return {
//     title: home.data.meta_title,
//     description: home.data.meta_description,
//     openGraph: {
//       images: [{ url: asImageSrc(home.data.meta_image) ?? "" }],
//     },
//   };
// }

export default async function HomePage() {
  const client = createClient();
  // console.log(client);
  const home = await client.getSingle("home").catch(() => notFound());
  // console.log(home);

  return <SliceZone slices={home.data.slices} components={components} />;
}
