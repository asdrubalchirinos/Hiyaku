/** Prefijo del sitio (`/Hiyaku` en GitHub Pages, vacío en un dominio propio). */
export function siteBase(): string {
  const raw = import.meta.env.BASE_URL;
  return raw === "/" ? "" : raw.replace(/\/$/, "");
}

/** Une el base path con una ruta interna que empieza por `/`. */
export function withBase(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteBase()}${clean}`;
}
