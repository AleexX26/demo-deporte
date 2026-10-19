# SEO y marketing · Club Natación Leganés

Objetivo: salir arriba en Google para búsquedas como **natación Leganés**, **club natación Leganés**, **clases de natación Leganés**, **escuela de natación Leganés**, **matronatación Leganés**, **natación máster Leganés** y **piscina El Carrascal**.

> Expectativas realistas: búsquedas muy genéricas como «Leganés» o «deporte Leganés» las dominan el Ayuntamiento, el CD Leganés y los medios. Una web de club no va a ganar ahí. Donde sí puede quedar primera es en las búsquedas de natación en Leganés y, sobre todo, en el **mapa de Google** (los 3 resultados con chincheta). Ese mapa depende más de Google Business Profile que de la web.

## Ya hecho en la web

- `<title>` y meta description con «natación» + «Leganés».
- Encabezados con las palabras clave: «Clases de natación en Leganés», «Escuela de natación en Leganés», «Natación máster en Leganés», «Horarios de natación».
- Sección de **preguntas frecuentes** (lo que la gente busca: horarios, bebés, adultos, inscripción, dónde está).
- Datos estructurados (JSON-LD): `SportsClub` con dirección, coordenadas de las dos piscinas, horario, teléfono, redes y federaciones; `FAQPage`; `WebSite`.
- NAP (nombre, dirección, teléfono) en el pie, idéntico en toda la web.
- Etiquetas `geo`, Open Graph y Twitter para compartir en redes.
- `sitemap.xml`, `robots.txt` y canonical a `https://www.natacionleganes.com/`.
- **Redirecciones 301** (`_redirects`) desde las URLs de la web antigua de Google Sites (`/información/horarios`, `/escuela`, `/noticias/...`) a las secciones nuevas: no se pierde lo ganado.
- Web rápida (sin frameworks, fuentes locales, imágenes diferidas), móvil primero y con barra de «Llamar / Inscríbete» en móvil.

## Pasos imprescindibles (por orden de impacto)

### 1. Conectar el dominio natacionleganes.com (crítico)

El dominio actual ya tiene antigüedad y Google lo conoce. La web nueva **debe** publicarse en ese dominio (ver `README.md` → «Conectar el dominio»). Mientras siga en `demo-deporte.pages.dev` no posicionará: el canonical apunta a natacionleganes.com.

### 2. Google Business Profile (Perfil de Empresa de Google)

Es lo que más influye en «natación Leganés» y en Google Maps.

1. Entra en [google.com/business](https://www.google.com/business) con la cuenta del club y busca «Club Natación Leganés». Si ya existe la ficha, reclámala; si no, créala.
2. Categoría principal: **Club de natación**. Secundarias: **Escuela de natación** y **Club deportivo**.
3. Dirección: Piscina Municipal El Carrascal, Avenida de Europa 6, 28915 Leganés. Escribe nombre, dirección y teléfono **exactamente igual** que en el pie de la web.
4. Web: `https://www.natacionleganes.com`. Teléfono: 695 82 44 96. Horario de atención: lunes a viernes, de 17:00 a 21:00.
5. Descripción: usa el texto de «Quiénes somos» y menciona escuela, matronatación, competición y máster en Leganés.
6. Sube **al menos 10 fotos reales**: piscina, entrenamientos, podios, equipo y escuela. Añade fotos nuevas cada mes.
7. Publica una «Novedad» cada 2-4 semanas: inicio de temporada, trofeos, resultados.
8. **Reseñas**: pide a familias y nadadores que dejen una reseña (manda el enlace por el grupo de WhatsApp del club). Responde a todas. Es el factor nº 1 del mapa.

### 3. Google Search Console

1. Añade la propiedad de dominio `natacionleganes.com` en [search.google.com/search-console](https://search.google.com/search-console) y verifícala con el registro DNS que te den (en Cloudflare: DNS → Add record → TXT).
2. Envía el sitemap: `https://www.natacionleganes.com/sitemap.xml`.
3. En «Inspección de URLs», pide la indexación de la portada.
4. A las 2-4 semanas, revisa en «Rendimiento» las búsquedas por las que apareces.

### 4. Enlaces y menciones locales (autoridad)

- Pide al **Ayuntamiento de Leganés / Leganés Deporte** que enlace la web en su listado de clubes y entidades deportivas.
- Revisa que la ficha del club en la **Federación Madrileña de Natación** y la **RFEN** enlace a la web.
- Pon el enlace a la web en la **bio de Instagram, Facebook y X** del club, y en los carteles y PDF de los trofeos (normativa, series).
- Pide a colaboradores y patrocinadores que enlacen la web desde la suya.
- Pide una mención en la prensa local de Leganés cuando haya un logro (ascensos, medallas), con enlace a la web.

### 5. Contenido que mantener vivo

- Al empezar la temporada, actualiza **horarios, precios, entrenadores y junta**. Google valora la información actual. Cambia también el `lastmod` de `sitemap.xml`.
- Rellena los `[COMPLETAR]`, sobre todo **precios y edades**: son de lo más buscado.
- Sustituye las imágenes de muestra por **fotos reales** con nombres descriptivos (`escuela-natacion-leganes-el-carrascal.webp`) y textos `alt` que describan la foto.
- Añade a «Logros» cada resultado importante.

### 6. Medir (sin cookies)

- En Cloudflare: *Workers & Pages* → `demo-deporte` → *Metrics* → activa **Web Analytics**. No usa cookies, así que no hace falta banner. Si inserta un script, añade `https://static.cloudflareinsights.com` a `script-src` y `https://cloudflareinsights.com` a `connect-src` en `_headers`.

## Palabras clave a vigilar

| Búsqueda | Sección que la responde |
| --- | --- |
| natación Leganés · club natación Leganés | Portada, «Club de natación en Leganés desde 1987» |
| clases / escuela de natación Leganés | #escuela, FAQ |
| natación bebés / matronatación Leganés | Tarjeta Matronatación, FAQ |
| natación adultos / máster Leganés | #master, FAQ |
| horarios piscina El Carrascal / Olimpia | #horarios, FAQ |
| natación competición Leganés | #competicion |
