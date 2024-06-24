import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/'],
  // splitting: true,
  platform: 'neutral',
  outDir: 'dist',
  dts: true,
  bundle: true,
  sourcemap: true,
  minify: true,
  format: ['cjs', 'esm', 'iife'],
  external: ['./global', '../global']
})
