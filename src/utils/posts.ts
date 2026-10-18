import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

/**
 * Posts listables. En producción se ocultan las fechas futuras.
 * Los borradores (`draft: true`) sí se listan y se marcan como Ejemplo
 * para que los artículos de arranque se vean; pon `draft: false` al publicar.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  return await getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? data.pubDate <= new Date() : true;
  });
}

export function sortByDate(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function formatDate(date: Date, month: "long" | "short" = "long"): string {
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month,
    day: "numeric",
  });
}

export function isoDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Resumen corto para meta description y RSS. */
export function excerptFromPost(post: Post, maxLength = 240): string {
  if (post.data.subtitle?.trim()) return post.data.subtitle.trim();

  const cleaned = (post.body ?? "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*`]/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/!\[(.*?)\]\((.*?)\)/g, "")
    .replace(/\n+/g, " ")
    .trim();

  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength).trim()}…`;
}
