import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['swiper'], // Ensure swiper is included in the optimization step
  },
  build: {
    target: 'esnext', // Ensure modern build output for better compatibility
    cssCodeSplit: true, // Ensure CSS is split correctly
  },
});
