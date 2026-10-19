# Club Natación Leganés · web

Web estática (HTML, CSS y JS, sin frameworks ni base de datos) lista para Cloudflare Pages. Coste: 0 € de hosting; solo el dominio.

## Estructura

```
index.html          Página única con todas las secciones
legal.html          Aviso legal, privacidad y cookies
404.html            Página de error
_headers            Cabeceras de seguridad y caché (Cloudflare)
robots.txt / sitemap.xml
assets/css/styles.css
assets/js/main.js
assets/fonts/       Tipografías alojadas en la propia web
assets/img/         Marcadores de foto (.svg), favicon e imagen para redes
```

## Editar contenidos

Todo se edita a mano en `index.html`. Busca `✏️ EDITAR` para encontrar los bloques que más cambian: horarios, tarifas, actividades, equipo, galería, contacto, trofeos y colaboradores.

- **[COMPLETAR]**: datos que no estaban en la web anterior (precios, edades, cursos de adultos, NIF…). Aparecen resaltados en amarillo. Busca `COMPLETAR` en `index.html` y `legal.html`.
- **Horarios**: cada franja es una fila `<tr data-tipo="...">`. El `data-tipo` (`escuela`, `competicion`, `master`, `adultos`) controla el filtro.
- **Precios**: aparecen en las tarjetas de *Actividades* y en la tabla *Precios*. Cámbialos en los dos sitios.
- **Fotos**: sustituye los `.svg` de `assets/img/` por fotos `.webp` o `.jpg` (≈1200 px de ancho, < 300 KB) y actualiza `src`, `width`, `height` y el texto `alt`.
- **Formulario**: crea un formulario gratis en [formspree.io](https://formspree.io) y pon tu ID en el `action` del formulario (`https://formspree.io/f/TU_ID`). Mientras no lo hagas, el formulario avisa y remite al Google Form.
- **Contacto**: si cambia el teléfono o el email, actualízalo también en el bloque JSON-LD del `<head>`.

## Probar en local

```bash
npx http-server . -p 5182 -c-1
```

Abre http://localhost:5182.

## Desplegar en Cloudflare Pages

**Opción A · subida directa (sin Git):**

1. Entra en [dash.cloudflare.com](https://dash.cloudflare.com) → *Workers & Pages* → *Create* → pestaña *Pages* → *Upload assets*.
2. Pon un nombre al proyecto (p. ej. `natacion-leganes`) y arrastra **el contenido** de esta carpeta: `index.html` debe quedar en la raíz. `README.md` y `CLAUDE.md` no hacen falta.
3. *Deploy*. La web queda en `https://natacion-leganes.pages.dev`.
4. Para actualizar: *Create new deployment* y vuelve a subir la carpeta.

**Opción B · desde GitHub (se publica sola en cada cambio):**

1. Sube esta carpeta a un repositorio.
2. *Workers & Pages* → *Create* → *Pages* → *Connect to Git* → elige el repositorio.
3. Framework preset: **None** · Build command: *(vacío)* · Build output directory: `/`.

## Conectar el dominio

1. En el proyecto de Pages: *Custom domains* → *Set up a custom domain* → escribe `www.natacionleganes.com` (y después `natacionleganes.com`).
2. **Si el dominio ya está en Cloudflare**: los registros DNS se crean solos.
3. **Si está en otro registrador**:
   - Recomendado: añade el dominio a Cloudflare (*Add a site*, plan Free) y cambia los *nameservers* en tu registrador por los que te indique Cloudflare. Así funcionan `www` y el dominio sin `www`.
   - Alternativa (solo `www`): en tu registrador crea un `CNAME` de `www` → `natacion-leganes.pages.dev`.
4. La web actual está en Google Sites: elimina en tu DNS los registros que apuntan a Google Sites (`ghs.googlehosted.com`) y desvincula el dominio en la configuración de Google Sites.
5. Para que el dominio sin `www` redirija a `www`: en Cloudflare, *Rules* → *Redirect Rules* → plantilla *Redirect from root to WWW*.
6. El HTTPS se activa automáticamente en unos minutos.

Si usas otro dominio, cámbialo en `index.html` (canonical, Open Graph y JSON-LD), `legal.html`, `sitemap.xml` y `robots.txt`.

## Después de publicar

- Da de alta `https://www.natacionleganes.com/sitemap.xml` en [Google Search Console](https://search.google.com/search-console).
- Comprueba la vista previa en redes con el [Sharing Debugger de Facebook](https://developers.facebook.com/tools/debug/).
- Si añades vídeo de YouTube, analítica u otro servicio externo, añade su dominio a la `Content-Security-Policy` de `_headers` y revisa la política de cookies.
