import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** Interpreta YYYY-MM-DD como fecha local para no correr el día por UTC. */
function parseDateExact(dateValue: unknown): Date {
  if (dateValue instanceof Date) return dateValue;

  const dateStr = String(dateValue);
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/);
  if (match) {
    const [, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  return new Date(dateStr);
}

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.md",
    generateId: ({ entry }) => {
      const withoutExt = entry.replace(/\.md$/i, "");
      const segments = withoutExt.split("/");
      return segments[segments.length - 1] ?? withoutExt;
    },
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    pubDate: z.preprocess((val) => parseDateExact(val), z.date()),
    updatedDate: z.preprocess(
      (val) => (val ? parseDateExact(val) : undefined),
      z.date().optional(),
    ),
    heroImage: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
