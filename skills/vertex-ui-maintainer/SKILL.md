---
name: vertex-ui-maintainer
description: Mantener y evolucionar la libreria Vertex UI Components en este repositorio. Usar cuando se pidan cambios en componentes React/TypeScript, estilos CSS de los componentes, barrels de exportacion por categoria, actualizacion de docs tecnicas o ajustes de calidad (lint/tests/build) del proyecto.
---

# Vertex UI Maintainer

## Auditar antes de editar
- Revisar `package.json`, `vite.config.ts`, `src/lib/index.ts` y `README.md` para respetar el flujo de libreria npm.
- Buscar impacto transversal con `rg --files src/components` y `rg "export .* from" src/components -n`.

## Implementar cambios en componentes
- Mantener componentes como funciones React con TypeScript estricto.
- Preservar contratos publicos y exportar tipos desde el `index.ts` de la categoria.
- Mantener estilos junto al componente (`*.css`) con prefijo `vx-`.

## Mantener surface publica de la libreria
- Exportar nuevos componentes/tipos desde el barrel de categoria y desde `src/lib/index.ts`.
- Evitar imports desde `src/pages` dentro de codigo de libreria.
- Si se agregan estilos base requeridos globalmente, asegurar que `src/lib/index.ts` los importe.

## Verificar calidad
- Ejecutar `bun run lint`.
- Ejecutar `bun run test`.
- Ejecutar `bun run build:lib`.
- Reportar riesgos y gaps de pruebas encontrados.
