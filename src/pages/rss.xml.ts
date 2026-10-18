import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { excerptFromPost, getPublishedPosts, sortByDate } from "../utils/posts";
import { withBase } from "../utils/paths";

export async function GET(context: { site?: URL }) {
  const site = context.site;
  if (!site) {
    return new Response("RSS requiere la opción `site` de Astro.", { status: 500 });
  }

  const posts = sortByDate(await getPublishedPosts());
  const feedSite = new URL(withBase("/"), site);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: feedSite,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: excerptFromPost(post, 500),
      link: withBase(`/blog/${post.id}/`),
      categories: post.data.tags.length ? post.data.tags : undefined,
    })),
    customData:
      `<language>es</language>` +
      `<atom:link href="${new URL(withBase("/rss.xml"), site).toString()}" rel="self" type="application/rss+xml" />`,
  });
}
