# Hiyaku

Blog de **Bea** sobre el oficio de Growth Partner. Escrito en español y construido con [Astro](https://astro.build) 7.

Sitio previsto en GitHub Pages:

**https://asdrubalchirinos.github.io/Hiyaku**

El layout (cabecera, lista + barra lateral, página de artículo y etiquetas) sigue la estructura de [Código Ergo Sum](https://github.com/asdrubalchirinos/codigoergosum), con una paleta propia y sin newsletter, recomendaciones, afiliados ni analítica.

## Correr el blog en local

Necesitas Node 22.22 o superior.

```bash
npm install
npm run dev
```

Abre [http://localhost:4321/Hiyaku/](http://localhost:4321/Hiyaku/). El `base` path `/Hiyaku` es el de GitHub Pages; en local las rutas también lo usan.

Otros comandos:

```bash
npm run build     # comprueba TypeScript y genera ./dist
npm run preview   # sirve el build de producción
```

## Publicar un artículo

1. Crea un archivo Markdown en `src/content/blog/AAAA/MM/slug-del-articulo.md`.
2. El `slug` de la URL es el nombre del archivo: `.../mi-articulo.md` → `/blog/mi-articulo/`.
3. Rellena el frontmatter:

```yaml
---
title: Título del artículo
subtitle: Frase corta opcional
pubDate: 2026-10-18
updatedDate: 2026-10-20   # opcional
heroImage: /images/blog/mi-articulo/hero.svg
author: Bea
tags:
  - growth-partners   # o negocios; se pueden combinar con otras
  - oficio
featured: false
draft: false
---
```

4. Si usas `heroImage`, pon el archivo en `public/images/blog/<slug>/`.
5. Haz commit y push a `main`. El workflow publica solo.

### Etiquetas de público

Cada artículo debe llevar **al menos una** de estas dos, y puede sumar otras:

| Etiqueta           | Público                                                         |
| ------------------ | --------------------------------------------------------------- |
| `growth-partners`  | Otros Growth Partners                                           |
| `negocios`         | Dueños de negocio que buscan un Growth Partner                  |

Las páginas de filtro viven en `/tags/<etiqueta>/`.

### Borradores y ejemplos

`draft: true` marca el artículo como **Ejemplo** (badge en listas y aviso en la página). Los dos textos iniciales son ejemplos y llevan `draft: true`. Cuando publiques de verdad, pon `draft: false` y quita la nota de ejemplo del cuerpo.

Una `pubDate` futura no aparece en el sitio construido (`npm run build` / GitHub Pages). En `npm run dev` sí se ve.

## Cambiar los colores

Toda la paleta está en las variables de `src/styles/global.css`.

```css
:root {
  --accent: 163, 74, 36;      /* terracota */
  --accent-light: 232, 176, 140;
  --accent-dark: 110, 42, 18;
  --growth: 74, 111, 62;      /* oliva */
  --black: 36, 28, 22;        /* texto */
  --gray: 107, 88, 74;
  --gray-light: 242, 230, 216;
  --gray-dark: 58, 42, 32;
  --white: 253, 248, 240;     /* fondo crema */
}
```

Los valores son componentes RGB sin `rgb()`, para poder usarlos también con transparencia: `rgba(var(--accent), 0.15)`.

El modo oscuro se ajusta solo con `prefers-color-scheme`. Si cambias el acento, revisa el contraste del texto sobre el fondo (mínimo 4.5:1 en cuerpo y enlaces).

El logo y el favicon están en `public/logo.svg` y `public/favicon.svg`.

## Despliegue (GitHub Pages)

Es el mismo mecanismo que Código Ergo Sum: un workflow de GitHub Actions publica el contenido de `dist/` en Pages.

1. En el repositorio: **Settings → Pages → Source → GitHub Actions**.
2. En **Settings → Actions → General → Workflow permissions**, permite lectura y escritura.
3. Cada push a `main` (o un disparo manual en **Actions**) construye y publica.

URL gratuita, sin dominio propio:

```
https://asdrubalchirinos.github.io/Hiyaku
```

`astro.config.mjs` ya tiene el base path correcto:

```js
site: "https://asdrubalchirinos.github.io",
base: "/Hiyaku",
```

### Añadir un dominio propio después

1. En el DNS del dominio, apunta el apex y/o `www` a GitHub Pages:

   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  asdrubalchirinos.github.io
   ```

2. En **Settings → Pages → Custom domain**, escribe el dominio y espera la verificación. Activa **Enforce HTTPS**.
3. En `astro.config.mjs` cambia a la URL canónica y quita el subpath:

   ```js
   site: "https://tudominio.com",
   base: "/",
   ```

4. Commit y push a `main`. El siguiente deploy usará las rutas en la raíz.

## SEO y feeds

- Sitemap: `/sitemap-index.xml`
- RSS: `/rss.xml` (también `/feed`)
- `robots.txt` apunta al sitemap
- Meta Open Graph, Twitter Card y JSON-LD en portada y artículos

## Estructura

```
src/
  components/        # cabecera, pie, barra lateral, artículo
  content/blog/      # Markdown de los posts
  content.config.ts  # schema del frontmatter
  layouts/           # layout base
  pages/             # portada, blog, etiquetas, sobre Bea, RSS
  styles/global.css  # paleta y tipografía
  consts.ts
```
