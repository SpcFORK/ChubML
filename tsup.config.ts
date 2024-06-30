import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/'],
  // splitting: true,
  platform: 'neutral',
  outDir: 'dist',
  dts: true,
  bundle: true,
  sourcemap: true,
  minify: false,
  format: ['cjs', 'esm'],
  external: ['./global', '../global'],
  banner: {
    js: `if (globalThis.window) globalThis.module ||= { exports: {} }`
  }
})