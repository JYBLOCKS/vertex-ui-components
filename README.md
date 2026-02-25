# Vertex UI Components

Libreria de componentes UI reutilizables para React + TypeScript, con playground local en Vite para desarrollo y documentación visual.

Incluye componentes en las categorias:
- `Form`
- `Navigation`
- `Layout`
- `Surfaces`
- `DataDisplay`
- `Feedbacks`
- `Charts`
- `Styles` (tema y theme switcher)
- `Utils`

## Stack

- React 19
- TypeScript 5
- Vite 7
- Vitest + Testing Library
- ESLint (flat config)
- Bun (gestor recomendado en este repo)

## Estructura del proyecto

```text
src/
  components/        # componentes y barrels por categoria
  lib/index.ts       # entrada publica de la libreria npm
  pages/             # playground local (Home/NotFound)
  styles/main.css    # estilos base + variables globales
  __tests__/         # pruebas unitarias/integracion de componentes
```

## Scripts de desarrollo

- `bun install`: instala dependencias
- `bun run dev`: entorno local con HMR (playground)
- `bun run lint`: validacion de estilo y calidad
- `bun run test`: ejecuta tests con Vitest
- `bun run build:app`: build del playground/app
- `bun run build:lib`: build de libreria npm + declaraciones TypeScript
- `bun run build`: alias recomendado para build de libreria

## Uso como libreria (consumidor)

Instalacion:

```bash
npm install vertex-ui-components
```

Uso basico:

```tsx
import { Button, Card, ThemeProvider } from "vertex-ui-components";
import "vertex-ui-components/styles.css";

export function Example() {
  return (
    <ThemeProvider>
      <Card title="Demo">
        <Button variant="primary">Guardar</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## API publica del paquete

El paquete expone:
- `.`: componentes y tipos (`import { Button } from "vertex-ui-components"`)
- `./styles.css`: estilos compilados globales de la libreria

Salida de build:
- `dist/index.js` (ESM)
- `dist/index.cjs` (CommonJS)
- `dist/styles.css`
- `dist/types/**` (declaraciones `.d.ts`)

## Desarrollo de componentes

Reglas del repo:
- Mantener componentes como function components con TypeScript estricto.
- Exportar componente y tipos desde el `index.ts` de su categoria.
- Mantener CSS co-localizado (`Component.css`) y prefijo `vx-`.
- Evitar dependencias del playground (`src/pages`) en codigo de libreria.

Checklist al agregar un componente:
1. Crear carpeta del componente y su CSS.
2. Exportar en el `index.ts` de categoria.
3. Verificar que quede exportado desde `src/lib/index.ts`.
4. Agregar/actualizar test.
5. Ejecutar `bun run lint`, `bun run test`, `bun run build:lib`.

## Publicacion en npm

1. Actualizar version en `package.json` con semver.
2. Ejecutar validaciones:
   - `bun run lint`
   - `bun run test`
   - `bun run build:lib`
3. Verificar artefactos:
   - `npm pack --dry-run`
4. Publicar:
   - `npm publish --access public`

`prepublishOnly` ya ejecuta lint + tests + build de libreria.

## Skills del proyecto

Se incluyen skills locales para acelerar trabajo repetitivo:
- `skills/vertex-ui-maintainer/SKILL.md`: mantenimiento y evolucion de componentes.
- `skills/vertex-ui-npm-release/SKILL.md`: empaquetado y release a npm.

## Estado actual de testing

Hay suite de pruebas existente en `src/__tests__` cubriendo categorias principales.
Si agregas componentes nuevos, incluye pruebas de comportamiento (evitar snapshots como unica cobertura).
