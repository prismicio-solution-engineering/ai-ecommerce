import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => null);

  if (!page) return {};

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");

  function splitUrl(url: string) {
    // Split the URL by '/' and remove any empty strings from the result
    const parts = url.split("/").filter((part) => part !== "");

    // Assuming the URL format is consistent and has the category as the first part,
    // and UID as the last part

    if (parts.length === 2) {
      return {
        uid: parts[1] ? [parts[1]] : "",
      };
    }
    if (parts.length === 3) {
      return {
        uid: [parts[1] || "", parts[2] || ""],
      };
    }
    return null;
  }
  // console.log(pages);
  return pages
    .map((page) => {
      return splitUrl(page.url!);
    })
    .filter((page) => page !== null);
}