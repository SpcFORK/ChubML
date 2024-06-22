import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/'],
  // splitting: true,
  clean: true,
  platform: 'neutral',
  outDir: 'dist',
  dts: true,
  bundle: true,
  sourcemap: true,
  format: ['cjs', 'esm', 'iife']
})
