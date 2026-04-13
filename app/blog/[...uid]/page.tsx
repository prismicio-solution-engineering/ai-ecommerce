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
  const article = await client.getByUID("article", uid).catch(() => null);

  if (!article) return {};

  return {
    title: article.data.meta_title,
    description: article.data.meta_description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { uid } = await params;
  const client = createClient();
  const article = await client.getByUID("article", uid).catch(() => notFound());
  return <SliceZone slices={article.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("article");

  function splitUrl(url: string) {
    // Split the URL by '/' and remove any empty strings from the result
    const parts = url.split("/").filter((part) => part !== "");

    // Assuming the URL format is consistent and has the blog as the first part,
    // category as the second part, and UID as the last part

    if (parts.length === 2) {
      return {
        uid: parts[2] ? [parts[2]] : "",
      };
    }
    if (parts.length === 3) {
      return {
        uid: [parts[2] || "", parts[3] || ""],
      };
    }
    return null;
  }
  console.log(pages);
  return pages
    .map((page) => {
      return splitUrl(page.url!);
    })
    .filter((page) => page !== null);
}
