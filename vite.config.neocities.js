// vite.config.neocities.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 🔑 КРИТИЧНО: относительные пути для Neocities
  base: './',
  
  root: '.',
  publicDir: 'public',
  
  build: {
    // Папка вывода
    outDir: 'dist-neocities',
    emptyOutDir: true,
    
    // Минификация
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug']
      },
      format: {
        comments: false
      }
    },
    
    // Source maps отключены для экономии места
    sourcemap: false,
    
    // Целевые браузеры
    target: 'es2020',
    
    // Оптимизация чанков
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html')
      },
      output: {
        // Имена файлов с хешами для кэширования
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        
        // Разделение vendor-кода
        manualChunks: {
          'vendor': ['astronomy-engine'],
          'i18n': ['./src/i18n/index.js', './src/i18n/ru.js']
        }
      }
    },
    
    // Отчёт о размере
    reportCompressedSize: true
  },
  
  // Оптимизация зависимостей
  optimizeDeps: {
    include: ['astronomy-engine'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  
  // Server config для локального превью
  server: {
    port: 5173,
    open: false
  },
  
  preview: {
    port: 4173
  }
});
