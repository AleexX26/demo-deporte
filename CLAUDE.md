# CLAUDE.md — Club Natación Leganés
Web estática de una sola página para el Club Natación Leganés (rediseño de natacionleganes.com, hoy en Google Sites), lista para Cloudflare Pages.

## Stack
- HTML + CSS + JavaScript sin frameworks ni base de datos
- Tipografías alojadas en local: Big Shoulders Display (títulos) y Figtree (texto)
- Formspree para el formulario de inscripción (ID pendiente) y Google Form actual como alternativa
- Cloudflare Pages (`_headers` con CSP y caché)

## Arquitectura
- `index.html`: secciones con anclas: hero, cifras, `#club` (historia, valores, logros, instalaciones, trofeos), `#actividades` (`#escuela`, `#competicion`, `#master`), `#horarios` (+ `#tarifas`), `#equipo` (entrenadores y junta), `#galeria`, `#inscripcion`, `#contacto` y pie.
- `legal.html` (`#aviso-legal`, `#privacidad`, `#cookies`) y `404.html`.
- `assets/css/styles.css`: tokens en `:root`, mobile first, animaciones solo con `prefers-reduced-motion: no-preference`.
- `assets/js/main.js`: cabecera al hacer scroll, menú hamburguesa (Esc y foco atrapado), enlace activo, reveal, filtro de tablas, preselección de actividad, visor `<dialog>`, envío a Formspree por fetch y mapa bajo demanda.
- `assets/img/*.svg`: marcadores de foto generados (calles de piscina), `og-imagen.png` (1200×630) y `apple-touch-icon.png` renderizados con Edge headless.

## Comandos
- Local: `npx http-server . -p 5182 -c-1` (o preview `deporte` en `../.claude/launch.json`).
- Desplegar: `npx wrangler pages deploy . --project-name demo-deporte --branch main` (desde `Deporte/`).
- Repo: https://github.com/AleexX26/demo-deporte (rama `main`). Web: https://demo-deporte.pages.dev
- Ojo: el proyecto de Pages es de subida directa (wrangler), no está conectado a Git: un push NO publica; hay que repetir el `wrangler pages deploy`.
- Dominio propio y alternativa por el panel de Cloudflare: ver `README.md`.

## Decisiones
- 2026-10-19: más impacto y confianza a petición del cliente: efectos de agua (olas SVG `#ola` reutilizadas con `<use>`, burbujas, luz bajo el agua, ondas al mover/pulsar, títulos que se llenan de agua, corchera de progreso, contadores, marquesina) y sección `#por-que` solo con datos reales. Las animaciones en bucle se pausan fuera de pantalla (`.is-paused`) y no existen con prefers-reduced-motion.
- 2026-10-19: la cabecera pasa a sólida en cuanto se hace scroll (>40px) para no solaparse con los accesos rápidos del hero.
- 2026-10-19: publicado en GitHub (AleexX26/demo-deporte) y en Cloudflare Pages `demo-deporte` creado con `wrangler pages project create --force` (igual que demo-gym; el `--force` solo hace falta la primera vez).
- 2026-10-19: la información y los textos son los de la web actual, copiados tal cual (petición expresa del cliente); solo cambia la presentación. Lo que no existe en ella va como `[COMPLETAR]` (precios, edades, cursos de adultos, NIF).
- 2026-10-19: los horarios publicados son de la temporada 2022/2023, los entrenadores de 2024/2025 y la junta de 2022-2023; se muestran así, con aviso de confirmar.
- 2026-10-19: no se incluyen las noticias de convocatorias pasadas, solo los logros (División de Honor, 1ª División Nacional, Nacional Máster de Invierno).
- 2026-10-19: sin cookies ni analítica, por eso no hay banner; el mapa de Google solo se carga al pulsar "Ver mapa".
- 2026-10-19: CSP estricta sin inline: no usar `<script>` ni `style=""` inline (el JSON-LD sí está permitido).
- 2026-10-19: paleta Abismo #0B2545, Azul #0063C6, Agua #1BB0E0, Espuma #EEF7FC y acento corchera #FF6A13 (con texto oscuro encima para pasar contraste).

## Patrones reutilizables
- **Ola SVG**: `<path id="ola">` en el sprite del `<body>` + `<svg class="waves">`/`.wave-top` con 4 `<use>` desplazándose a distinta velocidad; el color sale de `currentColor` de la sección.
- **Título que se llena de agua**: `background-clip: text` con un SVG data-URI (ola entre dos colores) cuyo `background-position` sube al aparecer (`water-fill`).
- **Burbujas**: `[data-bubbles="N"]` y `main.js` crea N `.bubble` con variables CSS aleatorias.
- **Onda al pulsar**: `.press-ripple` en `.btn`, `.chip` y `.gallery-item` (delegado en `pointerdown`).
- **Bloques `✏️ EDITAR`**: comentarios en `index.html` que marcan los datos que más cambian.
- **Tabla filtrable**: `table[data-filtrable]` + filas `tr[data-tipo]` + `.chip[data-filtro]`; en móvil pasa a tarjetas con `td[data-label]`.
- **Marcador `.completar`**: resalta en amarillo los datos pendientes.
- **Corchera**: `repeating-linear-gradient` naranja/blanco/azul (`.lane-rope`, borde de `.cards-compact`).
- **Generador de marcadores**: script Node que dibuja SVG de piscina con corcheras y etiqueta (se usó desde el scratchpad; para regenerarlos hay que reescribirlo).

## Pendiente
- Rellenar `[COMPLETAR]`: precios, edades por categoría, cursos de adultos, ID de Formspree, NIF y registro en `legal.html`, logos de colaboradores.
- Sustituir los SVG por fotos reales y el favicon "CNL" por el escudo del club.
- Confirmar horarios, entrenadores y junta de la temporada actual.

## Última actualización
2026-10-19
