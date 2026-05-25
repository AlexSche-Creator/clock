import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` matches the GitHub Pages project sub-path (https://<user>.github.io/clock/).
// Change to '/' if you host this anywhere else.
export default defineConfig({
  base: '/clock/',
  plugins: [react()],
  server: { host: true, port: 5173 },
});
