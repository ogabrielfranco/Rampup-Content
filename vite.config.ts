
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Injeta variáveis de ambiente para serem acessíveis via process.env
    'process.env': process.env
  }
});
