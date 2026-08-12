# Encuadre — Web (Next.js + TypeScript + Tailwind)

Tu copiloto para aprender fotografía haciendo fotos reales. Eliges una referencia,
dices qué equipo tienes, y la app calcula ajustes **reales** para tu cámara/lente/dron
(verificando compatibilidad) y te explica el porqué de cada decisión.

Esta es la **Fase 2** del roadmap: migración del prototipo de archivo único a una
aplicación web profesional, modular y tipada. El estado sigue en cliente (en memoria);
la persistencia real (Supabase) llega en la Fase 3.

## Cómo ejecutarlo

```bash
npm install
npm run dev        # http://localhost:3000
```

Otros scripts: `npm run build` (build de producción), `npm run start` (sirve el build),
`npm run typecheck` (comprobación de tipos), `npm run lint`.

Requisitos: Node 18.18+ (recomendado Node 20).

## Flujo que puedes recorrer

Landing → Registro (demo, sin backend) → Onboarding (equipo + nivel) → Home →
Explorar → Detalle de una foto → Configuración (ajustes + avisos + “¿por qué?”) →
Desafío (checklist) → Resultado (XP) → Comparar (placeholder de IA) → Perfil → Planes.

## Estructura del proyecto

```
src/
├── app/            Rutas del App Router (finas: cada page.tsx importa su pantalla)
│   ├── layout.tsx  Envuelve todo en AppProvider + PhoneFrame; carga globals.css
│   ├── page.tsx    "/"  (Landing)
│   ├── auth, onboarding, home, explore, missions, profile, subscription
│   └── photo/[id]/{ , setup, challenge, result, compare }   (resuelven la foto o 404)
├── screens/        Cuerpo de cada pantalla (13). Leen estado de useApp() y navegan.
├── components/     UI reutilizable: Scene, PhotoTile, Sheets, BottomNav, GlobalSheets
├── layouts/        PhoneFrame (marco de móvil + nav condicional + sheets)
├── services/       AppProvider (Context con todo el estado + acciones)
├── hooks/          useApp() (acceso al contexto)
├── data/           Datos semilla tipados: equipment, photos, missions, concepts, levels, icons
├── utils/          engine.ts (motor de reglas) y labels.ts
└── types/          Interfaces del dominio (mapean 1:1 a futuras tablas SQL)
```

## Decisiones de arquitectura (y por qué)

- **App Router en `src/app/`, no `src/pages/`.** Con Next 14 moderno las rutas viven en
  `app/`. Una carpeta `src/pages/` la interpretaría Next como el *Pages Router* legacy y
  chocaría. El “pages” del plan se materializa como `app/` (definición de rutas) +
  `screens/` (el cuerpo de cada pantalla). Las páginas de la foto son *server components*
  que resuelven la referencia por su `id` y hacen `notFound()` si no existe, de modo que
  las URLs son compartibles y con deep-link.

- **Estado en un único `AppProvider` (Context), en memoria.** Reemplaza el `useState`
  monolítico del prototipo. Un `refresh` del navegador reinicia el estado a propósito:
  la persistencia (sesión, equipo, XP, progreso) es trabajo de la **Fase 3** con Supabase.
  La interfaz pública de `useApp()` está pensada para no cambiar al migrar, así las
  pantallas no se tocan.

- **Tailwind + design system en `globals.css`.** Tailwind está configurado con todos los
  tokens de marca (`tailwind.config.ts`) y es el sistema base. Las piezas visuales
  complejas y reutilizables (el “LCD” de ajustes, los dials, las escenas procedurales, el
  marco de móvil, los *sheets*) viven como clases en `globals.css` bajo la capa de
  Tailwind. Convertir ~760 líneas de JSX a utilidades una por una sería churn de alto
  riesgo sin valor de producto.

- **Fuentes vía `@import` en `globals.css`, no `next/font`.** `next/font/google` descarga
  las fuentes en tiempo de *build*; en producción es la opción preferible (sin *layout
  shift*), pero aquí el `@import` mantiene el build sin dependencias de red. Migrar a
  `next/font` es un cambio de una línea.

- **Motor de reglas determinista (`utils/engine.ts`).** Es el núcleo de valor: toma
  (foto + cámara + lente/dron) y devuelve ajustes reales, recorta lo que el equipo no puede
  ejecutar (p. ej. una apertura que el lente no alcanza), **compensa la exposición** según
  la prioridad de la foto (congelar / ISO bajo / equilibrado) y genera avisos y
  explicaciones. Su firma de entrada/salida está pensada para que en V2 un
  `AIPhotographyAnalyzer` lo sustituya o complemente sin reescribir la app. **No usa IA.**

## Qué NO incluye esta fase

Auth/BD/Storage reales (Supabase, Fase 3), pagos (Stripe, Fase 11), subida de fotos y EXIF
(Fase 7), IA de comparación (Fase 12), panel de administración y app móvil. La pantalla de
comparación y el paywall son placeholders funcionales, preparados para conectarse después.

## Datos semilla

7 cámaras/lentes reales, 1 dron (DJI Neo 2), 18 referencias (14 de cámara + 4 de dron),
5 misiones y 6 conceptos educativos. Añadir más es editar los arrays de `src/data/`
(en la Fase 3 pasan a tablas y a un panel de administración).
