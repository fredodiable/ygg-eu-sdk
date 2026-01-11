import { defineConfig } from 'tsup';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  define: {
    // Injection des métadonnées pour l'User-Agent
    SDK_NAME: JSON.stringify(pkg.name),
    SDK_VERSION: JSON.stringify(pkg.version),
  },
});
