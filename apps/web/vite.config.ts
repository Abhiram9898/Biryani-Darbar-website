import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          animation: ['framer-motion'],
          'data-vendor': ['@tanstack/react-query', 'axios'],
        },
      },
    },
  },
});
