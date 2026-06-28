// vite.config.neocities.js — ИСПРАВЛЕННЫЙ ✅
import { defineConfig } from 'vite';

export default defineConfig({
  // 🔑 Критично: относительные пути для Neocities
  base: './',
  
  build: {
    // Папка вывода
    outDir: 'dist-neocities',
    // Очищать папку перед сборкой
    emptyOutDir: true,
    // Минификация
    minify: true,
    // Без source maps (экономим место)
    sourcemap: false,
    // Целевые браузеры
    target: 'es2020',
  },
});
