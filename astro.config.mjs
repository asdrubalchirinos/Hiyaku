// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // GitHub Pages del repo: https://asdrubalchirinos.github.io/Hiyaku
  // Si más adelante usas un dominio propio, cambia `site` y deja `base` en '/'.
  site: "https://asdrubalchirinos.github.io",
  base: "/Hiyaku",
  integrations: [sitemap()],
  output: "static",
  build: {
    format: "directory",
    assets: "_astro",
  },
  redirects: {
    "/feed": "/rss.xml",
  },
});
