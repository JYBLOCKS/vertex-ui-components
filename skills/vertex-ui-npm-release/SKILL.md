---
name: vertex-ui-npm-release
description: Preparar y publicar Vertex UI Components en npm de forma segura y repetible. Usar cuando se solicite versionado, empaquetado de libreria, validacion de artefactos `dist`, checklist de publicacion, o instrucciones de consumo desde otros proyectos.
---

# Vertex UI NPM Release

## Preparar release
- Validar `version`, `exports`, `types`, `files` y `peerDependencies` en `package.json`.
- Confirmar entrada de libreria en `src/lib/index.ts` y build de libreria en `vite.config.ts`.

## Ejecutar validaciones
- Ejecutar `bun run lint`.
- Ejecutar `bun run test`.
- Ejecutar `bun run build:lib`.

## Inspeccionar paquete a publicar
- Ejecutar `npm pack --dry-run` para verificar archivos incluidos.
- Confirmar que existan `dist/index.js`, `dist/index.cjs`, `dist/style.css`, `dist/types/**`.

## Publicar
- Actualizar version con semver (`patch`, `minor`, `major`) antes de publicar.
- Publicar con `npm publish --access public` (si aplica).
- Documentar cambios de release y comando de instalacion para consumidores.
